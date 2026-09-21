import sys,struct,os,ooz
from pak import load,entry
f,mount,names,enc,files=load()
def read(path):
    e=entry(enc,files[path]); f.seek(e['offset'])
    off,csz,usz,cm=struct.unpack('<QQQI',f.read(28)); f.read(20)
    if cm==0:
        f.read(1+4); return f.read(usz)
    n,=struct.unpack('<I',f.read(4))
    blocks=[struct.unpack('<QQ',f.read(16)) for _ in range(n)]
    f.read(1); bs,=struct.unpack('<I',f.read(4))
    out=b''; remain=usz
    for s,t in blocks:
        f.seek(e['offset']+s); data=f.read(t-s)
        want=min(bs,remain); out+=ooz.decompress(data,want); remain-=want
    assert len(out)==usz
    return out
for p in sys.argv[1:]:
    data=read(p); o=os.path.join('out',p.replace('/','_')); os.makedirs('out',exist_ok=True)
    open(o,'wb').write(data); print(o,len(data))

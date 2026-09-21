import sys,struct,io
P="/mnt/c/Program Files (x86)/Steam/steamapps/common/Alchemy Factory/AlchemyFactory/Content/Paks/AlchemyFactory-Windows.pak"
def rstr(b):
    n,=struct.unpack('<i',b.read(4))
    if n<0: return b.read(-n*2).decode('utf-16-le').rstrip('\0')
    return b.read(n).decode('utf-8','replace').rstrip('\0')
def load():
    f=open(P,'rb'); f.seek(0,2); size=f.tell(); f.seek(size-300); tail=f.read(300)
    i=tail.rfind(struct.pack('<I',0x5A6F12E1))
    off,sz=struct.unpack('<QQ',tail[i+8:i+24])
    # compression method names: after hash(20), 5 x 32 bytes
    names=[tail[i+44+k*32:i+44+(k+1)*32].split(b'\0')[0].decode() for k in range(5)]
    f.seek(off); b=io.BytesIO(f.read(sz))
    mount=rstr(b); count,=struct.unpack('<I',b.read(4)); seed,=struct.unpack('<Q',b.read(8))
    has_ph,=struct.unpack('<I',b.read(4))
    if has_ph: b.read(8+8+20)
    has_fd,=struct.unpack('<I',b.read(4))
    fdo,fds=struct.unpack('<QQ',b.read(16)); b.read(20)
    esz,=struct.unpack('<I',b.read(4)); enc=b.read(esz)
    f.seek(fdo); d=io.BytesIO(f.read(fds))
    files={}
    dc,=struct.unpack('<I',d.read(4))
    for _ in range(dc):
        dn=rstr(d); fc,=struct.unpack('<I',d.read(4))
        for _ in range(fc):
            fn=rstr(d); eo,=struct.unpack('<i',d.read(4)); files[dn+fn]=eo
    return f,mount,names,enc,files
def entry(enc,eo):
    b=io.BytesIO(enc); b.seek(eo); fl,=struct.unpack('<I',b.read(4))
    cbs=fl&0x3f; bc=(fl>>6)&0xffff; encd=(fl>>22)&1; cm=(fl>>23)&0x3f
    offset=struct.unpack('<I' if fl>>31&1 else '<Q', b.read(4 if fl>>31&1 else 8))[0]
    usz=struct.unpack('<I' if fl>>30&1 else '<Q', b.read(4 if fl>>30&1 else 8))[0]
    csz=usz
    if cm: csz=struct.unpack('<I' if fl>>29&1 else '<Q', b.read(4 if fl>>29&1 else 8))[0]
    return dict(offset=offset,usz=usz,csz=csz,cm=cm,enc=encd,bc=bc)
if __name__=='__main__':
    f,mount,names,enc,files=load()
    print('mount',mount,'files',len(files),'compression',names)
    pat=sys.argv[1].lower() if len(sys.argv)>1 else 'locres'
    for k in sorted(files):
        if pat in k.lower(): print(k, entry(enc,files[k]))

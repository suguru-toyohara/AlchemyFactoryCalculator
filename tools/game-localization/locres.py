import struct,io,json,sys
def rstr(b):
    n,=struct.unpack('<i',b.read(4))
    if n<0: return b.read(-n*2).decode('utf-16-le').rstrip('\0')
    return b.read(n).decode('utf-8','replace').rstrip('\0')
def parse(path):
    b=io.BytesIO(open(path,'rb').read()); b.read(16); ver=b.read(1)[0]
    so,=struct.unpack('<q',b.read(8)); pos=b.tell()
    b.seek(so); n,=struct.unpack('<I',b.read(4)); strs=[]
    for _ in range(n):
        s=rstr(b); 
        if ver>=2: b.read(4)
        strs.append(s)
    b.seek(pos)
    if ver>=2: b.read(4)
    nc,=struct.unpack('<I',b.read(4)); out={}
    for _ in range(nc):
        if ver>=2: b.read(4)
        ns=rstr(b); kc,=struct.unpack('<I',b.read(4))
        for _ in range(kc):
            if ver>=2: b.read(4)
            k=rstr(b); b.read(4); i,=struct.unpack('<i',b.read(4)); out[ns+'/'+k]=strs[i]
    return out
if __name__=='__main__':
    L={l:parse(f'out/AlchemyFactory_Content_Localization_Game_{l}_Game.locres') for l in ('en','ja','zh-Hans')}
    rows={k:{l:L[l].get(k) for l in L} for k in L['en']}
    json.dump(rows,open('out/loc_table.json','w'),ensure_ascii=False,indent=1)
    print({l:len(L[l]) for l in L})
    for k in list(rows)[:12]: print(k,rows[k])

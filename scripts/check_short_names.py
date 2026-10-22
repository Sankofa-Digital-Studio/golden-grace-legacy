import os
import hashlib

files = [
    'c.jpeg', 'cc.jpeg', 'czaa.jpeg', 'dr.jpeg', 's.jpeg', 
    'sadx.jpeg', 'sd.jpeg', 'sdasadca.jpeg', 'sx.jpeg', 'xcxz.jpeg', 'z.jpeg'
]

seen = {}
for f in os.listdir('public/images'):
    p = os.path.join('public/images', f)
    if os.path.isfile(p):
        h = hashlib.md5(open(p, 'rb').read()).hexdigest()
        seen.setdefault(h, []).append(f)

for f in files:
    p = os.path.join('public/images', f)
    if os.path.exists(p):
        h = hashlib.md5(open(p, 'rb').read()).hexdigest()
        matches = [m for m in seen.get(h, []) if m != f]
        print(f"{f} -> MD5 {h[:8]} -> Matches: {matches}")
    else:
        print(f"{f} does not exist")

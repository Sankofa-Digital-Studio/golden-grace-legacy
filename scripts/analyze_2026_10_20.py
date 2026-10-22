import os
import hashlib

seen = {}
for f in sorted(os.listdir('public/images')):
    if not (f.endswith('.jpeg') or f.endswith('.jpg') or f.endswith('.webp') or f.endswith('.mp4')):
        continue
    path = os.path.join('public/images', f)
    h = hashlib.md5(open(path, 'rb').read()).hexdigest()
    seen.setdefault(h, []).append(f)

print('=== 2026-10-20 Unique Files ===')
count = 0
for h, files in seen.items():
    has_1020 = any('2026-10-20' in f or '10-20' in f for f in files)
    if has_1020:
        count += 1
        size_kb = os.path.getsize(os.path.join('public/images', files[0])) // 1024
        print(f"{count}. MD5: {h[:8]} | Size: {size_kb}KB | Files: {files}")

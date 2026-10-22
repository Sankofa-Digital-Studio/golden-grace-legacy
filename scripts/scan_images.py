import os
import hashlib
from PIL import Image

image_dir = 'public/images'
files = [f for f in os.listdir(image_dir) if os.path.isfile(os.path.join(image_dir, f))]

seen_hashes = {}
unique_images = []

for f in sorted(files):
    ext = os.path.splitext(f)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png', '.webp']:
        continue
    filepath = os.path.join(image_dir, f)
    with open(filepath, 'rb') as fp:
        h = hashlib.md5(fp.read()).hexdigest()
    if h in seen_hashes:
        seen_hashes[h].append(f)
        continue
    seen_hashes[h] = [f]
    
    try:
        with Image.open(filepath) as img:
            w, h_dim = img.size
            img_small = img.convert('RGB').resize((10, 10))
            pixels = list(img_small.getdata())
            r_avg = sum(p[0] for p in pixels) // len(pixels)
            g_avg = sum(p[1] for p in pixels) // len(pixels)
            b_avg = sum(p[2] for p in pixels) // len(pixels)
            aspect = round(w / h_dim, 2)
            unique_images.append({
                'primary_name': f,
                'aliases': seen_hashes[h],
                'dim': f'{w}x{h_dim}',
                'aspect': aspect,
                'size_kb': round(os.path.getsize(filepath) / 1024, 1),
                'avg_rgb': f'rgb({r_avg},{g_avg},{b_avg})'
            })
    except Exception as e:
        print(f'Error reading {f}: {e}')

print(f'Total unique images: {len(unique_images)}')
for idx, u in enumerate(unique_images):
    print(f"{idx+1}. {u['primary_name']} | {u['dim']} (aspect: {u['aspect']}) | {u['size_kb']}KB | {u['avg_rgb']} | {len(u['aliases'])} file(s)")

import os
import io
import base64
from PIL import Image, ImageEnhance

# Path to the source logo image uploaded by the user
INPUT_IMAGE_PATH = r"C:/Users/thoso/.gemini/antigravity/brain/0ab5f592-819d-4912-9afa-d2236fdbc2a5/.user_uploaded/media_1792439336818_170c0d55.png"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")

os.makedirs(PUBLIC_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

print(f"Loading source image: {INPUT_IMAGE_PATH}")
source_img = Image.open(INPUT_IMAGE_PATH).convert("RGBA")

# 1. Clean Crops
# Bee exact bounds: x in [146, 878], y in [51, 547]
bee_crop = source_img.crop((146, 51, 878, 547))

# Full brand logo (bee + GOLDEN GRACE LEGACY typography, removing 2px outer border)
full_crop = source_img.crop((57, 51, 969, 752))

# Save high-res PNG and WebP assets to public/images
full_crop.save(os.path.join(IMAGES_DIR, "golden-grace-logo.png"), "PNG")
full_crop.save(os.path.join(IMAGES_DIR, "golden-grace-logo.webp"), "WEBP", quality=95)

bee_crop.save(os.path.join(IMAGES_DIR, "golden-grace-bee.png"), "PNG")
bee_crop.save(os.path.join(IMAGES_DIR, "golden-grace-bee.webp"), "WEBP", quality=95)
print("Saved clean high-resolution brand assets to public/images/")

def create_bee_icon(size, fill_ratio=0.92, sharpen=False, bg_color=None):
    """Generates a square icon of dimension `size x size` with the bee centered."""
    w = int(size * fill_ratio)
    h = int(w * bee_crop.height / bee_crop.width)
    
    # Ensure even margin distribution
    if (size - w) % 2 != 0 and (size - w) > 0:
        w += 1
    if (size - h) % 2 != 0 and (size - h) > 0:
        h += 1
        
    scaled = bee_crop.resize((w, h), Image.Resampling.LANCZOS)
    if sharpen:
        enhancer = ImageEnhance.Sharpness(scaled)
        scaled = enhancer.enhance(1.4)
        
    if bg_color:
        canvas = Image.new("RGBA", (size, size), bg_color)
    else:
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        
    offset_x = (size - w) // 2
    offset_y = (size - h) // 2
    canvas.paste(scaled, (offset_x, offset_y), scaled)
    return canvas

# 2. Generate standard icon sizes
print("Generating favicon sizes...")
icon_16 = create_bee_icon(16, fill_ratio=0.90, sharpen=True)
icon_32 = create_bee_icon(32, fill_ratio=0.92, sharpen=True)
icon_48 = create_bee_icon(48, fill_ratio=0.92)
icon_96 = create_bee_icon(96, fill_ratio=0.92)
icon_180_dark = create_bee_icon(180, fill_ratio=0.82, bg_color=(12, 10, 9, 255))
icon_180_trans = create_bee_icon(180, fill_ratio=0.82)
icon_192 = create_bee_icon(192, fill_ratio=0.90)
icon_512 = create_bee_icon(512, fill_ratio=0.90)

# Save standard PNGs
icon_16.save(os.path.join(PUBLIC_DIR, "favicon-16x16.png"), "PNG")
icon_32.save(os.path.join(PUBLIC_DIR, "favicon-32x32.png"), "PNG")
icon_48.save(os.path.join(PUBLIC_DIR, "favicon-48x48.png"), "PNG")
icon_96.save(os.path.join(PUBLIC_DIR, "favicon-96x96.png"), "PNG")
icon_180_dark.save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"), "PNG")
icon_180_trans.save(os.path.join(PUBLIC_DIR, "apple-touch-icon-transparent.png"), "PNG")
icon_192.save(os.path.join(PUBLIC_DIR, "android-chrome-192x192.png"), "PNG")
icon_512.save(os.path.join(PUBLIC_DIR, "android-chrome-512x512.png"), "PNG")

# 3. Generate multi-resolution favicon.ico
# Modern ICO standard includes 16x16, 32x32, 48x48
icon_32.save(
    os.path.join(PUBLIC_DIR, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[icon_16, icon_48]
)

# 4. Generate SVG Favicon with responsive vector container and high-res bee
buf = io.BytesIO()
icon_512.save(buf, format="PNG")
b64_png = base64.b64encode(buf.getvalue()).decode("ascii")

svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,{b64_png}" width="512" height="512" />
</svg>
"""

with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)

# 5. Generate site.webmanifest
manifest_content = """{
  "name": "Golden Grace Honey",
  "short_name": "Golden Grace",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#f59e0b",
  "background_color": "#050505",
  "display": "standalone"
}
"""

with open(os.path.join(PUBLIC_DIR, "site.webmanifest"), "w", encoding="utf-8") as f:
    f.write(manifest_content)

print("All favicon assets and web manifest generated successfully!")

import os
import io
import math
import base64
from PIL import Image, ImageDraw, ImageEnhance

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")

bee_png_path = os.path.join(IMAGES_DIR, "golden-grace-bee.png")
if not os.path.exists(bee_png_path):
    raise FileNotFoundError(f"Missing bee asset at: {bee_png_path}")

print(f"Loading bee asset from: {bee_png_path}")
bee_img = Image.open(bee_png_path).convert("RGBA")

def create_solid_honeycomb_icon(size, fill_style="dark_gold_frame", sharpen=False):
    """
    Renders a high-contrast honeycomb icon with the Golden Grace bee.
    Designed for maximum legibility on both dark and light browser tabs.
    """
    # Render at 2x super-sampling for pristine anti-aliasing
    canvas_size = size * 4 if size <= 96 else size * 2
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    cx, cy = canvas_size // 2, canvas_size // 2
    r = canvas_size * 0.46
    
    # Pointy-topped hexagon vertices
    points = []
    for i in range(6):
        angle = math.radians(60 * i - 30)
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        points.append((x, y))
        
    stroke_w = max(3, int(canvas_size * 0.045))
    
    # Solid background with rich contrast
    # Warm dark obsidian fill with radiant golden honeycomb border
    draw.polygon(points, fill=(16, 12, 8, 255), outline=(245, 158, 11, 255), width=stroke_w)
    
    # Subtle inner accent contour for luxury depth
    inner_r = r - stroke_w * 0.8
    inner_points = []
    for i in range(6):
        angle = math.radians(60 * i - 30)
        x = cx + inner_r * math.cos(angle)
        y = cy + inner_r * math.sin(angle)
        inner_points.append((x, y))
    draw.polygon(inner_points, outline=(217, 119, 6, 110), width=max(1, int(stroke_w * 0.3)))
    
    # Scale and center the bee inside the honeycomb
    bw = int(canvas_size * 0.64)
    bh = int(bw * bee_img.height / bee_img.width)
    bee_scaled = bee_img.resize((bw, bh), Image.Resampling.LANCZOS)
    
    # Brighten bee slightly for small sizes
    if size <= 48:
        enhancer = ImageEnhance.Brightness(bee_scaled)
        bee_scaled = enhancer.enhance(1.15)
        contrast = ImageEnhance.Contrast(bee_scaled)
        bee_scaled = contrast.enhance(1.25)
    
    ox = (canvas_size - bw) // 2
    oy = (canvas_size - bh) // 2
    canvas.paste(bee_scaled, (ox, oy), bee_scaled)
    
    # Downsample to target size
    icon = canvas.resize((size, size), Image.Resampling.LANCZOS)
    
    if sharpen and size <= 48:
        sharp = ImageEnhance.Sharpness(icon)
        icon = sharp.enhance(1.4)
        
    return icon

# 1. Generate standard favicon PNG mipmap suite
print("Generating solid honeycomb favicon mipmap suite...")
icon_16 = create_solid_honeycomb_icon(16, sharpen=True)
icon_32 = create_solid_honeycomb_icon(32, sharpen=True)
icon_48 = create_solid_honeycomb_icon(48, sharpen=True)
icon_96 = create_solid_honeycomb_icon(96)
icon_180_dark = create_solid_honeycomb_icon(180)
icon_180_trans = create_solid_honeycomb_icon(180)
icon_192 = create_solid_honeycomb_icon(192)
icon_512 = create_solid_honeycomb_icon(512)

# Save standard PNGs
icon_16.save(os.path.join(PUBLIC_DIR, "favicon-16x16.png"), "PNG")
icon_32.save(os.path.join(PUBLIC_DIR, "favicon-32x32.png"), "PNG")
icon_48.save(os.path.join(PUBLIC_DIR, "favicon-48x48.png"), "PNG")
icon_96.save(os.path.join(PUBLIC_DIR, "favicon-96x96.png"), "PNG")
icon_180_dark.save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"), "PNG")
icon_180_trans.save(os.path.join(PUBLIC_DIR, "apple-touch-icon-transparent.png"), "PNG")
icon_192.save(os.path.join(PUBLIC_DIR, "android-chrome-192x192.png"), "PNG")
icon_512.save(os.path.join(PUBLIC_DIR, "android-chrome-512x512.png"), "PNG")

# 2. Generate multi-resolution favicon.ico
icon_32.save(
    os.path.join(PUBLIC_DIR, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[icon_16, icon_48]
)

# 3. Generate pure vector SVG Favicon with solid honeycomb frame & high-res bee
buf = io.BytesIO()
icon_512.save(buf, format="PNG")
b64_png = base64.b64encode(buf.getvalue()).decode("ascii")

svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <radialGradient id="honeycombGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1f160a" />
      <stop offset="100%" stop-color="#0b0805" />
    </radialGradient>
    <linearGradient id="amberStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <filter id="honeycombShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>
  
  <!-- Solid Honeycomb Polygon with high-contrast amber border -->
  <polygon 
    points="256,24 456,140 456,372 256,488 56,372 56,140" 
    fill="url(#honeycombGlow)" 
    stroke="url(#amberStroke)" 
    stroke-width="22" 
    stroke-linejoin="round"
    filter="url(#honeycombShadow)"
  />
  
  <!-- Inner Golden Keyline -->
  <polygon 
    points="256,44 438,150 438,362 256,468 74,362 74,150" 
    fill="none" 
    stroke="#b45309" 
    stroke-width="4" 
    stroke-opacity="0.4"
    stroke-linejoin="round"
  />

  <!-- High-Resolution Golden Grace Bee Emblem -->
  <image href="data:image/png;base64,{b64_png}" width="512" height="512" />
</svg>
"""

with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)

# 4. Generate site.webmanifest
manifest_content = """{
  "name": "Golden Grace Legacy & Honey",
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

# Clean up test files if any
for t in ["scripts/test_fav1.png", "scripts/test_fav2.png"]:
    if os.path.exists(t):
        os.remove(t)

print("Phase 1 Complete: All solid honeycomb favicon mipmaps and SVG generated successfully!")

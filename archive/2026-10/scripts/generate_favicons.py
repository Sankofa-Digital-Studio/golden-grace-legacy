import os
import io
import math
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
bw_orig, bh_orig = bee_img.size

# --- 1. Construct Solid Line Fill Bee ---
# The authentic Golden Grace bee has delicate outline strokes.
# To make it unmistakable on both dark and light browser tabs at 16px-48px,
# we compute the enclosed hollow wing and body regions and fill them with
# radiant, solid golden opacity, then composite the authentic strokes on top.

alpha = bee_img.split()[3]
mask = alpha.point(lambda p: 255 if p > 35 else 0)

# Pad by 1px to allow floodfill from outside border
padded = Image.new("L", (bw_orig + 2, bh_orig + 2), 0)
padded.paste(mask, (1, 1))
ImageDraw.floodfill(padded, (0, 0), 128)
holes = padded.crop((1, 1, bw_orig + 1, bh_orig + 1)).point(lambda p: 255 if p == 0 else 0)

# Create solid warm-gold underlay for hollow regions
underlay = Image.new("RGBA", (bw_orig, bh_orig), (0, 0, 0, 0))
underlay_draw = ImageDraw.Draw(underlay)

for y in range(bh_orig):
    for x in range(bw_orig):
        if holes.getpixel((x, y)) == 255:
            # Gradient luminance: brighter towards top/wings, deeper amber towards stinger
            v_ratio = y / bh_orig
            r = int(253 - v_ratio * 15) # 253 -> 238
            g = int(220 - v_ratio * 40) # 220 -> 180
            b = int(100 - v_ratio * 60) # 100 -> 40
            underlay.putpixel((x, y), (r, g, b, 248))

# Composite solid golden underlay with authentic high-resolution bee
bee_solid = Image.alpha_composite(underlay, bee_img)

# --- 2. Moore-Neighbor Tracing & Ramer-Douglas-Peucker for Pure Vector SVG ---
solid_binary = Image.new("L", (bw_orig, bh_orig), 0)
for y in range(bh_orig):
    for x in range(bw_orig):
        if mask.getpixel((x, y)) == 255 or holes.getpixel((x, y)) == 255:
            solid_binary.putpixel((x, y), 255)

dirs = [(0, -1), (1, -1), (1, 0), (1, 1), (0, 1), (-1, 1), (-1, 0), (-1, -1)]
start_pt = None
for y in range(bh_orig):
    for x in range(bw_orig):
        if solid_binary.getpixel((x, y)) == 255:
            start_pt = (x, y)
            break
    if start_pt:
        break

contour = []
curr = start_pt
backtrack = 6

while True:
    contour.append(curr)
    found = False
    for i in range(8):
        dir_idx = (backtrack + i) % 8
        dx, dy = dirs[dir_idx]
        nx, ny = curr[0] + dx, curr[1] + dy
        if 0 <= nx < bw_orig and 0 <= ny < bh_orig and solid_binary.getpixel((nx, ny)) == 255:
            curr = (nx, ny)
            backtrack = (dir_idx + 5) % 8
            found = True
            break
    if not found or (curr == start_pt and len(contour) > 2):
        break
    if len(contour) > 12000:
        break

def rdp(points, epsilon):
    if len(points) < 3:
        return points
    start = points[0]
    end = points[-1]
    dx = end[0] - start[0]
    dy = end[1] - start[1]
    norm = math.hypot(dx, dy)
    max_dist = 0
    max_idx = 0
    for i in range(1, len(points) - 1):
        p = points[i]
        dist = math.hypot(p[0] - start[0], p[1] - start[1]) if norm == 0 else abs(dy * p[0] - dx * p[1] + end[0] * start[1] - end[1] * start[0]) / norm
        if dist > max_dist:
            max_dist = dist
            max_idx = i
    if max_dist > epsilon:
        left = rdp(points[:max_idx + 1], epsilon)
        right = rdp(points[max_idx:], epsilon)
        return left[:-1] + right
    else:
        return [start, end]

simplified_contour = rdp(contour, 1.4)
print(f"Traced solid bee contour: {len(contour)} points -> {len(simplified_contour)} vector vertices")

# --- 3. PNG Mipmap Suite Generator ---
def create_solid_honeycomb_icon(size, sharpen=False):
    """
    Renders a solid honeycomb hexagon with high-contrast amber border
    and solid-filled Queen Bee for pristine visibility at any mipmap size.
    """
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
        
    stroke_w = max(3, int(canvas_size * 0.048))
    
    # Solid background: Warm dark obsidian core with radiant golden honeycomb border
    draw.polygon(points, fill=(16, 12, 8, 255), outline=(245, 158, 11, 255), width=stroke_w)
    
    # Subtle inner accent contour for luxury depth
    inner_r = r - stroke_w * 0.85
    inner_points = []
    for i in range(6):
        angle = math.radians(60 * i - 30)
        x = cx + inner_r * math.cos(angle)
        y = cy + inner_r * math.sin(angle)
        inner_points.append((x, y))
    draw.polygon(inner_points, outline=(217, 119, 6, 115), width=max(1, int(stroke_w * 0.28)))
    
    # Scale and center the solid bee inside the honeycomb cell
    bw = int(canvas_size * 0.68)
    bh = int(bw * bh_orig / bw_orig)
    bee_scaled = bee_solid.resize((bw, bh), Image.Resampling.LANCZOS)
    
    # Micro-optimization for low-resolution tab favicon visibility
    if size <= 48:
        enhancer = ImageEnhance.Contrast(bee_scaled)
        bee_scaled = enhancer.enhance(1.35)
        enhancer2 = ImageEnhance.Brightness(bee_scaled)
        bee_scaled = enhancer2.enhance(1.2)
    
    ox = (canvas_size - bw) // 2
    oy = (canvas_size - bh) // 2
    canvas.paste(bee_scaled, (ox, oy), bee_scaled)
    
    # Downsample to target size
    icon = canvas.resize((size, size), Image.Resampling.LANCZOS)
    
    if sharpen and size <= 48:
        sharp = ImageEnhance.Sharpness(icon)
        icon = sharp.enhance(1.4)
        
    return icon

# Generate all mipmap resolutions
print("Generating solid honeycomb PNG mipmap suite...")
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

# Multi-resolution ICO
icon_32.save(
    os.path.join(PUBLIC_DIR, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[icon_16, icon_48]
)

# --- 4. Build Pure Vector Solid Honeycomb SVG ---
# Scale vector vertices to fit 512x512 SVG coordinate space
svg_target_w = 345
svg_scale = svg_target_w / bw_orig
svg_target_h = bh_orig * svg_scale
svg_ox = (512 - svg_target_w) / 2
svg_oy = (512 - svg_target_h) / 2

path_d = f"M {svg_ox + simplified_contour[0][0]*svg_scale:.1f},{svg_oy + simplified_contour[0][1]*svg_scale:.1f} "
for pt in simplified_contour[1:]:
    path_d += f"L {svg_ox + pt[0]*svg_scale:.1f},{svg_oy + pt[1]*svg_scale:.1f} "
path_d += "Z"

svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Background Luxury Gradient: Warm Obsidian Core to Deep Noir -->
    <radialGradient id="honeycombGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#241a0d" />
      <stop offset="70%" stop-color="#140f08" />
      <stop offset="100%" stop-color="#070503" />
    </radialGradient>
    
    <!-- Radiant Honeycomb Cell Golden Border -->
    <linearGradient id="amberStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="25%" stop-color="#fbbf24" />
      <stop offset="70%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>

    <!-- Solid Queen Bee Luminous Fill -->
    <linearGradient id="beeGoldGlow" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#fef9c3" />
      <stop offset="30%" stop-color="#fde047" />
      <stop offset="70%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>

    <!-- Inner Shadow & Ambient Aura -->
    <filter id="honeycombShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.7" />
    </filter>

    <filter id="beeGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#f59e0b" flood-opacity="0.4" />
    </filter>
  </defs>
  
  <!-- 1. Solid Honeycomb Cell (Pointy-topped hexagon with solid fill & keyline) -->
  <polygon 
    points="256,22 458,138 458,374 256,490 54,374 54,138" 
    fill="url(#honeycombGlow)" 
    stroke="url(#amberStroke)" 
    stroke-width="22" 
    stroke-linejoin="round"
    filter="url(#honeycombShadow)"
  />
  
  <!-- 2. Inner Golden Keyline for Fine Craftsmanship -->
  <polygon 
    points="256,42 440,148 440,364 256,470 72,364 72,148" 
    fill="none" 
    stroke="#d97706" 
    stroke-width="4" 
    stroke-opacity="0.45"
    stroke-linejoin="round"
  />

  <!-- 3. Concentric Subtle Apiary Geometry in Background -->
  <g opacity="0.12" stroke="#f59e0b" stroke-width="2" fill="none">
    <polygon points="256,90 350,144 350,252 256,306 162,252 162,144" />
    <polygon points="256,206 350,260 350,368 256,422 162,368 162,260" />
  </g>

  <!-- 4. Pure Vector Solid-Filled Golden Grace Queen Bee Silhouette -->
  <path 
    d="{path_d}" 
    fill="url(#beeGoldGlow)" 
    stroke="#b45309" 
    stroke-width="3" 
    stroke-linejoin="round"
    filter="url(#beeGlow)"
  />

  <!-- 5. Queen Bee Internal Anatomical Details (Pure Vector Engravings) -->
  <!-- Thorax Core Shield -->
  <ellipse cx="256" cy="242" rx="20" ry="26" fill="#140f08" stroke="#f59e0b" stroke-width="2.5" />
  <circle cx="256" cy="236" r="6" fill="#fbbf24" />

  <!-- Abdomen Ribs (Alternating Amber & Obsidian Bands) -->
  <path d="M 238,284 Q 256,290 274,284" stroke="#140f08" stroke-width="4.5" stroke-linecap="round" fill="none" />
  <path d="M 242,308 Q 256,314 270,308" stroke="#140f08" stroke-width="4" stroke-linecap="round" fill="none" />
  <path d="M 246,332 Q 256,336 266,332" stroke="#140f08" stroke-width="3.5" stroke-linecap="round" fill="none" />
  <path d="M 250,356 Q 256,359 262,356" stroke="#140f08" stroke-width="3" stroke-linecap="round" fill="none" />
  <!-- Sacred Stinger Tip -->
  <polygon points="256,380 254,370 258,370" fill="#f59e0b" stroke="#78350f" stroke-width="1" />

  <!-- Wing Veins: Left Forewing -->
  <path d="M 236,220 C 200,195 150,185 106,192 C 145,215 195,230 236,232" fill="none" stroke="#b45309" stroke-width="2" opacity="0.75" />
  <path d="M 152,190 C 170,210 195,225 236,236" fill="none" stroke="#d97706" stroke-width="1.5" opacity="0.6" />
  <!-- Wing Veins: Right Forewing -->
  <path d="M 276,220 C 312,195 362,185 406,192 C 367,215 317,230 276,232" fill="none" stroke="#b45309" stroke-width="2" opacity="0.75" />
  <path d="M 360,190 C 342,210 317,225 276,236" fill="none" stroke="#d97706" stroke-width="1.5" opacity="0.6" />

  <!-- Crown & Celestial Antennae -->
  <path d="M 248,188 C 242,168 230,150 216,140" fill="none" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" />
  <path d="M 264,188 C 270,168 282,150 296,140" fill="none" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" />
  <circle cx="215" cy="139" r="3.5" fill="#fef08a" />
  <circle cx="297" cy="139" r="3.5" fill="#fef08a" />
</svg>
"""

with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)

print(f"Generated pure vector solid honeycomb SVG at {os.path.join(PUBLIC_DIR, 'favicon.svg')}")
print("Phase 1 Complete: All solid honeycomb favicon mipmaps and pure vector SVG generated successfully!")

import os
from PIL import Image

def convert_to_webp(src_path, dest_path, quality=80, max_width=None):
    if not os.path.exists(src_path):
        print(f"Skipping: {src_path} (not found)")
        return
    
    print(f"Converting: {src_path} -> {dest_path}")
    img = Image.open(src_path)
    
    # Optional resizing for massive images
    if max_width and img.width > max_width:
        ratio = max_width / float(img.width)
        new_height = int(float(img.height) * ratio)
        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        print(f"  Resized to {max_width}px width")
    
    # Handle transparency
    if img.mode == 'RGBA':
        background = Image.new('RGBA', img.size, (255, 255, 255, 0))
        img = Image.alpha_composite(background, img)
    
    img.save(dest_path, 'WEBP', quality=quality)
    size_mb = os.path.getsize(dest_path) / (1024 * 1024)
    print(f"  Finished: {size_mb:.2f} MB")

# Targets
targets = [
    # Logo - keep relatively high quality but smaller
    {
        "src": "src/assets/logo/svg logo (1).png",
        "dest": "src/assets/logo/logo.webp",
        "quality": 85
    },
    # Massive Studio photos - resize and compress heavily
    {
        "src": "public/studio-desktop.png",
        "dest": "public/studio-desktop.webp",
        "quality": 75,
        "max_width": 2560
    },
    {
        "src": "public/studio-mobile.png",
        "dest": "public/studio-mobile.webp",
        "quality": 70,
        "max_width": 1080
    },
    {
        "src": "src/assets/work/drake-seaside/hero-bg.jpg",
        "dest": "src/assets/work/drake-seaside/hero-bg.webp",
        "quality": 70,
        "max_width": 1920
    },
    {
        "src": "src/assets/work/forma studio/forma.png",
        "dest": "src/assets/work/forma studio/forma.webp",
        "quality": 75,
        "max_width": 1200
    },
    {
        "src": "src/assets/work/takamaka-house/takamaka.png",
        "dest": "src/assets/work/takamaka-house/takamaka.webp",
        "quality": 75,
        "max_width": 1200
    }
]

for t in targets:
    convert_to_webp(t["src"], t["dest"], t.get("quality", 80), t.get("max_width"))

print("Compression complete!")

import shutil
import ast
import os

fork_dir = r"C:\Users\Gregory\antigravity_projects\horizon-digital-content-fork"
workspace_dir = r"C:\Users\Gregory\antigravity_projects\horizon-digital"

home_src = os.path.join(workspace_dir, "temp_home_fork.tsx")
home_dest = os.path.join(fork_dir, "src", "pages", "Home.tsx")

anim_src = os.path.join(workspace_dir, "temp_animated_text.tsx")
anim_dest = os.path.join(fork_dir, "src", "components", "ui", "animated-text.tsx")

css_path = os.path.join(fork_dir, "src", "index.css")

print("Copying Home.tsx...")
shutil.copy(home_src, home_dest)

print("Copying animated-text.tsx...")
shutil.copy(anim_src, anim_dest)

print("Reading CSS...")
with open(css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

new_css = """

/* ── Redesign Utilities ────────────────────────────────────────── */
@keyframes subtle-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.98); }
}

.image-placeholder {
  @apply relative w-full overflow-hidden rounded-3xl border border-border/80 bg-zinc-900/60 shadow-2xl;
  background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(70, 198, 232, 0.05) 10px,
      rgba(70, 198, 232, 0.05) 20px
    ),
    linear-gradient(to bottom right, rgba(16, 24, 39, 0.4), rgba(2, 6, 23, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-placeholder::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.section-eyebrow-glow {
  text-shadow: 0 0 20px rgba(70, 198, 232, 0.4);
}

/* Package Banner Styling */
.banner-row {
  @apply bg-bg-panel/40 overflow-hidden backdrop-blur-sm shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)];
}
.pkg-banner {
  @apply border-b border-border/60 transition-colors duration-300;
}
.pkg-banner:hover {
  @apply bg-bg-panel/60;
}
.pkg-banner-featured {
  @apply relative bg-gradient-to-r from-accent/5 via-transparent to-transparent border-t-2 border-t-accent mt-[-1px];
}

/* Base gradients and texts */
.services-split-banner {
  background: radial-gradient(circle at right center, rgba(70,198,232,0.03) 0%, transparent 60%);
}

.ready-banner {
  background: radial-gradient(circle at left center, rgba(70,198,232,0.03) 0%, transparent 50%),
              linear-gradient(to top, rgba(2,6,23,0.5), transparent);
}
"""

if ".image-placeholder" not in css_content:
    print("Patching CSS...")
    with open(css_path, "a", encoding="utf-8") as f:
        f.write(new_css)
else:
    print("CSS already patched.")

print("Done.")

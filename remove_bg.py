from PIL import Image
import numpy as np

img = Image.open('public/images/new-hero.png').convert("RGBA")
data = np.array(img)

# Get the background color from the top-left pixel
bg_color = data[0, 0]
print(f"Background color: {bg_color}")

# Define a threshold for how "blue" a pixel is to be removed
# We'll calculate the Euclidean distance between each pixel and the bg_color
r, g, b, a = np.rollaxis(data, axis=-1)
bg_r, bg_g, bg_b, _ = bg_color

# Euclidean distance squared
dist_sq = (r.astype(int) - bg_r)**2 + (g.astype(int) - bg_g)**2 + (b.astype(int) - bg_b)**2

# Threshold (adjustable)
threshold = 80**2

# Create a mask for pixels that are close to the background color
mask = dist_sq < threshold

# Set alpha to 0 for those pixels
data[mask, 3] = 0

# Also perform some edge smoothing if needed, but this is a basic approach
new_img = Image.fromarray(data)
new_img.save('public/images/new-hero-transparent.png')
print("Saved transparent image to public/images/new-hero-transparent.png")

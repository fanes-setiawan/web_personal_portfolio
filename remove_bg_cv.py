import cv2
import numpy as np

# Read image with alpha channel
img = cv2.imread('public/images/hero-final.png', cv2.IMREAD_UNCHANGED)
if img.shape[2] == 3:
    # Add alpha channel if missing
    img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

# Get the color of the top-left pixel
h, w = img.shape[:2]
mask = np.zeros((h+2, w+2), np.uint8)

# Flood fill starting from (0,0) with a tolerance
# Tolerance means how much difference in color is allowed
lo = (50, 50, 50, 0)
up = (50, 50, 50, 0)

# Flood fill modifies the image in place, so we make a copy for the mask
seed_pt = (0, 0)
cv2.floodFill(img, mask, seed_pt, (255, 255, 255, 0), lo, up, cv2.FLOODFILL_FIXED_RANGE)

# We can also fill from the top-right just in case
cv2.floodFill(img, mask, (w-1, 0), (255, 255, 255, 0), lo, up, cv2.FLOODFILL_FIXED_RANGE)

# We can also fill from other corners
cv2.floodFill(img, mask, (0, h-1), (255, 255, 255, 0), lo, up, cv2.FLOODFILL_FIXED_RANGE)
cv2.floodFill(img, mask, (w-1, h-1), (255, 255, 255, 0), lo, up, cv2.FLOODFILL_FIXED_RANGE)

# Apply some morphological operations to smooth the edges
alpha = img[:, :, 3]
kernel = np.ones((3,3), np.uint8)
alpha = cv2.erode(alpha, kernel, iterations=1)
alpha = cv2.GaussianBlur(alpha, (3,3), 0)

img[:, :, 3] = alpha

cv2.imwrite('public/images/hero-final-transparent.png', img)
print("Done cv2 floodfill")

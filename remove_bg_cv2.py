import cv2
import numpy as np

# Read image
img_path = 'public/images/hero-final.png'
img_bgr = cv2.imread(img_path)

h, w = img_bgr.shape[:2]
mask = np.zeros((h+2, w+2), np.uint8)

# Flood fill on BGR image
# We use a broader tolerance since the blue might vary slightly
lo = (30, 30, 30)
up = (30, 30, 30)

# Fill corners
cv2.floodFill(img_bgr, mask, (0, 0), (255, 255, 255), lo, up, cv2.FLOODFILL_FIXED_RANGE)
cv2.floodFill(img_bgr, mask, (w-1, 0), (255, 255, 255), lo, up, cv2.FLOODFILL_FIXED_RANGE)
cv2.floodFill(img_bgr, mask, (0, h-1), (255, 255, 255), lo, up, cv2.FLOODFILL_FIXED_RANGE)
cv2.floodFill(img_bgr, mask, (w-1, h-1), (255, 255, 255), lo, up, cv2.FLOODFILL_FIXED_RANGE)

# The mask now contains 1 where floodfill happened
# Since floodfill sets pixels to 1 in the mask, we need to invert it for alpha
# mask is (h+2, w+2), so we crop it
alpha = 255 - (mask[1:h+1, 1:w+1] * 255)

# Smooth edges
kernel = np.ones((5,5), np.uint8)
alpha = cv2.erode(alpha, kernel, iterations=1)
alpha = cv2.GaussianBlur(alpha, (5,5), 0)

# Read the original image again to apply alpha
img_out = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
if img_out.shape[2] == 3:
    img_out = cv2.cvtColor(img_out, cv2.COLOR_BGR2BGRA)

img_out[:, :, 3] = alpha

cv2.imwrite('public/images/hero-final-transparent.png', img_out)
print("Done cv2 floodfill masking")

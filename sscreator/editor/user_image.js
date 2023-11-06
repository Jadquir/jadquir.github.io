// Set the radius for the corners (adjust this value as needed)
const cornerRadius = 20;
class UserImage extends ImageBase {
  initlizeImage(image) {
    this.userimg = new Image();
    this.userimg.crossOrigin = 'anonymous'
    this.userimg.src = image;
  }
  set_dimensions(x, y, width, height) {
    this.user_x = x;
    this.user_y = y;
    this.user_width = width;
    this.user_height = height;
  }

  // Draw the rounded image
  drawRoundedImage(ctx, image, x, y, width, height) {
    // Save the current context state
    ctx.save();

    // Create a clipping path with rounded corners
    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.arcTo(x + width, y, x + width, y + height, cornerRadius);
    ctx.arcTo(x + width, y + height, x, y + height, cornerRadius);
    ctx.arcTo(x, y + height, x, y, cornerRadius);
    ctx.arcTo(x, y, x + width, y, cornerRadius);
    ctx.closePath();
    ctx.clip();

    // Draw the image onto the canvas with the rounded corners
    ctx.drawImage(image, x, y, width, height);

    // Restore the context state (remove the clipping path)
    ctx.restore();
  }
isPortrait(){
  // Calculate the aspect ratio of the image
  var imageAspectRatio = this.userimg.width / this.userimg.height;

  var newHeight = this.width / imageAspectRatio;

  var isportrait = newHeight < this.height;
  return isportrait;
}
  assignNewDimension() {
    // Calculate the aspect ratio of the image
    var imageAspectRatio = this.userimg.width / this.userimg.height;

    // Calculate the new dimensions to cover the image within the bounding area
    var newWidth = this.width;
    var newHeight = this.width / imageAspectRatio;

    // If the new height is less than the bounding area height, adjust the height instead
    if (newHeight < this.height) {
      newHeight = this.height;
      newWidth = this.height * imageAspectRatio;
    }
    var xOffset = this.width - newWidth / 2; // Center the image based on user_x
    var yOffset = this.height - newHeight / 2; // Center the image based on user_y
    this.user_x = xOffset;
    this.user_y = yOffset;
  }
  async draw(other_ctx) {
    if (!this.isLoaded()) {
      await this.init();
    }
    if (!this.user_isLoaded()) {
      await this.user_init();
    }
    this.updateDimensions();
    const canvas = this.canvas;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw the image onto the canvas context

    // Calculate the aspect ratio of the image
    var imageAspectRatio = this.userimg.width / this.userimg.height;

    // Calculate the new dimensions to cover the image within the bounding area
    var newWidth = this.width;
    var newHeight = this.width / imageAspectRatio;

    var isportrait = newHeight < this.height;
    // If the new height is less than the bounding area height, adjust the height instead
    if (isportrait) {
      newHeight = this.height;
      newWidth = this.height * imageAspectRatio;
    }

    // // Calculate the centering offset to position the image within the bounding area
    // var xOffset = (this.width - newWidth) / 2;
    // var yOffset = (this.height - newHeight) / 2;

    // Calculate the centering offset to position the image within the bounding area
    var xOffset = this.user_x - newWidth / 2; // Center the image based on user_x
    var yOffset = this.user_y - newHeight / 2; // Center the image based on user_y
    

    ctx.drawImage(this.userimg, xOffset, yOffset, newWidth, newHeight);
    this.drawRoundedImage(
      other_ctx,
      this.canvas,
      this.x,
      this.y,
      this.width,
      this.height
    );
    // other_ctx.drawImage(this.canvas, this.x, this.y, this.width, this.height);
  }
  async user_init() {
    return new Promise((resolve, reject) => {
      this.userimg.onload = () => {
        resolve();
      };
      this.userimg.onerror = () => {
        reject(new Error(`Failed to load image from URL: ${this.imageURL}`));
      };
      this.userimg.crossOrigin = 'anonymous'
      this.userimg.src = this.imageURL;
    });
  }
  async wait_forload() {
    return new Promise((resolve, reject) => {
      if (this.user_isLoaded()) {
        resolve();
      }
      this.userimg.onload = () => {
        resolve();
      };
      this.userimg.onerror = () => {
        reject(new Error(`Failed to load image from URL: ${this.imageURL}`));
      };
    });
  }

  user_isLoaded() {
    return this.userimg.complete && this.userimg.naturalWidth !== 0;
  }
}
function clampNumber(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

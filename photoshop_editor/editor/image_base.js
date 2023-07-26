class ImageBase {
  constructor(
    x,
    y,
    width,
    height,
    zOrder = 0,
    imageURL,
    color_white = null,
    color_black = null,
    use_replace = true
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.zOrder = zOrder;
    this.imageURL = imageURL;
    this.color_white = color_white;
    this.color_black = color_black;
    this.use_replace = use_replace;
    this.image = new Image();
  }
  set_white_color(color_white) {
    this.color_white = color_white;
  }
  set_black_color(color_black) {
    this.color_black = color_black;
  }
  set_src(src) {
    this.image = new Image();
    this.image.src = src;
  }
  async init() {
    return new Promise((resolve, reject) => {
      this.image.onload = () => {
        resolve();
      };
      this.image.onerror = () => {
        reject(new Error(`Failed to load image from URL: ${this.imageURL}`));
      };
      this.image.src = this.imageURL;
    });
  }

  isLoaded() {
    return this.image.complete && this.image.naturalWidth !== 0;
  }
  log(text) {
    if (this.zOrder === 0) {
      console.log(text);
    }
  }
  async draw(ctx) {
    if (!this.isLoaded()) {
      await this.init();
    }
    this.updateDimensions();
    if (this.use_replace === true) {
      // Create a temporary canvas
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = this.width;
      tempCanvas.height = this.height;
      const tempCtx = tempCanvas.getContext("2d");

      // Draw the image on the temporary canvas
      tempCtx.drawImage(this.image, 0, 0, this.width, this.height);

      // Replace colors on the temporary canvas for each color_white
      if (this.color_white) {
        this.log("replacewhite");
        const imageData = tempCtx.getImageData(0, 0, this.width, this.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          if (
            data[i] === 255 && // R
            data[i + 1] === 255 && // G
            data[i + 2] === 255 // B
          ) {
            // Replace white with the specified color_white
            data[i] = this.color_white[0];
            data[i + 1] = this.color_white[1];
            data[i + 2] = this.color_white[2];
          }
        }
        tempCtx.putImageData(imageData, 0, 0);
      }

      // Draw the modified image on the main canvas
      ctx.drawImage(tempCanvas, this.x, this.y, this.width, this.height);
    } else {
      // Save the current context state
      ctx.save();

      // Fill the area with the specified color for white pixels
      if (this.color_white) {
        this.log("replacewhite");
        // Save the current globalCompositeOperation state
        const currentCompositeOperation = ctx.globalCompositeOperation;
        ctx.fillStyle = this.color_white;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // Use globalCompositeOperation to apply the color to white areas
        ctx.globalCompositeOperation = "destination-atop";

        // Draw the image with the modified globalCompositeOperation
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // Restore the original globalCompositeOperation state
        ctx.globalCompositeOperation = currentCompositeOperation;
      } else {
        // If no color_white is specified, simply draw the image
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }

      // Restore the context state to the saved state
      ctx.restore();
    }
    return;
    this.updateDimensions();
    this.log("render");
    // Save the current context state
    ctx.save();

    // Fill the area with the specified color for white pixels
    if (this.color_white) {
      this.log("replacewhite");
      // Save the current globalCompositeOperation state
      const currentCompositeOperation = ctx.globalCompositeOperation;
      ctx.fillStyle = this.color_white;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      // Use globalCompositeOperation to apply the color to white areas
      ctx.globalCompositeOperation = "destination-atop";

      // Draw the image with the modified globalCompositeOperation
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

      // Restore the original globalCompositeOperation state
      ctx.globalCompositeOperation = currentCompositeOperation;
    } else {
      // If no color_white is specified, simply draw the image
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // Restore the context state to the saved state
    ctx.restore();
  }
  updateDimensions() {
    if (this.width === null) {
      this.width = this.image.naturalWidth;
    }
    if (this.height === null) {
      this.height = this.image.naturalHeight;
    }
  }
}
 

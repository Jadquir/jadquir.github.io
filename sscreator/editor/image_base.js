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
    use_replace = false
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
    this.image.setAttribute('crossorigin', 'anonymous'); // works for me
    this.image.src = src;
  }  
  set_url(imageURL) {
    this.image.setAttribute('crossorigin', 'anonymous'); // works for me
    this.imageURL = imageURL;
  }
  async init() {
    return new Promise((resolve, reject) => {
      this.image.onload = () => {
        const c = document.createElement("canvas");
        c.width = this.image.naturalWidth;
        c.height = this.image.naturalHeight;
        this.canvas = c;
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
  replaceColor(ctx) {
    if(this.use_replace !== true) return;
    function is_all(r,g,b,target){
      return r == target && g == target && b == target;
    } 
    const imageData = ctx.getImageData(0, 0, this.width, this.height);
    const data = imageData.data;

    if (this.color_white) {
      const rgb = hexToRgb(this.color_white);
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0&& is_all(data[i],data[i + 1],data[i + 2],255)) {
          data[i] = rgb.r;
          data[i + 1] = rgb.g;
          data[i + 2] = rgb.b;
        }
      }
    } 
    if (this.color_black) {
      const rgb = hexToRgb(this.color_black);
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0 && is_all(data[i],data[i + 1],data[i + 2],0)) {
          data[i] = rgb.r;
          data[i + 1] = rgb.g;
          data[i + 2] = rgb.b;
        }
      }
    }

    ctx.putImageData(imageData, 0,0);
  }
  async draw(other_ctx) {
    if (!this.isLoaded()) {
      await this.init();
    }
    this.updateDimensions();

    const canvas = this.canvas;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw the image onto the canvas context
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
    this.replaceColor(ctx);
    other_ctx.drawImage(this.canvas, this.x, this.y, this.width, this.height);
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
function hexToRgb(hex) {
  // Remove '#' symbol if present
  hex = hex.replace("#", "");
  // Convert the hex values to RGB components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const value = { r: r, g: g, b: b };
  // Return the RGB components as an object
  return value;
}

const canvas = document.getElementById("canvas");
canvas.width = 1500;
canvas.height = 1000;
const ctx = canvas.getContext("2d");

// downnloadign
document
  .getElementById("download-button")
  .addEventListener("click", function () {
    downloadCanvasAsImage(canvas, "adobe test.png");
  });
function downloadCanvasAsImage(canvas, filename) {
  const dataURL = canvas.toDataURL("image/png");

  // Create a temporary anchor element
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = filename;

  // Append the anchor to the document and click it to trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
}

function handleUpload() {
  // Get the values entered by the user
  const imageUrl = document.getElementById("imageUrl").value;
  const fileInput = document.getElementById("fileInput").files[0];

  // Check if either the URL or file input is provided
  if (imageUrl && fileInput) {
    console.log(
      "Please provide either an Image URL or select a file, not both."
    );
    return;
  }
  // Check if both the URL and file input are provided
  if (imageUrl && fileInput.files.length > 0) {
    console.log(
      "Please provide either an Image URL or select a file, not both."
    );
    return;
  }
  if (imageUrl) {
    // Handle image URL
    console.log("Image URL:", imageUrl);
    user_img.set_src(imageUrl);
    // Perform further operations with the URL, such as displaying the image
  } else if (fileInput) {
    // Handle file upload
    console.log("Selected file:", fileInput);
    // Handle file upload
    const selectedFile = fileInput;
    const reader = new FileReader();

    reader.onload = function (event) {
      user_img.set_src(event.target.result);
    };

    reader.readAsDataURL(selectedFile);
    // Perform further operations with the uploaded file, such as displaying the image
  } else {
    console.log("Please provide an Image URL or select a file.");
  }
  renderImagesOnCanvas();
}

// Rendering
const bg = new ImageBase(
  0,
  0,
  1500,
  1000,
  0,
  "PhotoshopSplashImages/bg.png",
  "#fff",
  null,
  false
);
const app_logo = new ImageBase(
  64,
  64,
  176 - 64,
  172 - 64,
  1,
  "PhotoshopSplashImages/logo.png"
);
const app_text = new ImageBase(
  196,
  82,
  null,
  null,
  1,
  "PhotoshopSplashImages/text.png",
  "#081d34"
);
const cloud_logo = new ImageBase(
  64,
  888,
  113 - 64,
  936 - 888,
  1,
  "PhotoshopSplashImages/creative_cloud.png"
);
const adobe_text = new ImageBase(
  123,
  900,
  null,
  null,
  1,
  "PhotoshopSplashImages/text2.png"
);
const user_img = new ImageBase(
  639,
  31,
  null,
  null,
  1,
  "PhotoshopSplashImages/user_img.png"
);
const imageArray = [app_text, bg, app_logo, cloud_logo, adobe_text, user_img];
function renderImagesOnCanvas() {
  // Sort the images based on their zOrder in ascending order
  const sortedImages = imageArray.sort((a, b) => a.zOrder - b.zOrder);

  // Set the global alpha to a value less than 1 to make the canvas transparent
  ctx.globalAlpha = 0.0;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reset the global alpha to 1.0 (fully opaque) if you want to draw with full opacity again
  ctx.globalAlpha = 1.0;
  console.log(sortedImages);
  // Loop through the sorted images and draw them on the canvas
  sortedImages.forEach(async (image) => {
    await image.draw(ctx);
    if (image.isLoaded()) {
    }
  });
}

Promise.all(imageArray.map((image) => image.init()))
  .then(() => {
    renderImagesOnCanvas();
  })
  .catch((error) => {
    console.error(error);
  });

function update_color(colorPickerId, colorTextId, imagebase) {
  const colorPicker = document.getElementById(colorPickerId);
  const colorPickertext = document.getElementById(colorTextId);
  colorPicker.addEventListener("input", () => {
    colorPickertext.textContent = colorPicker.value;
    imagebase.set_white_color(colorPicker.value);
    renderImagesOnCanvas();
  });
}
update_color("color1", "color1Text", app_text);
update_color("color2", "color2Text", bg);

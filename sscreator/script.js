const canvas = document.getElementById("canvas");
canvas.width = 1500;
canvas.height = 1000;
const ctx = canvas.getContext("2d");

const user_x = document.getElementById("user_x");
const user_y = document.getElementById("user_y");
user_x.value = "414.5";
user_y.value = "469";

let firstRender = false;
let firstDownload = true;
function afterDownload(){
  if(firstDownload === false){
return;
  }
   // Calculate the target element's position relative to the viewport
   const targetElementRect = document.getElementById("download").getBoundingClientRect();
        
   // Scroll to the target element's top position with a smooth animation
   window.scrollTo({
       top: window.scrollY + targetElementRect.top,
       behavior: "smooth"
   });
   firstDownload = false;
}
// downnloadign
document
  .getElementById("download-button")
  .addEventListener("click", function () {
    downloadCanvasAsImage(canvas, "Splash Screen.png");
    afterDownload();
  });
document
  .getElementById("download-button-config")
  .addEventListener("click", function () {
    downloadConfig(canvas);
    afterDownload();
  });

function downloadConfig(canvas) {
  const dataURL = canvas.toDataURL("image/png");

  const config = {
    app_type: selector.value,
    image_base64: dataURL,
  };
  console.log(config);

  // Step 1: Convert the object to a JSON string
  const jsonString = JSON.stringify(config, null, 2); // The second parameter (null) is for replacer function or array of properties to include, and the third parameter (2) is for indentation (number of spaces).

  // Step 2: Create a Blob from the JSON string
  const blob = new Blob([jsonString], { type: "application/json" });

  // Step 3: Create a downloadable link using the Blob
  const url = URL.createObjectURL(blob);

  // Step 4: Trigger the link to start the download
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "SplashScreenConfig.uae"; // Set the desired filename here
  anchor.click();

  // Cleanup: Revoke the URL object to free up resources
  URL.revokeObjectURL(url);
}
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

async function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
const imageUrl = document.getElementById("imageUrl");
const fileInput = document.getElementById("fileInput");
async function loadUserImage() {
  try {
    if (imageUrl.value) {
      user_img.set_url(imageUrl.value);
      user_img.initlizeImage(imageUrl.value);
      return imageUrl.value; // Return the image URL
    } else if (fileInput.files && fileInput.files[0]) {
      const imageData = await readImageFile(fileInput.files[0]);
      user_img.initlizeImage(imageData);
      return imageData; // Return the image data
    } else {
      throw new Error(
        "Please provide either an image URL or select an image file."
      );
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
function handleUpload() {
  user_img.wait_forload().then(() => {
    resetPositions();
  });
}
function handleImageUrl(event) {
  event.preventDefault();
  user_img.set_url(imageUrl.value);
  user_img.initlizeImage(imageUrl.value);
  handleUpload();
}
function handleImageUpload(event) {
  event.preventDefault();
  readImageFile(fileInput.files[0]).then((x) => {
    user_img.initlizeImage(x);
    handleUpload();
  });
}
function chnageState(element,allowed){
  if(allowed){
    if(!element.classList.contains("active")){
      element.classList.add("active")
    }
  }
  else{
    if(element.classList.contains("active")){
      element.classList.remove("active")
    }
  }
}
function handlePositionUI(allowed_X,allowed_Y){
  const posx = document.querySelector(".pos_x");
  const posy= document.querySelector(".pos_y");
  console.log(posx);
  console.log(posy);
  chnageState(posx,allowed_X);
  chnageState(posy,allowed_Y);
}
function resetPositions() {
  user_img.assignNewDimension();  
  user_x.value = user_img.user_x;
  user_y.value = user_img.user_y;
  var isPortrait = user_img.isPortrait();
  handlePositionUI(isPortrait,!isPortrait)

  handle_diemnsionChange();
}
// Rendering
const bg = new ImageBase(
  0,
  0,
  1500,
  1000,
  0,
  "PhotoshopSplashImages/bg.png",
  "#ffffff",
  null,
  true
);
const app_logo = new ImageBase(
  64,
  64,
  176 - 64,
  172 - 64,
  1,
  "PhotoshopSplashImages/app_logo_box.png",
  "#31a8ff",
  null,
  true
);
const app_logo_inside = new ImageBase(
  64,
  64,
  176 - 64,
  172 - 64,
  1,
  null,
  null,
  null,
  true
);
const app_text = new ImageBase(196, 82, null, null, 1, null, null, null, true);
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
  "PhotoshopSplashImages/text2.png",
  "#5c5c5c",
  null,
  true
);
const user_img = new UserImage(
  639,
  31,
  829,
  938,
  1,
  "PhotoshopSplashImages/user_img.png"
);
const defaultImage = "PhotoshopSplashImages/user_img.png";
user_img.initlizeImage(defaultImage);
const imageArray = [
  app_text,
  bg,
  app_logo,
  app_logo_inside,
  cloud_logo,
  adobe_text,
  user_img,
];
function renderImagesOnCanvas() {
  // Sort the images based on their zOrder in ascending order
  const sortedImages = imageArray.sort((a, b) => a.zOrder - b.zOrder);

  // Set the global alpha to a value less than 1 to make the canvas transparent
  ctx.globalAlpha = 0.0;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reset the global alpha to 1.0 (fully opaque) if you want to draw with full opacity again
  ctx.globalAlpha = 1.0;
  // Loop through the sorted images and draw them on the canvas
  sortedImages.forEach(async (image) => {
    await image.draw(ctx);
  });
}
// Debounce function to limit the number of render calls
function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, arguments), delay);
  };
}
function update_color(element) {
  const colorPickerId = element.colorPickerId;
  const colorTextId = element.colorTextId;
  const imagebase = element.imagebase;
  const defaultColor = element.defaultColor;
  const is_black = element.is_black;

  const colorPicker = document.getElementById(colorPickerId);
  const colorPickertext = document.getElementById(colorTextId);

  const change = (value) => {
    colorPickertext.textContent = value;
    colorPicker.value = value;
    if (is_black !== true) {
      imagebase.set_white_color(value);
    } else {
      imagebase.set_black_color(value);
    }
  };

  change(defaultColor);

  colorPicker.addEventListener(
    "input",
    debounce(() => {
      change(colorPicker.value);
      renderImagesOnCanvas();
    }, 5)
  );
}

function update_color_visuals_from_image(image) {
  const element = color_arr.find((x) => x.imagebase === image);

  const colorPicker = document.getElementById(element.colorPickerId);
  const colorPickertext = document.getElementById(element.colorTextId);
  const value = image.color_white;
  colorPickertext.textContent = value;
  colorPicker.value = value;
}
const color_arr = [
  {
    colorPickerId: "color1",
    colorTextId: "color1Text",
    imagebase: bg,
    defaultColor: "#ffffff",
  },
  {
    colorPickerId: "color2",
    colorTextId: "color2Text",
    imagebase: app_text,
    defaultColor: "#081d34",
  },
  {
    colorPickerId: "color3",
    colorTextId: "color3Text",
    imagebase: adobe_text,
    defaultColor: "#5c5c5c",
  },
  {
    colorPickerId: "color4",
    colorTextId: "color4Text",
    imagebase: app_logo_inside,
    defaultColor: "#31a8ff",
  },
  {
    colorPickerId: "color5",
    colorTextId: "color5Text",
    imagebase: app_logo,
    defaultColor: "#001e36",
  },
];

color_arr.forEach((element) => {
  update_color(element);
});
const apps = [
  {
    title: "Photoshop",
    name: "ps",
    file: "ps.png",
    logo_bg_color: "#001e36",
    logo_color: "#31a8ff",
    text_color: "#081d34",
  },
  {
    title: "Premiere Pro",
    name: "pr",
    file: "pr.png",
    logo_bg_color: "#00005b",
    logo_color: "#9999ff",
    text_color: "#00005b",
  },
  {
    title: "After Effects",
    name: "ae",
    file: "ae.png",
    logo_bg_color: "#00005b",
    logo_color: "#9999ff",
    text_color: "#00005b",
  },
  {
    title: "Illustrator",
    name: "ai",
    file: "ai.png",
    logo_bg_color: "#330000",
    logo_color: "#ff9a00",
    text_color: "#330000",
  },
  {
    title: "Media Encoder",
    name: "me",
    file: "me.png",
    logo_bg_color: "#00005b",
    logo_color: "#9999ff",
    text_color: "#00005b",
  },
  {
    title: "Animate",
    name: "an",
    file: "an.png",
    logo_bg_color: "#00005b",
    logo_color: "#9999ff",
    text_color: "#00005b",
  },
  {
    title: "Audition",
    name: "au",
    file: "au.png",
    logo_bg_color: "#00005b",
    logo_color: "#9999ff",
    text_color: "#00005b",
  },
  {
    title: "Lightroom",
    name: "lr",
    file: "lr.png",
    logo_bg_color: "#001e36",
    logo_color: "#31a8ff",
    text_color: "#011f37",
  },
  {
    title: "Lightroom Classic",
    name: "lrc",
    file: "lrc.png",
    logo_bg_color: "#001e36",
    logo_color: "#31a8ff",
    text_color: "#011f37",
  },
  {
    title: "InDesign",
    name: "id",
    file: "id.png",
    logo_bg_color: "#49021f",
    logo_color: "#ff3366",
    text_color: "#49021f",
  },
  {
    title: "DreamWeaver",
    name: "dw",
    file: "dw.png",
    logo_bg_color: "#470137",
    logo_color: "#ff61f6",
    text_color: "#470137",
  },
  {
    title: "InCopy",
    name: "ic",
    file: "ic.png",
    logo_bg_color: "#49021f",
    logo_color: "#ff3366",
    text_color: "#49021f",
  },
  {
    title: "Character Animator",
    name: "ch",
    file: "ch.png",
    logo_bg_color: "#00005b",
    logo_color: "#9999ff",
    text_color: "#00005b",
  },
];

const selector = document.getElementById("app_select");
selector.options.length = 0;
apps.forEach((app) => {
  let html = "";
  html += `
    <option value="${app.name}">${app.title}</option>
`;
  selector.innerHTML += html;
});

const reset_colors = document.getElementById("is_setToDefaultActive");
async function select_adobe_app_wait(app) {
  select_adobe_app(app);
  await Promise.all([app_text.init(), app_logo_inside.init()]);
}
function select_adobe_app(app) {
  selector.value = app.name;
  app_logo_inside.set_url(`PhotoshopSplashImages/app_icons/${app.file}`);
  app_text.set_url(`PhotoshopSplashImages/app_texts/${app.file}`);
  if (reset_colors.checked) {
    app_logo_inside.color_white = app.logo_color;
    app_text.color_white = app.text_color;
    app_logo.color_white = app.logo_bg_color;
    update_color_visuals_from_image(app_logo);
    update_color_visuals_from_image(app_text);
    update_color_visuals_from_image(app_logo_inside);
  }
}

function handle_diemnsionChange() {
  handle_diemnsionChangeDontUpdate();
  renderImagesOnCanvas();
}
function handle_diemnsionChangeDontUpdate() {
  const x = user_x.value;
  const y = user_y.value;
  user_img.set_dimensions(x, y, 0, 0);
  user_x.value = user_img.user_x;
  user_y.value = user_img.user_y;
}
user_x.addEventListener("change", handle_diemnsionChange);
user_y.addEventListener("change", handle_diemnsionChange);
// async function select_adobe_app(app){
//   selector.value = app.name;
//   app_logo_inside.
// }

select_adobe_app(apps[0]);
selector.addEventListener("change", (event) => {
  const value = event.target.value;
  const selectedApp = apps.find((x) => x.name == value);
  select_adobe_app_wait(selectedApp).then(() => {
    renderImagesOnCanvas();
  });
});

Promise.all(imageArray.map((image) => image.init()))
  .then(() => {
    user_img.user_init().then(() => {
      handleUpload();
    });
    // renderImagesOnCanvas();
  })
  .catch((error) => {
    console.error(error);
  });

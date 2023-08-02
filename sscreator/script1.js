// Create image editor
var imageEditor = new tui.component.ImageEditor('#canvas-container canvas', {
  cssMaxWidth: 1500, // Component default value: 1000
  cssMaxHeight: 1000, // Component default value: 800
});

// Load image
imageEditor.loadImageFromURL('PhotoshopSplashImages/bg.png', 'My sample image');
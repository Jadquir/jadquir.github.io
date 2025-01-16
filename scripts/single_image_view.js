function showImage(src) {
    const modal = document.querySelector("#imageModal");
    const modalContent = modal.querySelector(".modal-content");
    const loader = modal.querySelector(".loader") ;

    // Create a new image element
    const img = new Image();
    img.src = src;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";

    // Show loader while image is loading
    loader.style.display = "flex";
    modalContent.style.display = "none";
    modalContent.style.border = "1px solid #ffffff4f";
    modalContent.style.borderRadius = "15px";
    modalContent.innerHTML = ""; // Clear previous content

    setLoaderText(true, "Loading...");

    img.onload = () => {
        modalContent.style.display = "block";
        loader.style.display = "none";
        modalContent.appendChild(img);
        modal.style.display = "flex";
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10); // Delay to trigger fade-in effect
    };

    img.onerror = () => {
        setLoaderText(false, "Failed to load image");
    };

    // Show modal
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.opacity = "1";
    }, 10); // Delay to trigger fade-in effect
}
function setLoaderText(isLoading, text){
    const modal = document.querySelector("#imageModal");
    const loader = modal.querySelector(".loader") ;
    loader.innerHTML = `${isLoading ? `<div class="custom-loader"></div>` : ""}<span>${text}</span>`

}
// Add the modal and its styling to the document on page load
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.createElement("div");
    const loader = document.createElement("div");
    const modalContent = document.createElement("div");
    const closeButton = document.createElement("div");

    modal.id = "imageModal";

    // Modal Styling
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    modal.style.display = "none";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "9999999";
    modal.style.opacity = "0";
    modal.style.transition = "opacity 0.3s ease";

    // Loader Styling
    loader.style.color = "#fff";
    loader.style.fontSize = "20px";
    loader.style.display = "none";
    loader.style.alignItems = "center"
    loader.style.gap = "17px"
    loader.className = "loader"

    // Modal Content Styling
    modalContent.style.width = "90%";
    modalContent.style.height = "90%";
    modalContent.className = "modal-content"

    // Close Button Styling
    closeButton.style.position = "absolute";
    closeButton.style.top = "20px";
    closeButton.style.right = "20px";
    closeButton.style.width = "30px";
    closeButton.style.height = "30px";
    closeButton.style.cursor = "pointer";
    closeButton.style.display = "flex";
    closeButton.style.justifyContent = "center";
    closeButton.style.alignItems = "center";
    closeButton.style.zIndex = "99999999";
    closeButton.style.backgroundColor = "transparent";

    // Close Button Cross Styling
    closeButton.innerHTML = `
        <div style="position: absolute; width: 100%; height: 2px; background: white; transform: rotate(45deg);"></div>
        <div style="position: absolute; width: 100%; height: 2px; background: white; transform: rotate(-45deg);"></div>
    `;

    closeButton.addEventListener("click", () => {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300); // Match transition duration
    });
    modal.addEventListener("click", (event) => {
        if (event.target === modal) { // Ensure the click is on the modal itself
            modal.style.opacity = "0";
            setTimeout(() => {
                modal.style.display = "none";
            }, 300); // Match transition duration
        }
    });
    modal.appendChild(loader);
    modal.appendChild(modalContent);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);




    CheckViewImages();
});
function CheckViewImages(){
    // Add event listener to all .viewable images
    const images = document.querySelectorAll("img.viewable");
    images.forEach(image => {
        image.style.cursor = "pointer"; // Change cursor to pointer
        image.addEventListener("click", () => {
            showImage(image.dataset.src ?? image.src);
        });
    });
}
function onloadWindow(){
  
  const toggleButton = document.querySelector(".nav-toggle");
  const navBar =  document.querySelector("#primary-navigation");
  const menuIcon =  document.querySelector("#hamburger");
  const header =  document.querySelector("#primary-header");
  const navLinks = document.querySelectorAll("#primary-navigation a"); // Select all nav links
  
  toggleButton.addEventListener("click", () => {
      const isVisible = navBar.getAttribute("data-visible");
      const newVal = isVisible === "false" ?  "true" : "false";
  
      menuIcon.className = isVisible === "false" ?  "animate" : "";
      navBar.setAttribute("data-visible", newVal);
      header.setAttribute("data-visible", newVal);
      toggleButton.setAttribute("aria-expanded", newVal);
  });

  // Close the navigation when any link is clicked
  navLinks.forEach(link => {
      link.addEventListener("click", () => {
          navBar.setAttribute("data-visible", "false");
          header.setAttribute("data-visible", "false");
          toggleButton.setAttribute("aria-expanded", "false");
          menuIcon.className = ""; // Reset the icon if necessary
      });
  });
}
// function checkScroll(){
//   var scrollPosition = window.scrollY;
//   var container = document.querySelector('#navContainer');
//   if (container) {
//     if (scrollPosition > 20 && !container.classList.contains('open')) {
//       container.classList.add('open');
//     } else if(scrollPosition <= 20) {
//       container.classList.remove('open');
//     }
//   }
// }

// window.addEventListener('scroll', checkScroll);
window.addEventListener('load', onloadWindow);

// const footer = document.querySelector("footer");

// footer.innerHTML = `This website is made by Jadquir. Copyright &copy; ${new Date().getFullYear()}. All rights reserved.`

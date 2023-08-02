const tabs = document.querySelectorAll(".tabs");
function showTabContent(tabIndex) {

    const forms = document.querySelectorAll('.content form');
    forms.forEach((form, index) => {
      if (index === tabIndex) {
        form.style.display = 'flex';
      } else {
        form.style.display = 'none';
      }
    });
  }
tabs.forEach((tabsElement) => {
  const tabElements = tabsElement.querySelectorAll(".tab");
  let activeElement = null;
  function get_active() {
    return activeElement;
  }
  function remove_active() {
    const element = get_active();
    
    if (element) {
      element.classList.remove("active");
    }
  }
  function switchTab(element) {
    remove_active();
    element.classList.add("active");
    activeElement = element;
  }

  for (let index = 0; index < tabElements.length; index++) {
    const element = tabElements[index];
    const title = element.querySelector(".title");
    title.addEventListener("click", () => {
      switchTab(element);
    });
    if (index === 0) {showTabContent(0)
      switchTab(element);
    }
  }
});

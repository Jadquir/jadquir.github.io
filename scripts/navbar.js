
function loadEvent(){
    document.addEventListener("scroll",() => {
        scrollBG();
    }); 
    scrollBG();
    for (let button1 of document.querySelectorAll("button")) {
        button1.onclick = () => {  button1.querySelector("a").click(); }
    }
    for (let li1 of document.querySelectorAll("li")) {
        li1.onclick = () => {  li1.querySelector("a").click(); }
    }

    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    })
}

function scrollBG(){
     var scrollTopVal = $(document).scrollTop() ;
        var alpha = scrollTopVal / 300;
    if(alpha > .85){ alpha = .85 ;}

    document.getElementById("fixed").innerHTML = alpha;
    var navbar = document.getElementById("navbar");
    current_color = getComputedStyle(navbar).getPropertyValue("background-color");
    match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(current_color);
    navbar.style.backgroundColor = "rgba(" + [match[1],match[2],match[3],alpha].join(',') +")";
}
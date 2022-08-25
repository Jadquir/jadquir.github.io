return;
$(document).ready(function() {

    var container = document.createElement("div");
    container.className = "bubble-container";

    
    var bubbles = document.createElement("ul");
    bubbles.className = "bubbles";

    for (let index = 0; index < 18; index++) {
        
        var bubble = document.createElement("li");
        bubbles.appendChild(bubble);
    }

    container.appendChild(bubbles);
    document.body.insertBefore(container, document.querySelector("#navbar"));

});
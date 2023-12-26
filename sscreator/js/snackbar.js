
window.addEventListener("load",()=>{
    const snackbar = document.getElementById("snackbar");

    const isVisible = () => snackbar.classList.contains("visible");
    var timer = {};
    function showSnackbar(message, seconds, style){
        if(isVisible()){
            closeSnackbar();
            setTimeout(()=>{
                showSnackbar(message,seconds,style)
            },550);
            return;
        }
    
        snackbar.innerHTML = message;
        snackbar.classList.forEach(element => {
            snackbar.classList.remove(element);
        });
        if(style){
            snackbar.classList.add(style);
        }
        
        snackbar.classList.add("visible");

        timer = setTimeout(handleTimer, seconds);
    }
    function handleTimer(){
        closeSnackbar();
    }
    
    function closeSnackbar(){
        console.log("closing snackbar");
        snackbar.classList.remove("visible");
        if(timer){
            clearTimeout(timer);
        }
    
    }
    
    // showSnackbar("Hello this is a text!", 1200);

    window.showSnackbar = showSnackbar;
});

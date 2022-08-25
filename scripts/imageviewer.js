$(document).ready(function() {

    // required elements
    var imgPopup = $('.img-popup');
    var imgCont  = $('img');
    var popupImage = $('.img-popup img');
    var closeBtn = $('.close-btn');
            
    // handle events
    imgCont.on('click', function() {
      var img_src = $(this).attr('src');
      img_src = img_src.replace("low_res","high_res");
      imgPopup.children('img').attr('src', img_src);
      imgPopup.addClass('opened');
    });
    
    $(imgPopup, closeBtn).on('click', function() {
      imgPopup.removeClass('opened');
      imgPopup.children('img').attr('src', '');
    });
    
    popupImage.on('click', function(e) {
      e.stopPropagation();
    });
    
    });
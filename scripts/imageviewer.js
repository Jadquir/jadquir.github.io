$(document).ready(function() {

    // required elements
    var imgPopup = $('.img-popup');
    var imgCont  = $('img');
    var popupImage = $('.img-popup img');
    var detailsTitle = $('.img-popup .details .Title');
    var detailsDescription = $('.img-popup .details .Description');
    var closeBtn = $('.close-btn');
  
    // handle events
    imgCont.on('click', function(event) {
      var img_src = $(this).attr('src');
      img_src = img_src.replace("low_res","high_res");
      imgPopup.children('img').attr('src', img_src);
      try{
        detailsTitle.text($(event.target)[0].dataset.atitle);
        detailsDescription.text($(event.target)[0].dataset.description);
  
      }
      catch(e){
          console.error(e);
      }
      
      imgPopup.addClass('opened');
    });
    
    $(closeBtn).on('click', function() {
      imgPopup.removeClass('opened');
      imgPopup.children('img').attr('src', '');
    });
    
    popupImage.on('click', function(e) {
      e.stopPropagation();
    });
    
    });
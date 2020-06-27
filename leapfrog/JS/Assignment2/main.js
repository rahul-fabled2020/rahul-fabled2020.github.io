carousel1 = new Carousel();

carousel2 = new Carousel({
  container: ".carousel-container2",
  transitionTime: 1000, // in milliseconds
  holdTime: 1500 //in milliseconds
});

carousel3 = new Carousel({
  container: "#myCarousel",
  transitionTime: 1500, // in milliseconds
  holdTime: 2000, //in milliseconds
  autoPlay: false
});

document.querySelectorAll('form').forEach(function(form){
  form.addEventListener('submit',function (e){
    e.preventDefault();
    
    var carouselNum = form.hidden.value;
    var carousel = eval('carousel'+carouselNum);
    
    var transitionTime = form.transitionTime.value;
    var holdTime = form.holdTime.value;
    var autoPlay = form.autoPlay.checked;

    if(transitionTime!= ""){
      transitionTime = parseInt(transitionTime);
      carousel.setTransitionTime(transitionTime);
    }

    if(holdTime!= ""){
      holdTime = parseInt(holdTime);
      carousel.setHoldTime(holdTime);
    }

    carousel.setAutoPlay(autoPlay);
  });
});

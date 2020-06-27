//Carousel Class
function Carousel(configuration) {
  var index = 0;
  var isMoving = false;
  var imagesCount = 0;
  var carousel;
  var wrapper;
  var ul;
  var li;
  var imageWidth = 400;
  var slideTime = 500; //number of milliseconds
  var holdTime = 1000; //number of milliseconds

  var autoPlayIntervalId;
  var autoSlide = true;

  var ELEMENT_NODE = 1;
  var FPS = 60;

  var currentPosition = 0;

  var initCarousel = function () {
    var DEFAULT_CONTAINER_CLASS = ".carousel-container";
    var carouselName = DEFAULT_CONTAINER_CLASS;

    if (configuration) {
      carouselName = configuration.container || DEFAULT_CONTAINER_CLASS;

      if (configuration.transitionTime > 0) {
        slideTime = configuration.transitionTime;
      }

      if (configuration.holdTime > 0) {
        holdTime = configuration.holdTime;
      }

      if (configuration.autoPlay === false) {
        autoSlide = false;
      }
    }

    carousel = document.querySelector(carouselName);
    carousel.classList.add("carousel-container-wrapper");
    imageWidth = carousel.childNodes[1].clientWidth;

    wrapper = document.createElement("div");
    wrapper.setAttribute("class", "carousel-image-wrapper");

    window.addEventListener("resize", function () {
      imageWidth = carousel.clientWidth;
      resizeImages();
      resizeWrapper();
    });

    moveFromContainerToWrapper();
    renderWrapper();
    createIndicatorDots();
    createNavigationButtons();
    addClickEventsToControls();
  };

  initCarousel();
  
  //Sets the transition delay time in milliseconds
  this.setTransitionTime = function (timeInMilliSeconds) {
    slideTime = timeInMilliSeconds;
  };

  //Sets the hold delay time in milliseconds
  this.setHoldTime = function (timeInMilliSeconds) {
    clearInterval(autoPlayIntervalId);
    holdTime = timeInMilliSeconds;
    autoPlaySlide();
  };

  //Sets autoSlide to true or false
  this.setAutoPlay = function (boolean) {
    autoSlide = boolean;
  };

  //Moves all images from main container to newly created container
  function moveFromContainerToWrapper() {
    while (carousel.childNodes.length > 0) {
      var element = carousel.childNodes[0];
      if (element.nodeType === ELEMENT_NODE) {
        element.style.width = imageWidth + "px";
        imagesCount++;
      }
      wrapper.appendChild(element);
    }
  }

  //Resize images
  function resizeImages() {
    wrapper.childNodes.forEach(function (slideItem) {
      
      if(slideItem.nodeType == ELEMENT_NODE){
        slideItem.style.width = imageWidth + "px";
      }
      
    });
  }

  //Resizes wrapper
  function resizeWrapper() {
    wrapper.style.width = imagesCount * imageWidth + "px";
  }

  //Rendering wrapper (newly created container)
  function renderWrapper() {
    carousel.appendChild(wrapper);
    carousel.style.width = imageWidth + "px";

    wrapper.style.width = imagesCount * imageWidth + "px";
    wrapper.style.left = currentPosition + "px";
  }

  //Indicator Dots
  function createIndicatorDots() {
    ul = document.createElement("ul");
    ul.setAttribute("class", "indicator-dot");

    for (var i = 0; i < imagesCount; i++) {
      li = document.createElement("li");
      li.setAttribute("data-slideTo", i);
      ul.appendChild(li);
    }

    ul.firstElementChild.classList.add("active");

    carousel.appendChild(ul);
  }

  //Returns the Position of the given index of image
  function getPosition(index) {
    return -index * imageWidth;
  }

  //Returns the next adjacent index of image (The next index of last index is 0)
  function getNextIndex(index) {
    return (index + 1) % imagesCount;
  }

  //Returns the previous adjacent index of image (The previous index of 0 index is last index)
  function getPreviousIndex(index) {
    return (index - 1 + imagesCount) % imagesCount;
  }

  //Sets the index to new index
  function setIndex(nextIndex) {
    index = nextIndex;

    return;
  }

  //Animates the slide from given index to desired index
  function slideImage(currentIndex, nextIndex) {
    if (!isMoving) {
      var nextPosition = getPosition(nextIndex);
      var distance = Math.abs(nextPosition - currentPosition);
      var sign = nextPosition >= currentPosition ? 1 : -1;
      var speed = (1000 * distance) / slideTime / FPS;

      //Animation using setInterval()
      var intervalId = setInterval(function () {
        isMoving = true;
        currentPosition += speed * sign;

        if (
          (currentPosition >= nextPosition && sign == 1) ||
          (currentPosition <= nextPosition && sign == -1)
        ) {
          currentPosition = nextPosition;

          isMoving = false;
          setIndex(nextIndex);

          wrapper.style.left = currentPosition + "px";
          ul.childNodes[currentIndex].classList.remove("active");
          ul.childNodes[nextIndex].classList.add("active");
          clearInterval(intervalId);
        }

        wrapper.style.left = currentPosition + "px";
      }, 1000 / FPS);
    }
  }

  // Delays autoplay for hold time duration
  function autoPlaySlide() {
    autoPlayIntervalId = setInterval(function () {
      if (autoSlide) {
        slideImage(index, getNextIndex(index));
      }
    }, holdTime + slideTime);
  }

  autoPlaySlide();

  //Creates Navigation Buttons
  function createNavigationButtons() {
    LEFT_BUTTON = document.createElement("img");
    LEFT_BUTTON.src = "carousel_images/previous.svg";
    LEFT_BUTTON.setAttribute("class", "button previous");

    RIGHT_BUTTON = document.createElement("img");
    RIGHT_BUTTON.src = "carousel_images/next.svg";
    RIGHT_BUTTON.setAttribute("class", "button next");

    carousel.appendChild(LEFT_BUTTON);
    carousel.appendChild(RIGHT_BUTTON);
  }

  //Adds click event to control and indicator buttons
  function addClickEventsToControls() {
    //Navigation Buttons
    LEFT_BUTTON.addEventListener("click", function () {
      nextIndex = getPreviousIndex(index);
      clearInterval(autoPlayIntervalId);
      slideImage(index, nextIndex);
      autoPlaySlide();
    });

    RIGHT_BUTTON.addEventListener("click", function () {
      nextIndex = getNextIndex(index);
      clearInterval(autoPlayIntervalId);
      slideImage(index, nextIndex);
      autoPlaySlide();
    });

    //Indicator  Buttons
    for (var i = 0; i < ul.childNodes.length; i++) {
      childLi = ul.childNodes[i];

      childLi.addEventListener("click", function () {
        var childIndex = this.getAttribute("data-slideTo");
        if (index != childIndex) {
          slideImage(index, childIndex);
        }
      });
    }
  }
}

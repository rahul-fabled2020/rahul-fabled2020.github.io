//Carousel Class
function Carousel(configuration) {
  var index = 0;
  var isMoving = false;
  var imagesCount = 0;
  var carousel;
  var wrapper;
  var ul;
  var li;
  var imageWidth;
  var slideTime = 1000; //number of milliseconds
  var autoSlide = true;

  var ELEMENT_NODE = 1;
  var LEFT = -1;
  var RIGHT = 1;
  var FPS = 60;

  var DEFAULT_START_POSITION = 0;

  this.initCarousel = function () {
    var DEFAULT_CONTAINER_CLASS= ".carousel-container";
    var carouselName = DEFAULT_CONTAINER_CLASS;

    if(configuration){
      carouselName = configuration.container || DEFAULT_CONTAINER_CLASS;
    }

    carousel = document.querySelector(carouselName);
    carousel.classList.add('carousel-container-wrapper');
    imageWidth = carousel.childNodes[1].clientWidth;

    wrapper = document.createElement("div");
    wrapper.setAttribute("class", "carousel-image-wrapper");

    moveFromContainerToWrapper();
    renderWrapper();
    createIndicatorDots();
    createNavigationButtons();
    addClickEventsToControls();

    console.log(carousel);
  };

  //Sets the transition delay time in milliseconds
  this.setTransitionTime= function(time){
    slideTime = time;
  }

  this.initCarousel();

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

  //Rendering wrapper (newly created container)
  function renderWrapper() {
    carousel.appendChild(wrapper);
    carousel.style.width = imageWidth + "px";

    wrapper.style.width = imagesCount * imageWidth + "px";
    wrapper.style.left = DEFAULT_START_POSITION + "px";
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
      var direction;
      if (currentIndex < nextIndex) {
        direction = RIGHT;
      } else {
        direction = LEFT;
      }

      var currentPosition = getPosition(currentIndex);
      var nextPosition = getPosition(nextIndex);
      var distance = Math.abs(nextPosition - currentPosition);
      var speed = (1000 * distance) / slideTime / FPS;
      var x = 0;

      //Animation using setInterval()
      var intervalId = setInterval(function () {
        isMoving = true;
        x += speed;

        if (x >= distance) {
          x = distance;
          isMoving = false;
          setIndex(nextIndex);

          wrapper.style.left = currentPosition + x * direction + "px";
          ul.childNodes[currentIndex].classList.remove("active");
          ul.childNodes[nextIndex].classList.add("active");
          clearInterval(intervalId);
        }

        wrapper.style.left = currentPosition - x * direction + "px";
      }, 1000 / FPS);
    }
  }

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
      slideImage(index, nextIndex);
    });

    RIGHT_BUTTON.addEventListener("click", function () {
      nextIndex = getNextIndex(index);
      slideImage(index, nextIndex);
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

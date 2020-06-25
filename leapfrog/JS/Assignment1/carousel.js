carousel = document.querySelector(".carousel-container");
wrapper = document.createElement("div");
wrapper.setAttribute("class", "carousel-image-wrapper");

imagesCount = 0;
ELEMENT_NODE = 1;
IMAGE_WIDTH = carousel.childNodes[1].clientWidth;
LEFT = -1;
RIGHT = 1;
SLIDE_TIME = 1000; //number of milliseconds
FPS = 60;

//Moving all images from main container to newly created container
while (carousel.childNodes.length > 0) {
  var element = carousel.childNodes[0];
  if (element.nodeType === ELEMENT_NODE) {
    element.style.width = IMAGE_WIDTH + "px";
    imagesCount++;
  }
  wrapper.appendChild(element);
}

//Rendering wrapper (newly created container)
carousel.appendChild(wrapper);
carousel.style.width = IMAGE_WIDTH + "px";

wrapper.style.width = imagesCount * IMAGE_WIDTH + "px";
wrapper.style.left = 0 + "px";

//Indicator Dots
ul = document.createElement("ul");
ul.setAttribute("class", "indicator-dot");

for (var i = 0; i < imagesCount; i++) {
  li = document.createElement("li");
  li.setAttribute("data-slide-to", i);
  ul.appendChild(li);
}

ul.firstElementChild.classList.add("active");

carousel.appendChild(ul);

var index = 0;
var isMoving = false;

function getPosition(index) {
  return -index * IMAGE_WIDTH;
}

function getNextIndex(index) {
  return (index + 1) % imagesCount;
}

function getPreviousIndex(index) {
  return (index - 1 + imagesCount) % imagesCount;
}

function setIndex(nextIndex) {
  index = nextIndex;
}

var slideImage = function (currentIndex, nextIndex) {
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
    var speed = (1000 * distance) / SLIDE_TIME / FPS;
    var x = 0;
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
};

//Control Buttons
LEFT_BUTTON = document.createElement("img");
LEFT_BUTTON.src = "carousel_images/previous.svg";
LEFT_BUTTON.setAttribute("class", "button previous");

RIGHT_BUTTON = document.createElement("img");
RIGHT_BUTTON.src = "carousel_images/next.svg";
RIGHT_BUTTON.setAttribute("class", "button next");

carousel.appendChild(LEFT_BUTTON);
carousel.appendChild(RIGHT_BUTTON);

LEFT_BUTTON.addEventListener("click", function () {
  nextIndex = getNextIndex(index);
  slideImage(index, nextIndex);
});

RIGHT_BUTTON.addEventListener("click", function () {
  nextIndex = getPreviousIndex(index);
  slideImage(index, nextIndex);
});

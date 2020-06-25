carousel = document.querySelector('.carousel-container');
wrapper = document.createElement('div');
wrapper.setAttribute('class','carousel-image-wrapper');

imagesCount = 0;
ELEMENT_NODE = 1
IMAGE_WIDTH = carousel.childNodes[1].clientWidth;

while (carousel.childNodes.length > 0) {
    var element = carousel.childNodes[0];
    if(element.nodeType === ELEMENT_NODE){
        imagesCount++;
    }
    wrapper.appendChild(element);
}


carousel.appendChild(wrapper);
carousel.style.width = IMAGE_WIDTH+'px';
wrapper.style.width = imagesCount*IMAGE_WIDTH + 'px';

var index = 0;
LEFT  = -1;
RIGHT = +1;
SLIDE_TIME = 100;
FPS = 60;
var x = wrapper.style.left;

function animateSlide() {    
    x--;
    wrapper.style.left = x +'px';
}

var slideImage = function(direction) {
    index = (index+direction+imagesCount) % imagesCount;
    var shiftBy= -index * IMAGE_WIDTH;

    // while(){
    //     setTimeout(animateSlide, 1000/(FPS*SLIDE_TIME));
    // }
    
    wrapper.style.left = shiftBy +'px';
}


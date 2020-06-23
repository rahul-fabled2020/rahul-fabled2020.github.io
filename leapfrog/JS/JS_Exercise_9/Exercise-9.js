box = document.createElement("div");
box.style.height = 600+'px';
box.style.width = 600+'px';
box.style.margin="40px auto";
box.style.border="1px solid black";
box.style.position = "relative";
box.style.overflow = "hidden";
document.body.appendChild(box);

ball = document.createElement("div");
ball.style.borderRadius = 50+'%';
ball.style.height = 50+'px';
ball.style.width = 50+'px';
ball.style.position = "absolute";
ball.style.top = "0";
ball.style.left = "50%";
ball.style.transform="translateX(-50%)";
ball.style.backgroundColor="red";
box.appendChild(ball);

speed = 5;
x= parseInt(getComputedStyle(ball).getPropertyValue("left"));
y= parseInt(getComputedStyle(ball).getPropertyValue("top"));
diameter = parseInt(getComputedStyle(ball).getPropertyValue("height"));

setInterval(animateBallVertically, 1000/60);

var reverse = false;
function animateBallVertically(){
    height = parseInt(getComputedStyle(box).getPropertyValue("height"));
    if(y <= 0)
        reverse = false;
    if(y+diameter>=height)
        reverse = true;
    if(reverse){
        y-=speed;
    }else{
        y+=speed;
    }
    ball.style.top = y+'px';
}



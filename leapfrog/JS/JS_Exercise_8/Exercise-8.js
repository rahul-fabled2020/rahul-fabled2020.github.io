var points = [
    {x: 10, y: 20},
    {x: 40, y: 40},
    {x: 60, y: 20},
    {x:500,y:486},
    {x:524,y:105},
    {x:421,y:301},
    {x:564,y:12},
    {x:49,y:245},
    {x:451,y:188},
    {x:124,y:375},
    {x:484,y:373},
    {x:113,y:259},
    {x:57,y:586},
    {x:594,y:440},
    {x:69,y:186},
    {x:201,y:102},
    {x:386,y:548},
    {x:418,y:11},
    {x:105,y:414},
    {x:123,y:125},
    {x:117,y:213},
    {x:474,y:290},
    {x:579,y:390},
    {x:575,y:361},
    {x:307,y:151},
    {x:152,y:278},
    {x:79,y:258},
    {x:584,y:325},
    {x:329,y:482},
    {x:327,y:155},
];

box = document.createElement("div");
box.style.height = 600+'px';
box.style.width = 600+'px';
box.style.margin="40px auto";
box.style.border="1px solid black";
box.style.position = "relative";
box.style.overflow = "hidden";
document.body.appendChild(box);

points.forEach(function(point){
    rr = parseInt(Math.random()*255)
    gg = parseInt(Math.random()*255)
    bb = parseInt(Math.random()*255)
    p = document.createElement("div");
    p.style.height=10+"px";
    p.style.width=10+"px";
    p.style.borderRadius="50%";
    p.style.backgroundColor = "rgb("+rr+","+gg+","+bb+")";
    p.style.position = "absolute";
    p.style.left = point.x+"px";
    p.style.top = point.y+"px";
    console.log(p);
    box.appendChild(p);
});



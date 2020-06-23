function starPattern(n){
    message = document.createElement("p");
    message.textContent = "Star Pattern of size "+n
    document.body.appendChild(message)
    for(var i=0;i<n;i++){
        var stars = "";
        p=document.createElement("p");
        for(var j=n-i;j>0;j--)
            stars+="* ";
            p.textContent=stars
        document.body.appendChild(p)
        console.log(stars);
    }
}

starPattern(5)
console.log("\n")
starPattern(10)
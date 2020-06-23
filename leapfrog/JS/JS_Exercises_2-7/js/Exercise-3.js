rahulObj = {
    name:"Rahul Sharma",
    address:"Lalitpur",
    emails:["rahul.fabled@gmail.com"],
    interest:["Programming","Learning mathematical facts","Teaching"],
    education:[
        {
            name:"Amrti Science Campus",
            enrolledDate: new Date("2015-01-01")
        },
        {
            name:"Pentagon International College",
            enrolledDate: new Date("2013-01-01")
        },        
    ]
}

education = rahulObj.education
education.forEach(function(eduObj){
    educationDetails = "Name: "+ eduObj.name + " Date: "+eduObj.enrolledDate.getFullYear();
    p = document.createElement("p")
    p.textContent = educationDetails
    document.body.appendChild(p)
    console.log(educationDetails);
})
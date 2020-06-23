function searchByName(array, name){
    to_search = name.toLowerCase();
    
    var found;
    array.forEach(function(obj){
        item = obj.name.toLowerCase();
        if(item==to_search){
            found=obj
        }
    });
    return found;
}

function searchByKey(array, key, value){
    to_search = (''+value).toLowerCase();

    var found;
    array.forEach(function(obj){
        Object.keys(obj).forEach(function(item){
            if(key==item && to_search==(''+obj[item]).toLowerCase()){
                found=obj
            }
        });
    });
    return found;
}

var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
]

console.log(searchByName(fruits, 'apple'));
console.log(searchByKey(fruits, 'name', 'apple'));
console.log(searchByKey(fruits, 'id', 1));
console.log(searchByKey(fruits, 'color', 'Yellow'));
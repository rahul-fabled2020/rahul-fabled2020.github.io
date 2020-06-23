var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

function sortBy(array, key) {
    output = array.map(function(item){
        return item;
    })
    output.sort(function(a,b){
        if(a[key]<b[key])
            return -1;
        else if(a[key]>b[key])
            return 1;
        else
            return 0;
    });
    return output
}

var sorted = sortBy(arr, 'name');
var sortById = sortBy(arr,'id');
console.log(sortById);
console.log(sorted)
console.log(arr)

function normalizeInput(input){
    output = {}
    ids={}
    function extractObjects(input, output){
        Object.keys(input).forEach(function(key){
            var obj = input[key];
            output[obj.id]=obj;
            if(obj.children!==undefined){
                
                children_ids=[]
                obj.children.forEach(function(child){
                    children_ids.push(child.id)
                });
           
                ids[obj.id]=children_ids;
                extractObjects(obj.children,output);

            }
        });
    }
    
    extractObjects(input,output);

    Object.keys(ids).forEach(function(key){
        output[key].children = ids[key];
    });

    return output;
}



var input = {
    '1': {
      id: 1,
      name: 'John',
      children: [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
    },
    '5': {
      id: 5,
      name: 'Mike',
      children: [{ id: 6, name: 'Peter' }]
    }
  };

console.log(normalizeInput(input));
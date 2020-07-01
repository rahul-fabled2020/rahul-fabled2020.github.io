function extend(ChildClass, ParentClass) {
  var parent = new ParentClass();

  ChildClass.prototype = parent;
  ChildClass.prototype.super = parent.constructor;
  ChildClass.prototype.constructor = ChildClass;
}

function toRadian(angleInDegree) {

  return (Math.PI / 180) * angleInDegree;
}

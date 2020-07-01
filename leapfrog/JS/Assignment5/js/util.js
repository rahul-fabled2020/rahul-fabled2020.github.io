/**
 * Performs inheritance
 * @param {object} ChildClass 
 * @param {object} ParentClass 
 */
function extend(ChildClass, ParentClass) {
  var parent = new ParentClass();

  ChildClass.prototype = parent;
  ChildClass.prototype.super = parent.constructor;
  ChildClass.prototype.constructor = ChildClass;
}

/**
 * Converts degree into radian
 * @param {number} angleInDegree 
 */
function toRadian(angleInDegree) {

  return (Math.PI / 180) * angleInDegree;
}

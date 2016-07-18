Array.prototype.indexByKey = funtion(keyName) {
  return this.reduce( (obj, el) => {
    obj[ el[keyName] ] = el;
    return obj;
  }, {});
};

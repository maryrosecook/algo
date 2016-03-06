function HashMap() {
  this.data = [];
};

HashMap.prototype = {
  set: function(key, value) {
    var keyHash = hash(key);
    if (!(keyHash in this.data)) {
      this.data[keyHash] = [];
    }

    if (this.get(key) !== undefined) {
      this.data[keyHash][this._index(key)][1] = value;
    } else {
      this.data[keyHash].push([key, value]);
    }
  },

  get: function(key) {
    var index = this._index(key);
    if (index !== undefined) {
      return this.data[hash(key)][index][1];
    }
  },

  _index: function(key) {
    var keyHash = hash(key);
    if (keyHash in this.data) {
      for (var i = 0; i < this.data[keyHash].length; i++) {
        if (this.data[keyHash][i][0] === key) {
          return i;
        }
      }
    }
  }
};

function hash(string) {
  if (typeof string !== "string") {
    throw new Error("Can only hash strings");
  }

  var hashInt = 0;
  for (var i = 0; i < string.length; i++) {
    hashInt = hashInt * 31 + string.charCodeAt(i);
    hashInt = hashInt | 0;
  }

  return hashInt;
};

var hashMap = new HashMap();

hashMap.set("a", 1);
hashMap.set("b", 2);
hashMap.set("a", 3);
console.log(hashMap.get("a"));
console.log(hashMap.get("b"));
console.log(hashMap.get("c"));
console.log(hashMap.get({}));

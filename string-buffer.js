function StringBuffer() {
  this.strings = [];
};

StringBuffer.prototype = {
  append: function(string) {
    this.strings.push(string);
  },

  toString: function() {
    return this.strings.join("");
  }
};

var sb = new StringBuffer();
for (var i = 1; i < 10000000000000; i *= 10) {
  sb.append(i);
}

console.log(sb.toString());

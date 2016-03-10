// Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficient space at the end to hold the additional characters, and than you are given the "true" length of the string. Input: "Mr John Smith" Output: "Mr%20John%20Smith"

var u = require("./util");

// Data types: unicode strings.
// Assumption: only need to replace spaces, no tabs or carriage returns or newlines
// Data amount: infinite string

// Time: n + n + n = O(n)
// Space: O(n)
// Tradeoffs: faster for more space
function urlify(str) {
  if (typeof str !== "string") {
    throw new Error("You must pass a string");
  }

  var arr = str.split(""); // n
  for (var i = 0; i < arr.length; i++) { // n
    if (arr[i] === " ") {
      arr[i] = "%20"; // 1
    }
  }

  return arr.join(""); // n
};

u.assert(urlify("Mr John Smith"), "Mr%20John%20Smith");
u.assertThrows("You must pass a string", function() {
  urlify();
});

// Constraint: get an array of chars and can't put more than 1 char per slot
function urlify2(charArray, trueLength) {
  if (Object.prototype.toString.call(charArray) !== "[object Array]") {
    throw new Error("You must pass an array");
  }

  var extraChars = charArray.length - trueLength;
  for (var i = charArray.length - 1, o = extraChars; i >= 0; i--) {
    var characterToCopy = charArray[i - o];
    if (characterToCopy === " ") {
      charArray[i] = "0";
      charArray[i-1] = "2";
      charArray[i-2] = "%";
      i -= 2;
      o -= 2;
    } else {
      charArray[i] = characterToCopy;
    }
  }

  return charArray.join("");
};

var s = "Mr John Smith    ";
u.assert(urlify2("Mr John Smith    ".split(""), 13), "Mr%20John%20Smith");

// To improve
// OK for JS, but missed the fact that when a space gets replaced, its position in the array gets filled with three characters, not one
// Think about the actual data given by the problem (array of chars, NOT a string). When I did the array version (urlify2), I needed the hint to go backwards and the hint to calculate the number of spaces in the "real" string.
// Think about whether to do the algo in place or into a new structure.  I didn't cotton onto the fact that in place is important.
// Really LOOK at the data.  Didn't notice the extra spaces that a) were a hint about in place and b) were a hint about the shifting
// Think about whether to walk something in reverse.  Might be required to copy data from one part of a structure to another
// Working out the transposition stuff was slow for me.  How do people do this more adeptly? Practice as transposition? Diagramming it?
// When the code wasn't working, not sure I thought it through enough. Might be worth just stopping and thinking through the code, but is this just to practice whiteboarding or is my feedback loop for normal dev too bang-my-head-against-errors?


  // "Mr John Smith    " i=0 o=4
  // "" i=16 o=4
  // "                h" i=16 o=4
  // "               th" i=15 o=4
  // "              ith" i=14 o=4
  // "             mith" i=13 o=4
  // "            Smith" i=12 o=4
  // "         %20Smith" i=9 o=2
  // "        n%20Smith" i=8 o=2
  // "       hn%20Smith" i=7 o=2
  // "      ohn%20Smith" i=6 o=2
  // "     John%20Smith" i=5 o=2
  // "  %20John%20Smith" i=2 o=0


// TIL
// Can do "".replace("a", "b");
// To check for array type, use Object.prototype.toString.call(arr) === "[object Array]" - works even for null and undefined

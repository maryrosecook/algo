// Implement an algorithm to determine if a string has all unique
// characters. What if you cannot use additional data structures?

// What are the datatypes? Single string.
// How much data? Assume a string of 100,000 characters
// Can I use additional data structures? Initially yes, then no.
// Can I assume a string of less than a certain length? Yes less than 100,000
// Can I assume this is representatve: "anuehconuhcuho"

var u = require("./util");

// Time complexity: O(1)
// Space complexity: not sure (added question to my list)
// Lots of data: hash access gets slower and slower (assuming hash
// doesn't grow)
// Trade-offs: Could memoize this to make repeated answers faster
// Using up memory
function hasUniqueCharacters(str) {
  if (typeof str !== "string") {
    throw new Error("You must pass a string");
  }

  var charsSeen = {};
  for (var i = 0; i < str.length; i++) { // up to O(n)
    if (str[i] in charsSeen) { // lookup O(1)
      return false; // early exit
    }

    charsSeen[str[i]] = true; // set O(1)
  }

  return true; // return O(1)
};

u.assert(hasUniqueCharacters("abc"), true);
u.assert(hasUniqueCharacters("abb"), false);
u.assert(hasUniqueCharacters(""), true);
u.assert(hasUniqueCharacters("bab"), false);
u.assertThrows("You must pass a string", function() {
  hasUniqueCharacters();
});
u.assertThrows("You must pass a string", function() {
  hasUniqueCharacters(1);
});

// Time complexity: n(n-1)/2 === O(n^2)
// Space complexity: O(1)
// Trade-offs: traded time for space
// Lots of data: time grows exponentially, but space doesn't grow
function hasUniqueCharactersNoHash(str) {
  if (typeof str !== "string") {
    throw new Error("You must pass a string");
  }

  for (var i = 0; i < str.length; i++) { // n
    if (str.slice(i + 1).indexOf(str[i]) !== -1) { // n - i; best: 0, worst: i
      return false;
    }
  }

  return true;
};

u.assert(hasUniqueCharactersNoHash("abc"), true);
u.assert(hasUniqueCharactersNoHash("abb"), false);
u.assert(hasUniqueCharactersNoHash(""), true);
u.assert(hasUniqueCharactersNoHash("bab"), false);
u.assertThrows("You must pass a string", function() {
  hasUniqueCharactersNoHash();
});
u.assertThrows("You must pass a string", function() {
  hasUniqueCharactersNoHash(1);
});

// Things I could have done better:
// I could have made things faster by constraining the problem (to ascii)
// I went straight to a hash table, when I could have used an array that stored entries for each character integer if the character set was limited (eg ascii). This would have reduced the space complexity
// Think about conditions that would mean I instantly know the test will fail (eg if using array and string is bigger than code space can abort
// Think if sorting is appropriate (pre-sort string then search for adjacent characters)

// Assumptions: only using ASCII, an array w/ up to 128 boolean entries takes up less space than an object
// Time complexity: O(n), or could argue O(1) since it's max 128 iterations.
// Space complexity: O(1) because space doesn't grow with input
// Lots of data: never checks strings longer than 128 - fine
// Tradeoffs: More space for faster time
function hasUniqueCharactersArray(str) {
  if (typeof str !== "string") {
    throw new Error("You must pass a string");
  }

  if (str.length > 128) {
    return false;
  }

  var seenCharacters = [];
  for (var i = 0; i < str.length; i++) { // n
    var charCode = str[i].charCodeAt(0);
    if (seenCharacters[charCode] === true) {
      return false;
    }

    seenCharacters[charCode] = true;
  }

  return true;
};

u.assert(hasUniqueCharactersArray("abc"), true);
u.assert(hasUniqueCharactersArray("abb"), false);
u.assert(hasUniqueCharactersArray(""), true);
u.assert(hasUniqueCharactersArray("bab"), false);
u.assertThrows("You must pass a string", function() {
  hasUniqueCharactersArray();
});
u.assertThrows("You must pass a string", function() {
  hasUniqueCharactersArray(1);
});

// Time complexity: O(n) or O(1) if argue not getting past 26 iterations
// Space complexity: O(1) (32 bit int)
// Tradeoffs: small char set for tiny space
// Lots of data: fine because size doesn't grow and time doesn't grow past 26 char input
function hasUniqueCharactersBit(str) {
  if (typeof str !== "string") {
    throw new Error("You must pass a string");
  }

  if (str.length > 26) {
    return false;
  }

  var seenCharacters = 0;
  for (var i = 0; i < str.length; i++) {
    var id = str.charCodeAt(i) - "a".charCodeAt(0);
    if (((1 << id) & seenCharacters) > 0) {
      return false;
    }

    seenCharacters |= (1 << id);
  }

  return true;
};


u.assert(hasUniqueCharactersArray("abcdefghijklmnopqrstuvwxyz"), true);
u.assert(hasUniqueCharactersArray("abb"), false);
u.assert(hasUniqueCharactersArray(""), true);
u.assert(hasUniqueCharactersArray("bab"), false);
u.assertThrows("You must pass a string", function() {
  hasUniqueCharactersArray();
});
u.assertThrows("You must pass a string", function() {
  hasUniqueCharactersArray(1);
});

function hasUniqueCharactersSort(str) {
  if (typeof str !== "string") {
    throw new Error("You must pass a string");
  }

  str = str.split("").sort();
  var previousCharacter;
  for (var i = 0; i < str.length; i++) {
    if (previousCharacter === str[i]) {
      return false;
    }

    previousCharacter = str[i];
  }

  return true;
};

u.assert(hasUniqueCharactersSort("abcdefghijklmnopqrstuvwxyz"), true);
u.assert(hasUniqueCharactersSort("baa"), false);
u.assert(hasUniqueCharactersSort(""), true);
u.assert(hasUniqueCharactersSort("bab"), false);
u.assertThrows("You must pass a string", function() {
  hasUniqueCharactersSort();
});
u.assertThrows("You must pass a string", function() {
  hasUniqueCharactersSort(1);
});

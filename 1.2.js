// Given two strings, write a method to decide if one is a permutation of the other

// What are the datatypes? Two strings. Character set? unicode. Return boolean. Max length? No.
// How much data? Infinite length strings.
// Can I assume I have a sorting algo? Yes, then no

var u = require("./util");

// Time complexity: n1(log n1) + n2(log n2) + n === O(n(log n))
// Space complexity: log n1 + log n2 === O(log n)
// Tradeoffs: more time for less space than for hash (I think)
function checkPermutationsSort(str1, str2) {
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    throw new Error("Please pass two strings");
  }

  if (str1.length !== str2.length) {
    return false;
  }

  str1 = str1.split("").sort();
  str2 = str2.split("").sort();

  for (var i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      return false;
    }
  }

  return true;
};

u.assertThrows("Please pass two strings", function() {
  checkPermutationsSort();
});
u.assertThrows("Please pass two strings", function() {
  checkPermutationsSort(1);
});
u.assertThrows("Please pass two strings", function() {
  checkPermutationsSort("");
});
u.assertThrows("Please pass two strings", function() {
  checkPermutationsSort("", 1);
});
u.assert(checkPermutationsSort("", ""), true);
u.assert(checkPermutationsSort("abc", "cab"), true);
u.assert(checkPermutationsSort("abc", "cabd"), false);
u.assert(checkPermutationsSort("abc", "cbaa"), false);
u.assert(checkPermutationsSort("abc", "caa"), false);

// Time complexity: n1 + n2 + n1 === O(n)
// Space complexity: max(n1, n2) === O(n)
// Trade-offs: used more space to decrease time
function checkPermutationsHash(str1, str2) {
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    throw new Error("Please pass two strings");
  }

  var str1Characters = {};
  for (var i = 0; i < str1.length; i++) {
    str1Characters[str1[i]] = str1Characters[str1[i]] || 0;
    str1Characters[str1[i]]++;
  }

  for (var i = 0; i < str2.length; i++) {
    var character = str2[i];
    if (!(character in str1Characters) || str1Characters[character] === 0) {
      return false;
    } else {
      str1Characters[character]--;
    }
  }

  for (var i = 0; i < str1.length; i++) {
    var character = str1[i];
    if (str1Characters[character] !== 0) {
      return false;
    }
  }

  return true;
};

u.assert(checkPermutationsHash("", ""), true);
u.assert(checkPermutationsHash("abc", "cab"), true);
u.assert(checkPermutationsHash("abc", "cabd"), false);
u.assert(checkPermutationsHash("abc", "cbaa"), false);
u.assert(checkPermutationsHash("abc", "caa"), false);

// corrected based on solution
function checkPermutationsHash2(str1, str2) {
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    throw new Error("Please pass two strings");
  }

  if (str1.length !== str2.length) {
    return false;
  }

  var str1Characters = {};
  for (var i = 0; i < str1.length; i++) {
    str1Characters[str1[i]] = str1Characters[str1[i]] || 0;
    str1Characters[str1[i]]++;
  }

  for (var i = 0; i < str2.length; i++) {
    var character = str2[i];
    if (!(character in str1Characters) || str1Characters[character] === 0) {
      return false;
    } else {
      str1Characters[character]--;
    }
  }

  return true;
};

u.assert(checkPermutationsHash2("", ""), true);
u.assert(checkPermutationsHash2("abc", "cab"), true);
u.assert(checkPermutationsHash2("abc", "cabd"), false);
u.assert(checkPermutationsHash2("abc", "cbaa"), false);
u.assert(checkPermutationsHash2("abc", "caa"), false);

// What I could have done better
// Think about if I can use the data structures I know (didn't realise I could use a hash map until the "there is an O(n) time complexity solution").
// If you control string encoding you can ask about limited character sets to reduce memory size for something like the hash
// If strings are involved, think about whether case matters.
// If strings are involved, think about whether whitespace matters.
// In checkPermutationsHash you can avoid the third walk by returning false if the strings are different lengths

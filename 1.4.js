// Given a string, write a function to check if it is a permutation of a palindrome. A palindrome is a word or phrase that is the same forwards as backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.
// Input: Tact Coa
// Output: True (perms: "taco cat", "atco cta" etc.)

// What data: a string (let's not worry about encoding for now), with upper and lowercase ascii letters, plus spaces
// Assumptions: the spaces have to stay in the same place, but aren't included in the palindrome; there could be any number of spaces; an empty string returns true; case is ignored.
// How much data: less than 1000 characters.

// spaces approach: ignore until we have the palindrome, when we can walk the original string and put in spaces where they occur

// approach 1: build hash table of characters and frequencies,

// we don't have to build it so don't worry about reconstructing and just ignore the spaces

// what about just walking the string, bucketing chars with counts into a hash table, then check that each entry has an even count, with at most 1 with 1

var u = require("./util");

// Time: 3n === O(n)
// Space: O(c) or O(1)
// Tradeoffs: Use more space for easier implementation
function palindromePermutation(str) {
  if (typeof str !== "string") {
    throw new Error("You must pass a string");
  }

  str = str.toLowerCase(); // t: n

  var characterCounts = {};

  for (var i = 0; i < str.length; i++) { // t: n
    var character = str[i];
    if (character !== " ") {
      characterCounts[character] = characterCounts[character] || 0;
      characterCounts[character]++;
    }
  }

  var extraCharacter = false;
  var characters = Object.keys(characterCounts); // t: n
  for (var i = 0; i < characters.length; i++) { // t: n
    var character = characters[i];
    if (characterCounts[character] % 2 !== 0) {
      if (extraCharacter === false) {
        extraCharacter = true;
      } else {
        return false;
      }
    }
  }

  return true;
};

u.assert(palindromePermutation("Tact Coa"), true);
u.assert(palindromePermutation("abcd efg"), false);
u.assert(palindromePermutation("cdadq adc"), false);
u.assert(palindromePermutation("cdaqqq adc"), true);

// Assumption: only A-Z and a-z
function palindromePermutationBit(str) {
  if (typeof str !== "string") {
    throw new Error("You must pass a string");
  }

  str = str.toLowerCase(); // t: n

  var characterCounts = 0;
  for (var i = 0; i < str.length; i++) {
    var character = str[i];
    if (character !== " ") {
      var id = character.charCodeAt(0) - "a".charCodeAt(0);
      characterCounts ^= (1 << id);
    }
  }

  return characterCounts === 0 || ((characterCounts - 1) & characterCounts) === 0;
};

u.assert(palindromePermutationBit("Tact Coa"), true);
u.assert(palindromePermutationBit("abcd efg"), false);
u.assert(palindromePermutationBit("cdadq adc"), false);
u.assert(palindromePermutationBit("cdaqqq adc"), true);

// Things to improve
// Think about what I DON'T have to do and whether that helps makes things easier or guides the way.  In this problem, initially I worked vaguely like I had to return a palindrome (because I was thinking about building one).
// Maybe try writing down the things I do and don't have to do to help with above.
// Walking through code is hard to do carefully.  Maybe try relating each var to its source. (Missed the fact that character in characterCounts[characterCount] % 2 was not being assign inside the second loop.
// Each time I check through code and miss something, write it down and come up with a new fix policy
// Think: can I use a bit vector when something involves a string and you want to use a hash table and it's ok to limit the character set
// Watch out: sometimes when I read through code I miss what a var is - eg reading "character" and thinking "characterCounts" in last line of code above. How about saying out loud what each variable is.

// TIL:
// arr.length is O(1)
// Object.keys is O(n) in V8
// toLowerCase: couldn't find time complexity so assuming it's O(n)
// If you do n & (n-1) where n as a binary number has one 1 bit and the rest zeroes, you get 0, otherwise you get more than 0

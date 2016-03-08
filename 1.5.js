// There are three types of edit that can be performed on strings: insert a character, remove a character or replace a character.  Given two strings, write a function to check if they are one edit (or zero edits) away.
// pale, ple -> true
// pales, pale -> true
// pale, bale -> true
// pale, bake -> false

var u = require("./util");

// What data: two strings
// Lots of data: if have linear solution, as long as can hold strings in memory, be ok
// Assume all lowercase a-z,
// Don't have to: keep checking once got more than 1 edit
// Similar: seems similar to checking if two strings are identical char by char

// Hash map: won't keep order

// ways to solve difference:
// insert (move forward in this string, stay still in changed string) pale, ple
// delete (stay still in this string, move forward in changed string) ple, pale
// replace (move forward in both strings)

// can you tell which one to do? pale ple
// pa
// pa

//pale
//ple

//pl

//pale
//pale

// pale
// ple
// 0,0,f | 1,1,f -> 2,1,t | 3,2,t

// pales
// pale
// 0,0,f || 4,4,f || 5,4,t

// pale
// bale

// pale
// ppal
// 0,0,f | 1,1,f > 1,2,t | 2,3,t | 3,4,t

// Time: O(n)
// Space: O(1)
// Tradeoffs: none.
function oneAway(strA, strB) {
  var edits = 0;
  for (var a = 0, b = 0; a < strA.length || b < strB.length; a++, b++) {
    if (strA[a] !== strB[b]) {
      if (edits === 0) {
        if (strA[a] === strB[b + 1]) { // insertion
          a--;
          edits++;
        } else if (strA[a + 1] === strB[b]) { // deletion
          a++;
          edits++;
        } else { // replacement
          edits++;
        }
      } else {
        return false;
      }
    }
  }

  return true;
};

u.assert(oneAway("pale", "pale") === true);
u.assert(oneAway("pale", "ple") === true);
u.assert(oneAway("ple", "pale") === true);
u.assert(oneAway("pales", "pale") === true);
u.assert(oneAway("pale", "bale") === true);
u.assert(oneAway("pale", "bake") === false);
u.assert(oneAway("pale", "ppal") === false);
u.assert(oneAway("pa", "pale") === false);

function oneReplacementAway(s1, s2) {
  var edited = false;
  for (var i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      if (!edited) {
        edited = true;
      } else {
        return false;
      }
    }
  }

  return true;
};

function oneInsertionAway(s1, s2) { // ple, pale
  var i1 = 0;
  var i2 = 0;
  while (i1 < s1.length) {
    if (s1[i1] !== s2[i2]) {
      if (i1 === i2) {
        i2++;
      } else {
        return false;
      }
    }

    i1++;
    i2++;
  }

  return true;
};

// pile
// pale
// 0,f | 1,f -> 1,t | 2,t | 3,t

// ple
// pale

// pale
// ple

// pale
// qqpal

function oneAwayC(s1, s2) {
  if (s1.length === s2.length) {
    return oneReplacementAway(s1, s2);
  } else if (s1.length + 1 === s2.length) {
    return oneInsertionAway(s1, s2);
  } else if (s1.length === s2.length + 1) {
    return oneInsertionAway(s2, s1);
  } else {
    return false;
  }
};

u.assert(oneAwayC("ple", "pale") === true);
u.assert(oneAwayC("pales", "pale") === true);
u.assert(oneAwayC("pale", "bale") === true);
u.assert(oneAwayC("pale", "bake") === false);
u.assert(oneAwayC("pale", "ppal") === false);
u.assert(oneAwayC("pa", "pale") === false);
u.assert(oneAwayC("pale", "qqpal") === false);

// What went wrong
// Is it possible that having to step thorough a horrid keeplotsofthingsinmind is a sign I'm thinking about it wrong? I really struggled to figure out if it was possible to make the wrong operation choice to fix a problem that would then break the rest of the string eg should you look ahead to see if the next character is the right one and then do an insert to fix and got bogged down in trying to come up with examples to prove it was impossible.
// This one took me a very long time.  I eventually came up with a workable solution and forced myself to walk through all the test cases in my head.  I'm not sure if this helped because by that point the code was right. Seems worthwhile to try more to do this, just because it will catch some mistakes, though I'm still worried about it seeming like I don't use my editor, and also seeming slow because it's so painful to keep testing code by hand.
// The solution made a choice along the lines I was thinking: if string lens equal check for replace, if one shorter, check if can insert into it, if other shorter check if can insert into it instead. I got worried that an insert+delete would not get caught by replace.
// Again, maybe steer away from complexity. Part of this might be getting stuff out of my head by a) learning problem solving tools (eg two pointers for walking a LL), b) learning debugging techniques. I went down a tricky road when I made the same loop handle all cases because I started having to worry about what the next char was to distinguish between inserts and deletes. I also got worried about choosing the wrong replacement and getting the string into a worse state whereas if I'd chosen the right replacement I'd only have needed to make one change.
// Write helper functions to make code cleaner and reduce mental load.
// When I wrote my own version of the CTCI solution, I missed out the normal increments in the while loop.  I ran test cases in my head, but incremented the indices without referencing the code.
// Caught several errors by running test cases in my head againt the CTCI solution code I wrote after reading the prose

// Write a function that takes an array of numbers and returns the greatest difference you can get by subtracting any two of those numbers.

// For example, if our input is [5,8,6,1], the greatest difference we can get is 8-1, which is 7. So we should return 7.

// bad: compare each number to each other number

// 5,5 | | 5,8 | 5,6 | 5,1
// 8,5, | 8,8 | 8,6 | 8,1
// problems: comparing with self, comparing in both directions

var u = require("./util");

function isNumber(n) {
  return typeof n === "number";
};

// Time: n * n === O(n^2)
// Space: O(1)
// Tradeoffs: simpler code, slower
function greatestDifference(arr) {
  if (Object.prototype.toString.call(arr) !== "[object Array]") {
    throw new Error("Please pass an array");
  }

  for (var i = 0; i < arr.length; i++) {
    if (!isNumber(arr[i])) {
      throw new Error("Please make sure all array elements are numbers");
    }
  }

  var greatest;
  for (var i = 0; i < arr.length; i++) { // n
    for (var j = 0; j < arr.length; j++) { // n
      var difference = arr[i] - arr[j];
      if (greatest === undefined || difference > greatest) {
        greatest = difference;
      }
    }
  }

  return greatest;
};

u.assertThrows("Please pass an array", function() {
  greatestDifference();
});
u.assertThrows("Please make sure all array elements are numbers", function() {
  greatestDifference([1, "a"]);
});
u.assert(greatestDifference([5, 8, 6, 1]), 7);
u.assert(greatestDifference([6]), 0);
u.assert(greatestDifference([]), undefined);

// 5,8 5,6, 5,1
// 8,6, 8,1
// 6,1

// Time: O(n(n-1)/2)
// Space: O(1)
// Tradeoffs: more complex code, slightly faster
function greatestDifferenceBitBetter(arr) {
  if (Object.prototype.toString.call(arr) !== "[object Array]") {
    throw new Error("Please pass an array");
  }

  for (var i = 0; i < arr.length; i++) {
    if (!isNumber(arr[i])) {
      throw new Error("Please make sure all array elements are numbers");
    }
  }

  var greatest;
  for (var i = 0; i < arr.length; i++) {
    for (var j = i; j < arr.length; j++) {
      var difference = Math.max(arr[i], arr[j]) - Math.min(arr[i], arr[j]);
      if (greatest === undefined || difference > greatest) {
        greatest = difference;
      }
    }
  }

  return greatest;
};

u.assertThrows("Please pass an array", function() {
  greatestDifferenceBitBetter();
});
u.assertThrows("Please make sure all array elements are numbers", function() {
  greatestDifferenceBitBetter([1, "a"]);
});
u.assert(greatestDifferenceBitBetter([5, 8, 6, 1]), 7);
u.assert(greatestDifferenceBitBetter([5, 1, 6, 8]), 7);
u.assert(greatestDifferenceBitBetter([6]), 0);
u.assert(greatestDifferenceBitBetter([]), undefined);

// Time: O(n(log n))
// Space: O(1)
// Tradeoffs: simpler code, faster
function greatestDifferenceSort(arr) {
  if (Object.prototype.toString.call(arr) !== "[object Array]") {
    throw new Error("Please pass an array");
  }

  for (var i = 0; i < arr.length; i++) { // n
    if (!isNumber(arr[i])) {
      throw new Error("Please make sure all array elements are numbers");
    }
  }

  if (arr.length > 0) {
    arr = arr.sort(); // n(log n)
    return arr[arr.length - 1] - arr[0];
  }
};

u.assertThrows("Please pass an array", function() {
  greatestDifferenceSort();
});
u.assertThrows("Please make sure all array elements are numbers", function() {
  greatestDifferenceSort([1, "a"]);
});
u.assert(greatestDifferenceSort([5, 8, 6, 1]), 7);
u.assert(greatestDifferenceSort([5, 1, 6, 8]), 7);
u.assert(greatestDifferenceSort([6]), 0);
u.assert(greatestDifferenceSort([]), undefined);

// Time: n + n === O(n)
// Space: O(1)
// Tradeoffs: slightly more complex code
function greatestDifferenceGather(arr) {
  if (Object.prototype.toString.call(arr) !== "[object Array]") {
    throw new Error("Please pass an array");
  }

  for (var i = 0; i < arr.length; i++) { // n
    if (!isNumber(arr[i])) {
      throw new Error("Please make sure all array elements are numbers");
    }
  }

  if (arr.length > 0) {
    var min;
    var max;
    for (var i = 0; i < arr.length; i++) { // n
      if (min === undefined || arr[i] < min) {
        min = arr[i];
      }

      if (max === undefined || arr[i] > max) {
        max = arr[i];
      }
    }

    return max - min;
  }
};

u.assertThrows("Please pass an array", function() {
  greatestDifferenceGather();
});
u.assertThrows("Please make sure all array elements are numbers", function() {
  greatestDifferenceGather([1, "a"]);
});
u.assert(greatestDifferenceGather([5, 8, 6, 1]), 7);
u.assert(greatestDifferenceGather([5, 1, 6, 8]), 7);
u.assert(greatestDifferenceGather([6]), 0);
u.assert(greatestDifferenceGather([]), undefined);


// Improve
// Try solving some examples by hand and look for patterns. Got this problem from http://blog.teamtreehouse.com/passing-google-interview-without-computer-science-degree and this is one technique he suggests.
// Try stimulating the brain by thinking of one step down in time (or space) complexity and seeing if any brainwaves occur. It was only when I thought about whether there was a linear solution (after realising the second solution in the article was my third solution and assuming that the next jump was from n(log n) to n)
// Think through input extreme edge cases: 0 items, 1 item, 2 items, many items. This would have meant I noticed earlier than an array of 1 item was valid.  My first and third solutions worked with 1 item by luck, my second was broken.

// Questions
// I decided that the second algo was O(n(n-1)/2) because it had a similar structure to 1.1.js - take an element and compare to all elements to the right.  How can I derive this without proving it by induction?

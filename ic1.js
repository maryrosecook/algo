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
u.assert(greatestDifference([5, 8, 6, 1]) === 7);

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
    for (var j = i + 1; j < arr.length; j++) {
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
u.assert(greatestDifferenceBitBetter([5, 8, 6, 1]) === 7);
u.assert(greatestDifferenceBitBetter([5, 1, 6, 8]) === 7);

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

  arr = arr.sort(); // n(log n)
  if (arr.length > 1) {
    return arr[arr.length - 1] - arr[0];
  }
};

u.assertThrows("Please pass an array", function() {
  greatestDifferenceSort();
});
u.assertThrows("Please make sure all array elements are numbers", function() {
  greatestDifferenceSort([1, "a"]);
});
u.assert(greatestDifferenceSort([5, 8, 6, 1]) === 7);
u.assert(greatestDifferenceSort([5, 1, 6, 8]) === 7);

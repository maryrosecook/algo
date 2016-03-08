function assert(assertion) {
  if (assertion !== true) {
    throw new Error("Assertion failed");
  }
};

function assertThrows(message, fn) {
  try {
    fn()
    throw new Error("Expected exception with message: " + message);
  } catch (e) {
    if (e.message !== message) {
      throw new Error("Expected exception with message: " + message);
    }
  }
};

exports.assert = assert;
exports.assertThrows = assertThrows;

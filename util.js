function assert(val1, val2) {
  if (val1 !== val2) {
    throw new Error("Got " + val1 + " and expected " + val2);
  }
};

function assertThrows(message, fn) {
  try {
    fn()
    throw new Error("Expected exception with message: " + message);
  } catch (e) {
    if (e.message !== message) {
      throw new Error("Expected exception with message: " +
                      message +
                      ", but got exception with message: " +
                      e.message);
    }
  }
};

exports.assert = assert;
exports.assertThrows = assertThrows;

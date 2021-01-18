function formToJSON(elem) {
  let output = {};
  new FormData(elem).forEach((value, key) => {
    // Check if property already exist
    if (Object.prototype.hasOwnProperty.call(output, key)) {
      let current = output[key];
      if (!Array.isArray(current)) {
        // If it's not an array, convert it to an array.
        current = output[key] = [current];
      }
      current.push(value); // Add the new value to the array.
    } else {
      output[key] = value;
    }
  });
  return output;
}

export default formToJSON;

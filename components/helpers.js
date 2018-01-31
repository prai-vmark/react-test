const Helpers = {
  bigNumMultiply: (num, quantity) => {
    let parts = num.split(".");
    if (parts.length === 1) {
      return parseInt(num, 10) * quantity;
    }

    const divider = Math.pow(10, parts[1].length);
    let partAm = parseInt(parts[0], 10) * quantity;
    const partBm = parseInt(parts[1], 10) * quantity / divider;
    parts = partBm.toString().split(".");
    partAm += parseInt(parts[0], 10);

    const ans =
      parts.length === 2 ? `${partAm}.${parts[1]}` : partAm.toString();
    return ans;
  }
};

export default Helpers;

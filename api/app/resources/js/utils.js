exports.isNumber = (val) => {
    return /^\d*(\.\d+)?$/.test(val);
}
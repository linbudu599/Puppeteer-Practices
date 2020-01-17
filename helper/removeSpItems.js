function removeSpItems(arr, idxArr = []) {
  const len = idxArr.length;

  if (!Array.isArray(idxArr) || len === 0) {
    throw new Error("IdxArr Must Be An Array With At Least A Member!");
  }
  if (len === 1) {
    arr.splice(idxArr[0], 1);
    return arr;
  } else {
    let newIdx = idxArr.map((val, idx) => {
      return val - idx;
    });

    newIdx.forEach(idx => {
      arr.splice(idx, 1);
    });
    return arr;
  }
}
module.exports = removeSpItems;

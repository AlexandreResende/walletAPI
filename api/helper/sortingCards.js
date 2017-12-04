module.exports = (arrayOfCards) => {
  let orderedArray;

  orderedArray = arrayOfCards.sort( (firstValue, secondValue) => {
    if (firstValue.duedate > secondValue.duedate){
      return firstValue.duedate - secondValue.duedate;
    } else if (firstValue.duedate == secondValue.duedate) {
      if (firstValue.limit < secondValue.limit) {
        return firstValue.limit - secondValue.limit;
      } else {
        return secondValue.limit - firstValue.limit;
      }
    } else {
      return secondValue.duedate - firstValue.duedate;
    }
  });
  return orderedArray;
}

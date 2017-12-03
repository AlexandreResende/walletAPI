module.exports = (arrayOfCards) => {
  let orderedArray;

  orderedArray = arrayOfCards.sort( (firstValue, secondValue) => {
    if (firstValue.dueDate > secondValue.dueDate){
      return firstValue.dueDate - secondValue.dueDate;
    } else if (firstValue.dueDate == secondValue.dueDate) {
      if (firstValue.limit < secondValue.limit) {
        return firstValue.limit - secondValue.limit;
      } else {
        return secondValue.limit - firstValue.limit;
      }
    } else {
      return secondValue.dueDate - firstValue.dueDate;
    }
  });
  return orderedArray;
}


const sortingCards = require('./sortingCards');

module.exports = (arrayOfCards) => {
  const day = (new Date()).getDate();
  const before = [], after = [];

  for (let ans = 0; ans < arrayOfCards.length; ans++){
    if (arrayOfCards[ans].dueDate < day){
      before.push(arrayOfCards[ans]);
    } else {
      after.push(arrayOfCards[ans]);
    }
  }

  before = sortingCards(before);
  after = sortingCards(after);

  return before.concat(after);
};

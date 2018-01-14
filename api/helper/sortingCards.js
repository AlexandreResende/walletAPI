
const paymentRule = require('./paymentRule');

const sortingCards = (arrayOfCards, date) => {
  const beforeDate = paymentRule(arrayOfCards.filter(el => el.duedate <= date));
  const afterDate = paymentRule(arrayOfCards.filter(el => el.duedate > date));

  return beforeDate.concat(afterDate);
}

module.exports = sortingCards;

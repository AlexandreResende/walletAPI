
const paymentRule = (arrayOfCards) => {
  return arrayOfCards.sort((firstCard, secondCard) => {
    if (firstCard.duedate > secondCard.duedate) {
      return -1;
    } else if (firstCard.duedate < secondCard.duedate) {
      return 1;
    }
    const firstCardAvailableLimit = firstCard.limit - firstCard.purchased;
    const secondCardAvailableLimit = secondCard.limit - secondCard.purchased;
    if (firstCardAvailableLimit <= secondCardAvailableLimit) {
      return -1;
    }
    return 1;
  });
};

module.exports = paymentRule;

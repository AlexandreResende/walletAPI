

/*
For example, a card has to be paid on every day 03 of the month and
another on every day 15. An important detail is that you can pay the card
before the due date to release more credit.

You'd rather use the card that's farther in the month to pay because you'll
have more time to get rid of its bill.

If both cards expire on the same day, you would prefer to use the one that
has the smallest limit to continue having the card with the highest limit.
Remember that every purchase is made just on one card.
Only in cases where it is not possible to purchase on a single card, the
system must divide the purchase into more cards.
That is, you spend first on the card
that has the farthest due date and "complete" it with the card whose the
due date is the next shorter one.
If the cards expire on the same day, you pay first with the one of lowest
limit and "complete" with the next one which has more limit.
*/

const sortingCards = require('./sortingCards');

module.exports = (arrayOfCards) => {
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

module.exports = sortingCards;

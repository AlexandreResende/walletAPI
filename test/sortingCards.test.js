
const { expect } = require('chai');

const sortingCards = require('../api/helper/sortingCards');

describe('sortingCards methods', () => {
  let date;
  let arrayOfCards;
  let sortedArray;

  beforeEach((done) => {
    arrayOfCards = [
      {
        duedate: 10,
        limit: 3000,
        purchased: 0,
      },
      {
        duedate: 5,
        limit: 3000,
        purchased: 0,
      },
      {
        duedate: 11,
        limit: 3000,
        purchased: 0,
      },
      {
        duedate: 25,
        limit: 3000,
        purchased: 0,
      },
    ];
    date = 9;
    sortedArray = sortingCards(arrayOfCards, date);
    done();
  });

  it('should have card with duedate 5 on first position', (done) => {
    expect(sortedArray[0].duedate).to.be.equal(5);
    done();
  });

  it('should have card with duedate 25 on second position', (done) => {
    expect(sortedArray[1].duedate).to.be.equal(25);
    done();
  });

  it('should have card with duedate 11 on third position', (done) => {
    expect(sortedArray[2].duedate).to.be.equal(11);
    done();
  });

  it('should have card with duedate 10 on fourth position', (done) => {
    expect(sortedArray[3].duedate).to.be.equal(10);
    done();
  });

});
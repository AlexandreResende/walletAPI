
const { expect } = require('chai');

const paymentRule = require('../api/helper/paymentRule');

describe('paymentRule helper function', () => {
  
  let arrayOfCards;

  beforeEach((done) => {
    arrayOfCards = [
      {
        duedate: 25,
        limit: 8000,
        purchased: 0,
      },
      {
        duedate: 5,
        limit: 5000,
        purchased: 0,
      },
      {
        duedate: 10,
        limit: 5000,
        purchased: 0,
      },
      {
        duedate: 10,
        limit: 5000,
        purchased: 0,
      },
      {
        duedate: 10,
        limit: 1000,
        purchased: 0,
      },
      {
        duedate: 15,
        limit: 1000,
        purchased: 0,
      },
    ];
    done();
  });

  it('should have duedate 25 card in the first position', (done) => {
    const arrayOfCardsSorted = paymentRule(arrayOfCards);
    expect(arrayOfCardsSorted[0].duedate).to.be.equal(25);
    done();
  });

  it('should have duedate 15 card in the second position', (done) => {
    const arrayOfCardsSorted = paymentRule(arrayOfCards);
    expect(arrayOfCardsSorted[1].duedate).to.be.equal(15);
    done();
  });

  it('should have duedate 10 card in the third position', (done) => {
    const arrayOfCardsSorted = paymentRule(arrayOfCards);
    expect(arrayOfCardsSorted[2].duedate).to.be.equal(10);
    done();
  });

  it('should have duedate 10 card in the fourth position', (done) => {
    const arrayOfCardsSorted = paymentRule(arrayOfCards);
    expect(arrayOfCardsSorted[3].duedate).to.be.equal(10);
    done();
  });

  it('should have duedate 10 card in the fifth position', (done) => {
    const arrayOfCardsSorted = paymentRule(arrayOfCards);
    expect(arrayOfCardsSorted[4].duedate).to.be.equal(10);
    done();
  });

  it('should have duedate 5 card in the sixth position', (done) => {
    const arrayOfCardsSorted = paymentRule(arrayOfCards);
    expect(arrayOfCardsSorted[5].duedate).to.be.equal(5);
    done();
  });
});
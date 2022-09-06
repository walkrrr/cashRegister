const LOOKUP = {
    PENNY: 1,
    NICKEL: 5,
    DIME: 10,
    QUARTER: 25,
    ONE: 100,
    FIVE: 500,
    TEN: 1000,
    TWENTY: 2000,
    "ONE HUNDRED": 10000
  }
  
  
  function checkCashRegister(price, cash, cid) {
    // store variable with amount of change due
    const changeDue = cash - price;
    let changeDueCents = changeDue * 100;
  
  // sum up all the cents in the cash drawer
  const available = cid.reduce((acc, billType) => {
    return acc + billType[1] * 100
  }, 0);
  
  
  
  // if the money in the cid is equal to the change due, return
  // {status: "CLOSED", change: cid}
  if (available === changeDueCents) {
    return {status: "CLOSED", change: cid};
  }
  
  
  const change = cid.reverse().map(([name, amount]) => {
  // loop while the change due is more than the value on the bill type, and the amount of money for that bill type is sufficient
  let total = 0;
  const nameValue = LOOKUP[name];
  let amountCents = amount * 100;
  while(nameValue <= changeDueCents && amountCents > 0) {
  // add one's bill's worth to the total
  total += nameValue;
  // subtract the nameValue from the total change due
  changeDueCents -= nameValue;
  // subtract that nameValue from how much money of that bill type is available
  amountCents -= nameValue;
    }
    return [name, total / 100];
    // filter out change compartments that are not bigger than zero
  }).filter(([, amount]) => amount > 0);
  console.log(change);
  
  const changeTotal = change.reduce((acc, [, amount]) => {
    return acc + amount;
  }, 0.00)
  
  
  if (changeTotal < changeDue) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
    }
  
    return {status: "OPEN", change: change};
  }
  
  console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
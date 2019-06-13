function allCoinChange(coins, amount) {
  if (amount == 0) {
    return 1;
  }
  if (amount < 0) {
    return 0;
  }

  let res = 0;
  coins.map(coin => {
    res += allCoinChange(coins, amount - coin);
  });
  return res;
}

console.log('It should return 4', allCoinChange([1,5], 7) === 4 ? 'PASS' : 'FAIL');
console.log('It should return 7', allCoinChange([1,2,3], 4) === 7 ? 'PASS' : 'FAIL');

function distinctCoinChange(coins, max, amount) {
  if (amount == 0) {
    return 1;
  }
  if (amount < 0 || max < 0) {
    return 0;
  }
  return distinctCoinChange(coins, max, amount - coins[max]) + distinctCoinChange(coins, max - 1, amount);
}

const coins = [1,5];
console.log('It should return 4', distinctCoinChange(coins, coins.length -1, 7) === 2 ? 'PASS' : 'FAIL');

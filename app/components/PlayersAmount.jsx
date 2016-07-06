import React from 'react';

const playersAmount = [2, 3, 4, 5, 6, 7, 8, 9];

export default () => {
  return <select>
    {playersAmount.map(amount => <option key={amount} value={amount}>{amount}</option>)}
  </select>
}

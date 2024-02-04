import React, { useState, useEffect } from 'react';

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      // Fetch data from the local server
      fetch('http://localhost:3000/transactions')
        .then(response => response.json())
        .then(data => setTransactions(data));
    }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th> 
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;

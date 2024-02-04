import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';



const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8001/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      const addedTransaction = await response.json();
      setTransactions([...transactions, addedTransaction]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Bank Transactions App</h1>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <SearchBar onSearchChange={handleSearchChange} />
      <TransactionTable transactions={filteredTransactions} />
     
    </div>
  );
};

export default App;

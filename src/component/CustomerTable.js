import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionChart from './TransactionChart';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/customers').then(response => {
      const customers = response.data.map(customer => ({
        ...customer,
        id: Number(customer.id)
      }));
      setCustomers(customers);
    });
    axios.get('http://localhost:3001/transactions').then(response => {
      const transactions = response.data.map(transaction => ({
        ...transaction,
        id: Number(transaction.id),
        customer_id: Number(transaction.customer_id),
        amount: Number(transaction.amount)
      }));
      setTransactions(transactions);
    });
  }, []);



  const filteredCustomers = customers.filter(customer => {
    const customerNameMatch = customer.name.toLowerCase().includes(filter.toLowerCase());
    const transactionAmountMatch = transactions
      .filter(t => t.customer_id === customer.id)
      .some(t => t.amount.toString().includes(filter));

    return customerNameMatch || transactionAmountMatch;
  });


  const handleCustomerClick = customer => {
    setSelectedCustomer(customer);
  };

  return (
    <div className='customer-table'>
      <div className='customer-table-div'>
      <input
        type="text"
        placeholder="Filter by customer name or transaction amount"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Transaction Amount</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.id} onClick={() => handleCustomerClick(customer)}>
              <td>{customer.name}</td>
              <td >
                {transactions
                  .filter(t => t.customer_id === customer.id)
                  .map((t) => {
                    return(
<div className='t'>
<span>
                      {t.amount}
                      </span>
</div>
                    
                 
                    )
                    
                   
                  })}
              </td>
              <td >
              {transactions
                  .filter(t => t.customer_id === customer.id)
                  .map((t) => {
                    return(
<div className='t'>
<span>
                      {t.date}
                      </span>
</div>
                    
                    
                    )
                    
                   
                  })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {selectedCustomer && (
        <TransactionChart
          transactions={transactions.filter(t => t.customer_id === selectedCustomer.id)}
        />
      )}
    </div>
  );
};

export default CustomerTable;

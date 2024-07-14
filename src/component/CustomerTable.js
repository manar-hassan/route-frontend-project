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
      setCustomers(response.data);
    });
    axios.get('http://localhost:3001/transactions').then(response => {
      setTransactions(response.data);
    });
  }, []);

  const isNumeric = (str) => {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  const filteredCustomers = customers.filter(customer => {
    const customerTransactions = transactions.filter(
      transaction => transaction.customer_id === customer.id
    );
    const totalAmount = customerTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    if (isNumeric(filter)) {
      return totalAmount >= parseFloat(filter);
    } else {
      return customer.name.toLowerCase().includes(filter.toLowerCase());
    }
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
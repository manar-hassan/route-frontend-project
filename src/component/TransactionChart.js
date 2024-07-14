import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TransactionChart = ({transactions}) => {
    const data = transactions.map(transaction => ({
        date: transaction.date,
        amount: transaction.amount
      }));
    
      return (
        <div style={{display:"flex" , justifyContent:"center"}}>
 <LineChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 7, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 9 }}  />
        </LineChart>
        </div>
        
     );
}

export default TransactionChart;

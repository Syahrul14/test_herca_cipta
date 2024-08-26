import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentsList = () => {
    const [payments, setPayments] = useState([]);
    const [sellingId, setSellingId] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = () => {
        axios.get('http://127.0.0.1:8000/api/payments')
            .then(response => setPayments(response.data))
            .catch(error => console.error('Error fetching payments:', error));
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();

        const newPayment = {
            selling_id: sellingId,
            amount: parseFloat(amount),
            payment_date: paymentDate,
        };

        axios.post('http://127.0.0.1:8000/api/payments', newPayment)
            .then(response => {
                alert('Payment added successfully');
                fetchPayments(); // Refresh the list of payments
                setSellingId('');
                setAmount('');
                setPaymentDate('');
            })
            .catch(error => console.error('Error adding payment:', error));
    };

    return (
        <div>
            <h1>Payments List</h1>
            <form onSubmit={handlePaymentSubmit} style={formStyle}>
              <div style={formGroupStyle}>
                  <label>Selling ID:</label>
                  <input
                      type="text"
                      value={sellingId}
                      onChange={(e) => setSellingId(e.target.value)}
                      required
                      style={inputStyle}
                  />
              </div>
              <div style={formGroupStyle}>
                  <label>Amount:</label>
                  <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      style={inputStyle}
                  />
              </div>
              <div style={formGroupStyle}>
                  <label>Payment Date:</label>
                  <input
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      required
                      style={inputStyle}
                  />
              </div>
              <button type="submit" style={buttonStyle}>Add Payment</button>
          </form>

          <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <thead>
                <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
                    <th style={{ border: '2px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Payment ID</th>
                    <th style={{ border: '2px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Selling ID</th>
                    <th style={{ border: '2px solid #ddd', padding: '10px', fontWeight: 'bold', textAlign: 'right' }}>Amount</th>
                    <th style={{ border: '2px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Payment Date</th>
                </tr>
            </thead>
            <tbody>
                {payments.map(payment => (
                    <tr key={payment.id} style={{ backgroundColor: payment.id % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                        <td style={{ border: '2px solid #ddd', padding: '10px' }}>{payment.id}</td>
                        <td style={{ border: '2px solid #ddd', padding: '10px' }}>{payment.selling_id}</td>
                        <td style={{ border: '2px solid #ddd', padding: '10px', textAlign: 'right' }}>{parseFloat(payment.amount).toLocaleString('id-ID')}</td>
                        <td style={{ border: '2px solid #ddd', padding: '10px' }}>{new Date(payment.payment_date).toLocaleDateString('id-ID')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

// Styles
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: 'auto',
  marginBottom: '20px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '5px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default PaymentsList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommissionList = () => {
    const [commissions, setCommissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/commission-per-marketing')
            .then(response => {
                setCommissions(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <div>
            <h1>Commission List</h1>
            <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <thead>
                  <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
                      <th style={{ border: '2px solid #ddd', padding: '10px', fontWeight: 'bold', textAlign: 'center' }}>Marketing</th>
                      <th style={{ border: '2px solid #ddd', padding: '10px', fontWeight: 'bold', textAlign: 'center' }}>Bulan</th>
                      <th style={{ border: '2px solid #ddd', padding: '10px', fontWeight: 'bold', textAlign: 'center' }}>Omzet</th>
                      <th style={{ border: '2px solid #ddd', padding: '10px', fontWeight: 'bold', textAlign: 'center' }}>Komisi %</th>
                      <th style={{ border: '2px solid #ddd', padding: '10px', fontWeight: 'bold', textAlign: 'center' }}>Komisi Nominal</th>
                  </tr>
              </thead>
              <tbody>
                  {commissions.map((item, index) => (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                          <td style={{ border: '2px solid #ddd', padding: '10px' }}>{item.name}</td>
                          <td style={{ border: '2px solid #ddd', padding: '10px' }}>{item.month}</td>
                          <td style={{ border: '2px solid #ddd', padding: '10px', textAlign: 'right' }}>{parseFloat(item.omzet / 100).toLocaleString('id-ID')}</td>
                          <td style={{ border: '2px solid #ddd', padding: '10px', textAlign: 'center' }}>{item.commission_percent}%</td>
                          <td style={{ border: '2px solid #ddd', padding: '10px', textAlign: 'right' }}>{parseFloat(item.commission_nominal).toLocaleString('id-ID')}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
    );
};

export default CommissionList;
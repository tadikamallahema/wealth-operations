import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Transactions() {
    const [transactions, setTransactions] = useState<any[]>([]);
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/transactions');
            setTransactions(response.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='dashboard-layout text-white'>
           <Layout>
            <div className='main-content'>
                <div style={{ padding: '20px' }}>
                    <h2>Transactions</h2>
                    {
                        transactions.map((transaction, index) => (
                            <div key={index} className='stat-card'>
                                <h3>{transaction.type}</h3>
                                <p>Amount: ₹{transaction.amount}</p>
                                <p>Status: {transaction.status}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            </Layout>
        </div>
    );
}
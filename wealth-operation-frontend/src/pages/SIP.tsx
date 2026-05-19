import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';

export default function SIP() {

    const [formData, setFormData] = useState({
        investorId: '',
        amount: '',
        frequency: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const createSIP = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {

            await axios.post('/sip/create', formData);

            alert('SIP Created');
            } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='dashboard-layout text-white'>

            <Layout>

            <div className='main-content'>


                <form
                    onSubmit={createSIP}
                    style={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >

                    <input
                        type='text'
                        placeholder='Investor ID'
                        name='investorId'
                        onChange={handleChange}
                         />

                    <input
                        type='number'
                        placeholder='Amount'
                        name='amount'
                        onChange={handleChange}
                    />

                    <select
                        name='frequency'
                        onChange={handleChange}
                    >
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Yearly</option>
                    </select>

                    <button>Create SIP</button>

                </form>

            </div>
            </Layout>

        </div>
    );
}
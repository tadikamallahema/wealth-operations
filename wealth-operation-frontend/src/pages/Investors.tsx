import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import Layout from "../components/Layout";

export default function Investors() {

    const [investors, setInvestors] = useState<any[]>([]);

    useEffect(() => {
        fetchInvestors();
    }, []);

    const fetchInvestors = async () => {

        try {

            const response = await axios.get('/investors');

            setInvestors(response.data.data || []);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='dashboard-layout text-white'>

            <Layout>

            <div className='main-content'>


                <div style={{ padding: '20px' }}>

                    <h2>Investors</h2>

                    <table width='100%' border-1 cellPadding='10'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                            </tr>
                        </thead>

                        <tbody>
                            {investors.map((investor, index) => (
                                <tr key={index}>
                                    <td>{investor.name}</td>
                                    <td>{investor.email}</td>
                                    <td>{investor.mobile}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>

            </div>
            </Layout>

        </div>
    );
}
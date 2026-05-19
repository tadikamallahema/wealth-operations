import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';

export default function Equity() {

    return (
        <div className='dashboard-layout text-white'>

            <Layout>

            <div className='main-content'>
                <div style={{ padding: '20px' }}>
                    <h2>Equity Operations</h2>
                    <p>All equity transactions and holdings appear here.</p>
                </div>

            </div>
            </Layout>

        </div>
    );
}
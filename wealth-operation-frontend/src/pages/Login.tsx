import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        otp: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post('http://localhost:4004/api/auth/login', formData);

            localStorage.setItem('token', response.data.token || 'dummy-token');

            navigate('/dashboard');

        } catch (error) {
            console.log(error);
            alert('Login Failed');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='min-h-screen bg-[#09061d] text-white flex'>

            <div className='flex-1 flex flex-col justify-center px-20'>
                <h1 className='text-6xl font-bold w-[70%] leading-tight'>
                    Operate, comply and scale wealth at enterprise grade.
                </h1>

                <p className='w-[70%] mt-6 text-gray-400 text-lg'>
                    Unified operations platform for equity, SIPs and mutual funds.
                </p>
            </div>

            <div className='flex-1 flex justify-center items-center'>

                <form
                    onSubmit={handleSubmit}
                    className='w-[400px] bg-[#11162c] p-10 rounded-2xl flex flex-col gap-5'
                >

                    <h2 className='text-3xl font-bold'>Sign In</h2>

                    <input
                        type='email'
                        placeholder='Enter Email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='p-4 rounded-lg bg-[#1d2440] outline-none'
                    />

                    <input
                        type='password'
                        placeholder='Enter Password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='p-4 rounded-lg bg-[#1d2440] outline-none'
                    />

                    <input
                        type='text'
                        placeholder='Enter OTP'
                        name='otp'
                        value={formData.otp}
                        onChange={handleChange}
                        className='p-4 rounded-lg bg-[#1d2440] outline-none'
                    />

                    <button className='p-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500'>
                        {loading ? 'Loading...' : 'Login'}
                        </button>

                </form>

            </div>

        </div>
    );
}

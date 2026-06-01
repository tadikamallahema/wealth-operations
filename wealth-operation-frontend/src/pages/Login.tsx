/* import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

            const response = await axios.post('http://localhost:4004/api/auth/login', formData,{
                withCredentials:true
            });

            //localStorage.setItem('token', response.data.token || 'dummy-token');

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

                    

                    <button className='p-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500'>
                        {loading ? 'Loading...' : 'Login'}
                        </button>

                </form>

            </div>

        </div>
    );
}
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            await axios.post(
                "http://localhost:4004/api/auth/login",
                formData,
                {
                    withCredentials: true
                }
            );

            const userRes =await axios.get(
                    "http://localhost:4004/api/auth/me",{withCredentials: true}
                );

            const user =
                userRes.data;

            setAuth(user);

            switch (user.role) {

                case "Admin":

                    navigate(
                        "/dashboard"
                    );

                    break;

                case "Operations_manager":

                    navigate(
                        "/operations-dashboard"
                    );

                    break;

                case "Compliance_officer":

                    navigate(
                        "/compliance-dashboard"
                    );

                    break;

                case "Monitor":

                    navigate(
                        "/monitor-dashboard"
                    );

                    break;

                default:

                    navigate(
                        "/unauthorized"
                    );
            }

        } catch (error: any) {

            console.log(error);

            alert(
                error?.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-[#09061d] text-white flex">

            <div className="flex-1 flex flex-col justify-center px-20">

                <h1 className="text-6xl font-bold w-[70%] leading-tight">

                    Operate, comply and scale wealth at enterprise grade.

                </h1>

                <p className="w-[70%] mt-6 text-gray-400 text-lg">

                    Unified operations platform for equity,
                    SIPs, mutual funds and compliance workflows.

                </p>

            </div>

            <div className="flex-1 flex justify-center items-center">

                <form
                    onSubmit={handleSubmit}
                    className="
                        w-[420px]
                        bg-[#11162c]
                        p-10
                        rounded-2xl
                        flex
                        flex-col
                        gap-5
                    "
                >

                    <h2 className="text-3xl font-bold">

                        Sign In

                    </h2>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="
                            p-4
                            rounded-lg
                            bg-[#1d2440]
                            outline-none
                        "
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="
                            p-4
                            rounded-lg
                            bg-[#1d2440]
                            outline-none
                        "
                    />

                    <button
                        disabled={loading}
                        className="
                            p-4
                            rounded-lg
                            bg-gradient-to-r
                            from-cyan-500
                            to-violet-500
                            font-semibold
                        "
                    >

                        {
                            loading
                                ? "Logging In..."
                                : "Login"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}
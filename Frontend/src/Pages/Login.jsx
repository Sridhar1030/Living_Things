import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const { error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted

        const credentials = {
            email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
            username: !emailOrUsername.includes('@') ? emailOrUsername : undefined,
            password,
        };

        dispatch(loginUser(credentials)) // Dispatch login action
            .then(() => {
                setLoading(false); // Set loading to false after successful login
                navigate('/dashboard'); // Navigate to dashboard on success
            })
            .catch((err) => {
                setLoading(false); // Set loading to false if there is an error
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300">
                        Please sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email-username" className="sr-only">
                                Email or Username
                            </label>
                            <input
                                id="email-username"
                                name="email-username"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email or Username"
                                value={emailOrUsername}
                                onChange={(e) => setEmailOrUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-100/10 rounded-lg py-2">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? (
                                <div className="spinner-border animate-spin h-5 w-5 border-t-4 border-blue-300 rounded-full"></div>
                            ) : (
                                'Sign in'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="group relative w-full flex justify-center py-2 px-4 border-2 border-blue-500 text-sm font-medium rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Create an account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

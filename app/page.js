"use client"
import React, { useState } from 'react';

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login or registration logic here
    console.log('Email:', email);
    console.log('Password:', password);
    if (!isLogin) {
      console.log('Confirm Password:', confirmPassword);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  // return (
  //   <div className="flex justify-center items-center h-screen">
  //     <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
  //       <h2 className="text-2xl font-bold mb-6 text-center">
  //         {isLogin ? 'Login' : 'Register'}
  //       </h2>
  //       <form onSubmit={handleSubmit}>
  //         <div className="mb-4">
  //           <label htmlFor="email" className="block font-medium mb-2">
  //             Email
  //           </label>
  //           <input
  //             type="email"
  //             id="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             required
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label htmlFor="password" className="block font-medium mb-2">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             id="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             required
  //           />
  //         </div>
  //         {!isLogin && (
  //           <div className="mb-4">
  //             <label htmlFor="confirmPassword" className="block font-medium mb-2">
  //               Confirm Password
  //             </label>
  //             <input
  //               type="password"
  //               id="confirmPassword"
  //               value={confirmPassword}
  //               onChange={(e) => setConfirmPassword(e.target.value)}
  //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               required
  //             />
  //           </div>
  //         )}
  //         <button
  //           type="submit"
  //           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //         >
  //           {isLogin ? 'Login' : 'Register'}
  //         </button>
  //       </form>
  //       <div className="mt-4 text-center">
  //         <button
  //           type="button"
  //           className="text-blue-500 hover:text-blue-600 focus:outline-none"
  //           onClick={toggleForm}
  //         >
  //           {isLogin
  //             ? 'Don\'t have an account? Register'
  //             : 'Already have an account? Login'}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default LoginRegisterForm;
/*jshint esversion: 8 */
import React, { useState } from 'react';
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {

    //insert code here to create useState hook variables for firstName, lastName, email, password
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [errorMessage, setErrorMessage ] = useState();
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();
    // insert code here to create handleRegister function and include console.log
    const handleRegister = async()=>{
        try{
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            if(data.authToken){
                sessionStorage.setItem('auth-token', data.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', data.email);
                setIsLoggedIn(true);
                navigate('/app')
            }
            if(data.error){
                setErrorMessage(data.error);
            }
        }catch(err){
            console.log("Error fetching details: " + err.message);
        }
    }
         return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="register-card p-4 border rounded">
                            <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                    {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="form label"> FirstName</label><br/>
                        <input
                            id="firstName"
                            type="text"
                            className="form-control"
                            placeholder="Enter your firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label htmlFor="lastName" className="form label"> LastName</label><br/>
                        <input
                            id="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Enter your lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label htmlFor="email" className="form label"> Email</label><br/>
                        <input
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="text-danger">{errorMessage}</div>
                        <label htmlFor="password" className="form label"> Password</label><br/>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* insert code here to create a button that performs the `handleRegister` function on click */}
                    <button className='btn btn-primary' onClick={handleRegister}>Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>

                         </div>
                    </div>
                </div>
            </div>

         )//end of return
}

export default RegisterPage;

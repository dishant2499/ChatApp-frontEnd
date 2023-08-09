import React, { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router'

const Loginform = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName,setFirstName] = useState("")
    const router = useRouter()

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        console.log("email",email)
        console.log("password",password)
        const data = {
            email,password,firstname:firstName
        }
        const dataList = await axios.post("https://chatapp-backend-qd3r.onrender.com/login",data)
        console.log("dataList",dataList)


       await localStorage.setItem("authToken", dataList.data.token);
        router.push({pathname:"/data", query: {
           data:dataList.data.firstname
            }})

        // Add login logic here (e.g., send login request to the server)
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '300px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            >
                <h2 style={{ marginBottom: '20px' }}>Login</h2>
                <div>
                    <label style={{ marginBottom: '8px' }}>FirstName:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e:any) => setFirstName(e.target.value)}
                        required
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div>
                    <label style={{ marginBottom: '8px' }}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e:any) => setEmail(e.target.value)}
                        required
                        style={{ padding: '8px', marginBottom: '16px' }}
                    />
                </div>
                <div>
                    <label style={{ marginBottom: '8px' }}>Password:</label>
                    <input

                        value={password}
                        onChange={(e:any) => setPassword(e.target.value)}
                        required
                        style={{ marginBottom: '16px' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Loginform;

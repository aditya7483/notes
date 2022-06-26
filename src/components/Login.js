import React, { useState } from 'react'

export default function Login() {

    const [login, setLogin] = useState(true)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handlePass = (e) => {
        setPassword(e.target.value)
    }

    const handleChange = () => {
        setErrors('');
        setPassword('');
    }

    const getAuth = async()=>{
        let res = await fetch('https://notes74.herokuapp.com/api/auth/login', {
        // let res = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        let data = await res.json();
        
        if (data.err) {
            handleChange()
            setErrors(data.err)
        }
        else{
            handleChange()
            localStorage.setItem('auth-token',data.authToken)
            window.location.reload()
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        getAuth()
    }
    
    const handleSignup = async (e) => {
        e.preventDefault();
        let res = await fetch('https://notes74.herokuapp.com/api/auth/signup', {
        // let res = await fetch('http://localhost:3001/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        let data = await res.json();
        
        if (data.err) {
            handleChange()
            setErrors(data.err)
        }
        else{
            getAuth()
        }
    }

    return (
        <div>

            {/* <!-- Button trigger modal --> */}


            {/* <!-- Modal --> */}
            <div className="modal fade" id="LoginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">
                                {login ? 'Login' : 'Create Account'}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            {/* Modal Content for Login */}

                            <div className="modal-body">
                                {errors.length !== 0 && <div className="alert alert-danger" role="alert">
                                    {errors}
                                </div>

                                }
                                {
                                    !login && <div className="mb-3">
                                        <label htmlFor="loginEmail" className="form-label">Email</label>
                                        <input type="email" value={email} className="form-control" id="loginEmail" placeholder="Enter Your Email" required onChange={handleEmail} />
                                    </div>
                                }
                                <div className="mb-3">
                                    <label htmlFor="loginUsername" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="loginUsername" placeholder="Enter Your Username" value={username} required minLength={'4'} onChange={handleUsername} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="loginPass" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="loginPass" placeholder="Enter Your Password" value={password} required minLength={'5'} onChange={handlePass} />
                                </div>

                            </div>
                            <div className="modal-footer justify-content-center flex-column">
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    {
                                        login ? <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button> :
                                            <button type="submit" className="btn btn-primary" onClick={handleSignup}>Signup</button>
                                    }
                                </div>
                                <p className='text-center mt-3'>
                                    {
                                        login ?
                                            <>
                                                Dont have an account? <button className='border-0 text-primary' onClick={() => {
                                                    setLogin(false);
                                                    handleChange();
                                                }}>Signup</button>
                                            </> :
                                            <>
                                                    Already have an account? <button className='border-0 text-primary' onClick={() => {
                                                        setLogin(true);
                                                        handleChange();
                                                    }}>Login</button>
                                            </>
                                    }
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


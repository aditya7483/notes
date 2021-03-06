import React from 'react'
import {Link} from 'react-router-dom'
import Login from './Login'

export default function Navbar(props) {

    const handleLogout = ()=>{
        localStorage.removeItem('auth-token')
        window.location.reload()
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">AT NOTES</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/stats">Activity</a>
                            </li>
                        </ul>

                        <form className="d-flex" role="search">
                            {!props.loggedIn?<button type="button" className="btn btn-outline-primary border-primary fw-bold border border-3" data-bs-toggle="modal" data-bs-target="#LoginModal">
                                Login
                            </button>:
                            <button type="button" className="btn btn-outline-secondary border-secondary fw-bold border border-3" onClick={handleLogout}>
                                Logout
                            </button>}
                            
                        </form>

                    </div>
                </div>
            </nav>
            <Login/>
        </div>
    )
}

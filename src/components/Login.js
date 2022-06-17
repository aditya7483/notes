import React from 'react'

export default function Login() {

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div>

            {/* <!-- Button trigger modal --> */}


            {/* <!-- Modal --> */}
            <div className="modal fade" id="LoginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="loginUsername" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="loginUsername" placeholder="Enter Your Username" required minLength={'4'} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="loginPass" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="loginPass" placeholder="Enter Your Password" required minLength={'5'} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div class="d-grid gap-2 col-6 mx-auto">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                <p>
                                Dont have an account? <a>Signup</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


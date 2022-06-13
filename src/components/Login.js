import React from 'react'

export default function Login() {
    return (
        <div>

            {/* <!-- Button trigger modal --> */}
            

            {/* <!-- Modal --> */}
            <div className="modal fade" id="LoginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Your Username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="Enter Your Password" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


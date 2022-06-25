import React from 'react'
import Modal from './Modal'

export default function NoteItem(props) {

    const handleDelete = async () => {
        let authToken = localStorage.getItem('auth-token')
        // eslint-disable-next-line
        let res = await fetch(`https://notes74.herokuapp.com/api/notes/deleteNote/${props.id}`, {
        // let res = await fetch(`http://localhost:3001/api/notes/deleteNote/${props.id}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })

        //empty the data array to fetch from backend again after deleting
        props.empty();

    }

    return (
        <div>
            <div className="card " style={{ minWidth: "18rem", minHeight: "12rem" }}>
                <div className="card-body" style={{ boxShadow: " black 1px 1px 3px 0px", paddingBottom: '0px' }}>

                    <h5 className="card-title text-center mb-5">{props.title.toUpperCase()}</h5>
                    <p className="card-text">{props.desc}</p>


                    <div className='d-flex justify-content-between mb-3'>

                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${props.no}`} style={{ marginTop: '19px', padding: '3px 6px' }}><i className="fa-solid fa-pencil"></i></button>

                        <button type="button" className="btn btn-secondary bg-danger" data-bs-toggle="modal" data-bs-target={`#confirm-delete${props.no}`} style={{ marginTop: '19px', padding: '3px 6px' }}><i className="fa-solid fa-trash"></i></button>


                        <div className="modal fade" id={`confirm-delete${props.no}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Confirm Delete</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Are you sure you want to permanently delete this item?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn bg-danger" onClick={handleDelete} style={{ color: 'white' }} data-bs-dismiss="modal">Confirm</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal what={'Edit'} empty={props.empty} initTitle={props.title} initDesc={props.desc} action={'PUT'} itemId={props.id} no={props.no} authToken={props.authToken} />

                </div>
            </div>
        </div>
    )
}

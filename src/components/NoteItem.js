import React from 'react'
import Modal from './Modal'

export default function NoteItem(props) {

    const handleDelete = async () => {
        // eslint-disable-next-line
        let res = await fetch(`/api/deleteNote/${props.id}`, {
            method: `DELETE`
        })
        props.empty();
    }

    return (
        <div>
            <div className="card " style={{ minWidth: "18rem", minHeight: "12rem" }}>
                <div className="card-body" style={{ boxShadow: " black 1px 1px 3px 0px", paddingBottom: '0px' }}>

                    <h5 className="card-title text-center mb-5">{props.title.toUpperCase()}</h5>
                    <p className="card-text">{props.desc}</p>


                    <div className='d-flex justify-content-between'>

                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${props.no}`} style={{ marginTop: '19px', padding: '3px 6px' }}><i className="fa-solid fa-pencil"></i></button>

                    <button type="button" className="btn btn-secondary bg-danger"onClick={handleDelete} style={{ marginTop: '19px', padding: '3px 6px' }}><i className="fa-solid fa-trash"></i></button>

                    </div>

                    <Modal what={'Edit'} empty={props.empty} initTitle={props.title} initDesc={props.desc} action={'PUT'} itemId={props.id} no={props.no} changeData={props.changeData} />

                </div>
            </div>
        </div>
    )
}

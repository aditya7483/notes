import React from 'react'
import Modal from './Modal'

export default function NoteItem(props) {

    const handleEdit=()=>{

    }

    return (
        <div>
            <div className="card" style={{width: "18rem",height:"12rem"}}>
                <div className="card-body" style={{boxShadow:" black 1px 1px 3px 0px",paddingBottom:'0px' }}>
                    <h5 className="card-title text-center mb-5">{props.title.toUpperCase()}</h5>
                    <p className="card-text">{props.desc}</p>
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleEdit} style={{marginTop:'19px',    padding: '3px 6px'}}><i className="fa-solid fa-pencil"></i></button>
                 <Modal what={'Edit'} initTitle={props.title} initDesc={props.desc} action={'PUT'} itemId={props.id}/>
                </div>
            </div>
        </div>
    )
}

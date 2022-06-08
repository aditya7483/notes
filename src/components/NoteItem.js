import React from 'react'

export default function NoteItem(props) {
    return (
        <div>
            <div className="card" style={{width: "18rem",height:"12rem"}}>
                <div className="card-body" style={{boxShadow:" black 1px 1px 3px 0px"}}>
                    <h5 className="card-title text-center mb-5">{props.title.toUpperCase()}</h5>
                    <p className="card-text">{props.desc}</p>
                </div>
            </div>
        </div>
    )
}

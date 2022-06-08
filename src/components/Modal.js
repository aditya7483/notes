import React, { useState } from 'react'

export default function Modal(props) {
    const [myTitle, setMyTitle] = useState('');
    const [desc, setDesc] = useState('');
    

    const handleTitleChange = (e) => {
        setMyTitle(e.target.value);
    }
    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const handleSave = async (e) => {
        e.preventDefault()
        let obj = {
            title: myTitle,
            description: desc,
            _id: Date.now()
        }

        let res = await fetch('/api/createNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: myTitle,
                description: desc
            })
        })

        let data = await res.json();
        console.log(data)

        props.changeData(obj);
    }


    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary add-notes" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Add Notes
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">New Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>


                        <form class="row g-3 needs-validation" novalidate  onSubmit={handleSave}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="validationCustom01" className="form-label">Title</label>
                                    <input type="text" class="form-control" id="validationCustom02" required placeholder="Enter the Title" value={myTitle} onChange={handleTitleChange} />
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="validationCustom02" className="form-label">Description</label>
                                    <textarea className="form-control" id="validationCustom02" required placeholder='Enter the Description' rows="3" value={desc} onChange={handleDescChange}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" data-bs-dismiss={`${myTitle.length!==0?'modal':''}`}>Save</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useState} from 'react'
import PropTypes from 'prop-types'

export default function Modal(props) {
    const [myTitle, setMyTitle] = useState(props.initTitle);
    const [desc, setDesc] = useState(props.initDesc);

    const handleTitleChange = (e) => {
        setMyTitle(e.target.value);
    }
    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const create = async () => {
        let res = await fetch(`https://notes74.herokuapp.com/api/notes/createNote`, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: myTitle,
                description: desc
            })
        })
        // eslint-disable-next-line
        let data = await res.json();
    }
    const update = async () => {
        
        let res = await fetch(`https://notes74.herokuapp.com/api/notes/update/${props.itemId}`, {
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: myTitle,
                description: desc
            })
        })
// eslint-disable-next-line
        let data = await res.json();
    }

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (props.action==="POST") {
            create()
            props.empty();
        }
        
        else{
            update()
            props.empty();
        }

    }


    return (
        <div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id={`staticBackdrop${props.no}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{props.what} Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>


                        <form className="row g-3 needs-validation" noValidate onSubmit={handleSave}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="validationCustom01" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="validationCustom01" required placeholder="Enter the Title" value={myTitle} onChange={handleTitleChange} />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="validationCustom02" className="form-label">Description</label>
                                    <textarea className="form-control" id="validationCustom02" required placeholder='Enter the Description' rows="3" value={desc} onChange={handleDescChange}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className={`btn btn-primary ${myTitle.length !== 0 && desc.length !== 0 ? '' : 'disabled'}`} data-bs-dismiss={`${myTitle.length !== 0 && desc.length !== 0 ? 'modal' : ''}`}>Save</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    initDesc: PropTypes.string.isRequired,
    initTitle: PropTypes.string.isRequired,
    what: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    _id: PropTypes.string,
    empty:PropTypes.func
}

Modal.defaultProps = {
    initDesc: "",
    initTitle: "",
    action: 'POST'
}

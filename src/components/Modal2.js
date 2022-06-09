import React, { useState,useEffect} from 'react'
import PropTypes from 'prop-types'

export default function Modal(props) {
    const [myTitle, setMyTitle] = useState('');
    const [desc, setDesc] = useState('');
    
    // useEffect(() => {
    //     setMyTitle(props.initTitle)
    //     setDesc(props.initDesc)
    // }, []);


    const handleTitleChange = (e) => {
        setMyTitle(e.target.value);
    }
    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const create=async()=>{
        let res = await fetch(`/api/createNote`, {
            method: `POST`,
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
    }
    const update=async()=>{
        let res = await fetch(`/api/update/${props.itemId}`, {
            method: `PUT`,
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
    }

    const handleSave = async (e) => {
        e.preventDefault()
        let obj = {
            title: myTitle,
            description: desc,
            _id: Date.now()
        }

        if(props.action.length===4)
        {
            create()
        }

        else if(props.action==='PUT')
        {
            update()
        }

        props.changeData(obj);
    }


    return (
        <div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                <button type="submit" className={`btn btn-primary ${myTitle.length!==0?'':'disabled'}`} data-bs-dismiss={`${myTitle.length !== 0 &&desc.length !== 0 ? 'modal' : ''}` }>Save</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes={
    initDesc:PropTypes.string.isRequired,
    initTitle:PropTypes.string.isRequired,
    what:PropTypes.string.isRequired,
    action:PropTypes.string.isRequired,
    _id:PropTypes.string
}

Modal.defaultProps = {
    initDesc: "",
    initTitle: "",
    action:'POST'
}

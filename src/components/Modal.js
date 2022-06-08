import React,{useState} from 'react'

export default function Modal(props) {
    const [myTitle, setMyTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleTitleChange = (e)=>{
        setMyTitle(e.target.value);
    }
    const handleDescChange = (e)=>{
        setDesc(e.target.value);
    }

    const handleSave = ()=>{
        let obj={
            title:myTitle,
            description:desc,
            date:Date.now()
        }
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
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter the Title" value={myTitle} onChange={handleTitleChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Enter the Description' rows="3" value={desc} onChange={handleDescChange}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

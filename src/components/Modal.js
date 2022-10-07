import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function Modal(props) {
  // const link = 'http://localhost:3001'
  const link = 'https://notes74.herokuapp.com'
  const [myTitle, setMyTitle] = useState(props.initTitle);
  const [desc, setDesc] = useState(props.initDesc);
  const [err, setErr] = useState({
    err: false,
    mess: ''
  });

  const handleTitleChange = (e) => {
    setMyTitle(e.target.value);
  }
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  }

  //send the title and desc to backend
  const create = async () => {
    try {
      let authToken = window.localStorage.getItem('auth-token')
      let res = await fetch(`https://notes74.herokuapp.com/api/notes/createNote`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify({
          title: myTitle,
          description: desc
        })
      })
      // eslint-disable-next-line
      let data = await res.json();
      if (data.err) {
        window.alert(data.err)
      }
      //cleaning up the previous contents of the modal which by default saves the last typed content only when the action is create.
      else {
        setDesc('')
        setMyTitle('')
        props.empty()
      }
    }
    catch (err) {
      console.log(`inside catch ${err}`)
    }
  }

  //send the updated title or description to backend
  const update = async () => {
    try {
      let authToken = localStorage.getItem('auth-token')

      let res = await fetch(`https://notes74.herokuapp.com/api/notes/updateNote/${props.itemId}`, {
        method: `PUT`,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify({
          title: myTitle,
          description: desc
        })
      })
      // eslint-disable-next-line
      let data = await res.json();
      if (data.err) {
        window.alert(data.err)
      }
      else {
        props.empty()
      }
    } catch (err) {
      console.log(err)
    }

  }

  const handleSave = async (e) => {
    e.preventDefault();


    //if creating new note
    if (props.action === "POST") {
      create()
    }

    //if updating existing note
    else {
      if (update()) { props.empty(); }
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
                  <label htmlFor={`validationCustom01${props.no}`} className="form-label">Title</label>
                  <input type="text" className="form-control" id={`validationCustom01${props.no}`} required placeholder="Enter the Title" value={myTitle} onChange={handleTitleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor={`validationCustom02${props.no}`} className="form-label">Description</label>
                  <textarea className="form-control" id={`validationCustom02${props.no}`} placeholder='Enter the Description' rows="3" value={desc} onChange={handleDescChange}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className={`btn btn-primary ${myTitle.length !== 0 && (myTitle.length < 10 ? (desc.length > 0 ? true : false) : true) ? '' : 'disabled'}`} data-bs-dismiss={`modal`}>Save</button>
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
  empty: PropTypes.func
}

Modal.defaultProps = {
  initDesc: "",
  initTitle: "",
  action: 'POST'
}

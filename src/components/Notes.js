import React, { useState, useEffect } from 'react'
import Modal from './Modal';
import NoteItem from './NoteItem';
import Spinner from './Spinner';


export default function Notes(props) {
  let count = 0;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noNotes, setNoNotes] = useState(false)

  async function fetchData() {
    if (props.loggedIn) {
      try {
        let authToken = localStorage.getItem('auth-token')
        let response = await fetch('https://notes74.herokuapp.com/api/notes/getNotes',{
        // let response = await fetch(`http://localhost:3001/api/notes/getNotes`, {
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken
          }
        });
        let parsedData = await response.json();
        if (parsedData.length === 0) {
          setNoNotes(true)
        }
        else {
          setNoNotes(false);
          setData(parsedData)
        }
      } catch (err) {
        setNoNotes(true)
      }
    }
    else{
      setNoNotes(true)
    }
  }

  const emptyData = () => {
    setData([]);
  }

  useEffect(() => {
    if (data.length === 0) {
      setLoading(true)
      setTimeout(() => {
        fetchData();
        setLoading(false)
      }, 1200);
    }
    // eslint-disable-next-line
  },[props.loggedIn,data]);



  return (
    <>
      {(!loading && noNotes) && <h3 className='text-center' style={{ marginTop: "7rem" }}>{props.loggedIn?'CLICK ON ADD NOTES TO CREATE NOTES':'PLEASE LOGIN TO CREATE NOTES'}</h3>}
      {(loading) && <Spinner />}
      {(!loading || !noNotes) &&
        <>
          <div className='container' style={{ marginTop: "7rem" }}>
            <div className='row'>
              {
                data.map((elem) => {
                  count++;
                  return <div className='col-lg-4  mb-4' key={elem._id}>
                    <NoteItem title={elem.title} desc={elem.description} date={elem.date} id={elem._id} no={count} empty={emptyData} />
                  </div>
                })
              }
            </div>
          </div>
        </>
      }

      {props.loggedIn&&<button type="button" className="btn btn-primary add-notes my-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop-1">
        Add Notes
      </button>}
      <Modal what={'Add'} empty={emptyData} action={'POST'} no={'-1'} />


    </>
  )
}

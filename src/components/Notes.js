import React, { useState, useEffect } from 'react'
import Modal from './Modal';
import NoteItem from './NoteItem';

export default function Notes() {
  const [data, setData] = useState([]);

  async function fetchData() {
    let response = await fetch('/api/notes');
    let parsedData = await response.json();
    setData(parsedData)
  }

  const changeData = (newData) => {
    setData(data.concat(newData));
  }

  useEffect(() => {
    if(data.length===0)
    fetchData();
        
      
    // eslint-disable-next-line
  },[]);



  return (
    <>
      <div className='container' style={{ marginTop: "7rem" }}>
        <div className='row'>
          {
            data.map((elem) => {
              return <div className='col-md-4  mb-4' key={elem._id}>
                <NoteItem title={elem.title} desc={elem.description} date={elem.date} id={elem._id}/>
              </div>
            })
          }
        </div>
      </div>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary add-notes" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Add Notes
            </button>
      <Modal what={'Add'} changeData={changeData} action={'POST'}/>
    </>
  )
}

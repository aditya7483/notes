import React, { useState, useEffect } from 'react'
import Modal from './Modal';
import NoteItem from './NoteItem';

export default function Notes() {
  const [data, setData] = useState([]);
  // const [unsavedData, setUnsavedData] = useState([])

  async function fetchData() {
    let response = await fetch('/api/notes');
    let parsedData = await response.json();
    setData(parsedData)
  }

  const changeData = (newData) => {
    setData(data.concat(newData));
      // console.log(unsavedData)
  }

  useEffect(() => {
    if(data.length===0)
    fetchData();
        
      
    
  },[]);



  return (
    <>
      <div className='container' style={{ marginTop: "7rem" }}>
        <div className='row'>
          {
            data.map((elem) => {
              return <div className='col-md-4  mb-4' key={elem._id}>
                <NoteItem title={elem.title} desc={elem.description} date={elem.date} />
              </div>
            })
          }
        </div>
      </div>
      <Modal changeData={changeData} />
    </>
  )
}

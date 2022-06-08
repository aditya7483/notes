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

  const changeData =(newData)=>{
    console.log(newData)
    setData(data.push(newData));
    console.log(data)
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div className='container' style={{marginTop:"7rem"}}>
        <div className='row'>
          {
            data.map((elem) => {
              return <div className='col-md-4' key={elem.title}>
                <NoteItem title={elem.title} desc={elem.description} date={elem.date} />
              </div>
            })
          }
        </div>
      </div>
      <Modal changeData={changeData}/>
    </>
  )
}

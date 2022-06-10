import React, { useState, useEffect } from 'react'
import Modal from './Modal';
import NoteItem from './NoteItem';
import Spinner from './Spinner';


export default function Notes() {
  let count = 0;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    setLoading(true)
    let response = await fetch('/api/notes');
    let parsedData = await response.json();
    setData(parsedData)
    setLoading(false)
  }

  const changeData = (newData) => {
    setData(data.concat(newData));
  }

  const emptyData = () => {
    setData([]);
  }

  useEffect(() => {
    if (data.length === 0)
      fetchData();


    // eslint-disable-next-line
  }, [data]);



  return (
    <>
      {loading && <Spinner />}

      {!loading &&
        <>
          <div className='container' style={{ marginTop: "7rem" }}>
            <div className='row'>
              {
                data.map((elem) => {
                  count++;
                  return <div className='col-lg-4  mb-4' key={elem._id}>
                    <NoteItem title={elem.title} desc={elem.description} date={elem.date} id={elem._id} no={count} empty={emptyData} changeData={changeData} />
                  </div>
                })
              }
            </div>
          </div>

          <button type="button" className="btn btn-primary add-notes" data-bs-toggle="modal" data-bs-target="#staticBackdrop0">
            Add Notes
          </button>
          <Modal what={'Add'} changeData={changeData} empty={emptyData} action={'POST'} no={0} />
        </>
      }
    </>
  )
}

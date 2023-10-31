import React, { useState, useEffect } from 'react'
import APIService from './APIService'


function Form(props) {
    const [headline, setHeadline] = useState(props.journal.headline)
    const [details, setDetails] = useState(props.journal.details)

    useEffect(()=> {
        setHeadline(props.journal.headline)
        setDetails(props.journal.details)
    },[props.journal])

    const updateJournal = () => {
        APIService.UpdateJournal(props.journal.id, {headline, details})
        .then(resp => props.updatedData(resp))
        .catch(error=>console.log(error))
    }

    const createJournal = () => {
        APIService.CreateJournal({headline, details})
        .then(resp => props.cratedJournal(resp))
        .catch(error => console.log(error))
    }

    return (
        <div>
            {props.journal ? (
                <div className='ut-jrnl'>
                    <label htmlFor = "headline" className='form-label'>Headline</label>
                    <input value={headline} type="text" className='form-control' 
                    placeholder='Please Enter Headline' onChange={(e)=>setHeadline(e.target.value)}/>

                    <label htmlFor = "details" className='form-label'>Details</label>
                    <textarea value={details} rows='5' className='form-control' 
                    placeholder='Please Enter Details' onChange={(e)=>setDetails(e.target.value)}/>
                    
                    {
                        props.journal.id ? 
                        <button onClick={updateJournal} className='btn btn-success mt-3'>Update</button>     
                        : 
                        <button onClick={createJournal} className='btn btn-success mt-3'>Create</button>
                        
                    }
                </div>
                    
            ):null}
        </div>
    )
}

export default Form
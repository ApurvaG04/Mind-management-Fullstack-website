import React from 'react'
import APIService from './APIService'

function JournalList(props) {
    const editJournal = (journal) =>{
        props.editJournal(journal)
    }

    const deleteJournal = (journal) => {
        APIService.DeleteJournal(journal.id)
        .then(()=> props.deleteJournal(journal))
    }

    return (
        <div>
            {props.journals && props.journals.map(journal => {
            return (
            <div key = {journal.id} className=''>
                <h3>{journal.headline}</h3>
                <p>{journal.details}</p>
                <p>{journal.date}</p>
                <p>Emotions: <span className="w3-tag">{journal.emotions}</span></p>

                <div className='row'>
                    <div className='col-md-1'>
                        <button className='btn btn-primary' onClick = {() => editJournal(journal)}>Update</button>
                    </div>
                    <div className='col'>
                        <button className='btn btn-danger' onClick={() => deleteJournal(journal)}>Delete</button>
                    </div> 
                    
                </div> 
                <hr/>
            </div>
            )
            })}
        </div>
    )
}

export default JournalList;
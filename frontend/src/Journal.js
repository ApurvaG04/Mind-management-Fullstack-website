import './App.css';
import JournalList from './components/JournalList';
import Form from './components/Form';
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

function Journal() {
  const [journals, setJournals] = useState([])
  const [editedJournal, setEditedJournal] = useState(null)
  const userEmail = sessionStorage.getItem('email');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/journal', {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userEmail": userEmail,
      })
    })
    .then(resp => resp.json())
    .then(resp => setJournals(resp))
    .catch(error => console.log(error))
    
  },[])

  const editJournal = (journal) => {
    setEditedJournal(journal)
  }

  const updatedData = (journal) => {
    const new_journals = journals.map(my_journal => {
      if(my_journal.id === journal.id){
        return journal
      } else {
        return my_journal
      }
    })
    setJournals(new_journals)
  }

  const createdJournal = (journal) => {
    const new_journals = [...journals, journal]
    setJournals(new_journals)
  }

  const deleteJournal = (journal) => {
    const new_journals = journals.filter(myjournal => {
      if(myjournal.id === journal.id) {
        return false;
      } 
      return true
    })
    setJournals(new_journals)
  }

  const openForm = () => {
    setEditedJournal({headline:'', details:''})
  }

  return ( 			
    <div className="Journal">
      <div className='row'>
        <div className='col'>
          <h1>Daily Journal</h1>
        </div>
        <div className='col'>
            {(userEmail && userEmail!="" && userEmail!=undefined)?
            <button className='btn btn-success' onClick={openForm}>Create</button>:
            <Link to="/login">
              <button type="button" className="btn btn-primary btn-lg">Login</button>
            </Link>}
        </div> 
      </div>
      <br/>
      <br/>
      {editedJournal ? <Form journal = {editedJournal} updatedData = {updatedData} createdJournal = {createdJournal}/> : null}
      <br/>
      <br/>
      <JournalList journals = {journals} editJournal = {editJournal} deleteJournal = {deleteJournal}/>
    </div> 
  );
}

export default Journal;

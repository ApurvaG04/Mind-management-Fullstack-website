import './App.css';
import JournalList from './components/JournalList';
import Form from './components/Form';
import {useState, useEffect} from 'react';

function Journal() {
  const [journals, setJournals] = useState([])
  const [editedJournal, setEditedJournal] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/journal', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
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
            <button className='btn btn-success' onClick={openForm}>Create</button>
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

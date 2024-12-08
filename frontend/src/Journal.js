import './App.css';
import JournalList from './components/JournalList';
import Form from './components/Form';
import {useState, useEffect} from 'react';
import book from './Book.jpg';
import Button from 'react-bootstrap/Button';

function Journal() {
  const [journals, setJournals] = useState([])
  const [editedJournal, setEditedJournal] = useState(null)
  const userEmail = sessionStorage.getItem('email');

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/journal', {
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
    console.log(editedJournal)
    setEditedJournal({headline:'', details:''})
  }

  return ( 
    <div className="container col-xxl-8 px-4 py-5 ">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        {(userEmail && userEmail!=="" && userEmail!==undefined)? <>
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Daily Journal</h1>
        <Button variant='success' size='md' onClick={openForm}>Create</Button>  
        <div className='Journal'>
          <br/>
            {editedJournal ? <Form journal = {editedJournal} updatedData = {updatedData} createdJournal = {createdJournal}/> : null}
            <hr/>
            <br/>
            <JournalList journals = {journals} editJournal = {editJournal} deleteJournal = {deleteJournal}/>
          </div>      
        </>:<>
          <div className="col-10 col-sm-8 col-lg-6">
            <img src={book} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="400" height="200" loading="lazy"/>
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Daily Journal</h1>
            <p className="lead">
              <br/>
              😇 "I can shake off everything as I write; my sorrows dissapear, my courage is reborn." 
              - <a href='https://en.wikipedia.org/wiki/Anne_Frank'>Anne Frank</a>
              <br/><br/>
              😇 "Keeping a journal will change your life in ways that you'd never imagine." 
              - <a href='https://en.wikipedia.org/wiki/Oprah_Winfrey'>Oprah Winfrey</a>
              <br/><br/>
              😇 "Writing is medicine. It is an appropriate antidote to injury. It is an appropriate companion for any difficult change."
              - <a href='https://en.wikipedia.org/wiki/Julia_Cameron'>Julia Cameron</a>
              <br/><br/>
              😇 "Writing in a journal reminds you of your goals and of your learning in life. It offers a place where you can hold a deliberate, 
              thoughtful conversation with yourself." 
              - <a href='https://en.wikipedia.org/wiki/Robin_Sharma'>Robin Sharma</a>
              <br/><br/>
              Please login to start Jounaling.
              <br/>
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Button href="/login" type="button" className="btn btn-primary btn-lg px-4 me-md-2">Login</Button>
              <Button href="/signup" type="button" className="btn btn-secondary btn-lg px-4">Signup</Button>
            </div>
          </div></>}          
      </div>
    </div>

    
  );
}

export default Journal;

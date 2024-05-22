import './App.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';


function Affirmations() {
        const [affirmation, setAffirmation] = useState("")
        // const userEmail = sessionStorage.getItem('email');
      
        // useEffect (() => {
        //   (async () => {
        //   fetch('http://127.0.0.1:5000/affirmation', {
        //     'method': 'GET',
        //     headers: {
        //       'Content-Type': 'application/json'
        //       // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/affirmation'
        //     },
        //   })
        //   .then(resp => resp.json())
        //   .then(resp => {console.log(resp.quote); 
        //                 setAffirmation(resp.quote)
        //                 })
        //   .catch(error => console.log(error))
        // })(); 
        // },[])

        const getQuote= () => {
          fetch('http://127.0.0.1:5000/affirmation', {
            'method': 'GET',
            headers: {
              'Content-Type': 'application/json'
              // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/affirmation'
            },
          })
          .then(resp => resp.json())
          .then(resp => {console.log(resp.quote); 
                        setAffirmation(resp.quote)
                        })
          .catch(error => console.log(error))
          
        }

    return (
      <div className='container px-5 pt-5 my-3 text-center'>
        <h1 className="display-5 fw-bold text-body-emphasis">Affirmations</h1>      
        <div className='bg-image img-fluid border rounded-3 shadow-lg col-lg-6 mx-auto' style={{backgroundImage:'url(https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
         height:'70vh', width:'150vh'}}>   
            <div className='quoteTile col-md-6 offset-md-3'>
                <p className='quote-text'>{affirmation}</p>
            </div> 
        </div>
        {/* <Button variant="primary" size='lg' href='/affirmations'>Next</Button> */}
        <Button variant="primary" size="lg" onClick={getQuote} type="submit">Next</Button>
      </div>
    );
};

export default Affirmations
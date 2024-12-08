import './App.css';
import { useState, useEffect } from 'react';
import { TailSpin } from "react-loader-spinner";
import Read from './Read';
import { useNavigate } from 'react-router-dom';

function Readings() {
    const navigate = useNavigate()
    const [readings, setReadings] = useState([])
    const [loading, setLoading] = useState(false);
    // const [subject, setSubject] = useState("")
    // const getTopic = (props) => {
    //     setSubject(props)
    //     updateTopic(subject)
    // }
    // const [choosetopic, setChoosetopic] = useState("")
    // const userEmail = sessionStorage.getItem('email');
    
    
    useEffect (() => {
        (async () => {
            setLoading(true);
            let data = await fetch(process.env.REACT_APP_API_URL + '/readings', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/affirmation'
            }
            })
            let read_data = await data.json()
            try {
                
                console.log(read_data); 
                setReadings(read_data)
                setLoading(false);
            }
            catch (error){
                console.log(error)
            }      
        })();
    },[])

    

    const handleClick = (event) => {
        const topicName = event.target.textContent;
        console.log(`Clicked item with ID: ${topicName}`);
        console.log('Button clicked!', event.target.textContent);
        navigate("/readings/read", {state: {topic:topicName}})
        
    }

    return (
        <div className='container'>
            <h1 className='py-5'>Reading materials</h1>
            <p>All the articles in this website are taken from <a href='https://www.nimh.nih.gov/'>National Institute of Mental Health (NIMH)</a>, the lead federal agency for research on mental disorders, which offers basic information on mental disorders, a range of related topics, and the latest mental health research.<br/><br/>
            It is not the intention of NIMH or our website to provide specific medical advice, but rather to provide users with information to better understand their health and their diagnosed disorders. Consult with a qualified health care provider for diagnosis, treatment, and answers to your personal questions.</p>
            {loading ? (
                <div
                    style={{
                        width: "100px",
                        marginTop: "60px",
                        marginLeft: "500px",
                    }}>
                    <TailSpin
                        height="80"
                        width="80"
                        color="#5bbfe3"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}/>
                </div>
            ) : (
                <div className="list-group" onClick={handleClick}>
                    {readings.map(([topic, content]) => {
                        return(
                            <div className='container my-3'>
                                <hr/>
                                <br/>
                                <a href="/readings/read"  key={topic} className="fw-semibold fs-4" aria-current="true">{topic}</a>
                                {/* value={topic} onClick={(e)=>updateTopic(topic)} */}
                                {/* {choosetopic? <Read choosetopic = {updateTopic}/> : null} */}
                                <p>{content}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
    
};

export default Readings

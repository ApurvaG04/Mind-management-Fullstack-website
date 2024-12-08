import './App.css';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { TailSpin } from "react-loader-spinner";

function Read() {
    
    const [reads, setReads] = useState([])
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const topic = location.state.topic
    console.log(topic)
    // useEffect(()=> {
    //     setTopic(props.choosetopic)
    //     console.log(props.choosetopic)
    // },[props.choosetopic])
    // const getTopic = (props) => {
    //     setSubject(props)
    // }
    // const userEmail = sessionStorage.getItem('email');
      
    useEffect (() => {
        (async () => {
            setLoading(true);
            let data = await fetch(process.env.REACT_APP_API_URL + '/readings/'+topic, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/affirmation'
            }
            })
            let read_data = await data.json()
            try {
                console.log(read_data); 
                setReads(read_data)
                setLoading(false);
            }
            catch (error){
                console.log(error)
            }      
        })();
    },[topic])

    return (      
        <div className='container'>
            <h1 className='my-3'>{topic}</h1>
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
                <div className="list-group">
                    {reads.map(([heading, para]) => {
                        return(
                            <div className='container my-3'>
                                <hr/>
                                <br/>
                                <h3><strong>{heading}</strong></h3><br/>
                                <p>{para}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    
    )
    
};

export default Read

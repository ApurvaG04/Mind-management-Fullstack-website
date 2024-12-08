import './App.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { TailSpin } from "react-loader-spinner";

function Meditation() {
    const [meditationData, setMeditationData] = useState([])
    const [loading, setLoading] = useState(false);
    // const userEmail = sessionStorage.getItem('email');
      
    useEffect (() => {
        (async () => {
            setLoading(true);
            let music = await fetch(process.env.REACT_APP_API_URL + '/meditation', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/affirmation'
            },
            })
            let musicJson = await music.json()
            try {
                console.log(musicJson.tracks.items); 
                setMeditationData(musicJson.tracks.items)
                setLoading(false);
            }
            catch (error){
                console.log(error)
            }  

        })();
            
    },[])

    return (
        <div className='container'>
            {/* <button onClick={getMusic} className='btn btn-primary'>get</button> */}
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
            <div className='row p-15'>              
                {
                    meditationData.map((element) => {
                        return (
                            <div className='col-lg-3 col-md-6 py-3'>                              
                                <div key={element.id} className="card">
                                    <img src={element.album.images[1].url} alt=''/>
                                    <div className="card-body">
                                        <h6 className="card-title">{element.name}</h6>
                                        <p className="card-text">
                                        </p>
                                        <audio src={element.preview_url} controls className='w-100'></audio>
                                    </div>
                                </div>
                            </div> 
                        );
                    })
                }
                        {/* <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </p>
                            <a href="#" className="btn btn-primary">
                            Go somewhere
                            </a>
                        </div> */}
                    
                              
            </div>)}
        
        </div>

    )

}

export default Meditation

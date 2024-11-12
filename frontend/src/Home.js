import { useState } from 'react';
import './App.css';
import peace from './peace.jpg';
import articles from './articles.svg';
import meditation from './meditation.svg';
import journal from './journal.svg';
import motivation from './motivation.png'
import affirmations from './affirmations.svg';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/esm/Button';



const Home = () => {
    
    const [index, setIndex] = useState(0);
    
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    function sendingEmail() {
        const subjectValue = document.getElementById('subject').value;
        const messageValue = document.getElementById('message').value;
        const emailLink = document.getElementById('send')
        emailLink.setAttribute("href", "mailto:apurva.gawande@csu.fullerton.edu?subject=" + subjectValue +"&body=" + messageValue) ;
        console.log(emailLink.getAttribute('href'))   
    }

    return (
        <div className='home'>
            <div className="px-4 py-4 text-center">
                <h1 className="display-4 fw-bold text-body-emphasis">Be mindful with Mind Fitness</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Understand the necessity and importance of mindfulness journey and start taking care of your mind with easy, proven and effective mindfulness steps. We are here to help you taking care of yourself and build a effective mindfulness discipline.</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                        <Button href="/signup" type="button" className="btn btn-primary btn-lg px-4 me-sm-3">Get started</Button>
                        <Button href="#contact" type="button" className="btn btn-secondary btn-lg px-4">About Me</Button>
                    </div>
                </div>
                <div className="overflow-hidden" style={{'maxHeight': '50vh'}}>
                    <div className="container px-5">
                        <img src={peace} className="img-fluid border rounded-3 shadow-lg mb-5" alt="peace" width="700" height="500" loading="lazy"/>
                    </div>
                </div>
            </div>
            <h2 className='display-6 fw-medium text-body-emphasis text-center py-5 '>Services</h2>
            <div className='container py-4 my-3 px-5 mb-5 outlines'>
                <div className="row">
                    <div className="col-lg-4">
                        <img className="bd-placeholder-img" width="100" height="100" src={journal} aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"/>
                        <h3 className="fw-normal">Journal</h3>
                        <p>Start your journal writing journey with us towards mindfulness, mental wellness and emotinal awareness.</p>
                        <p><a className="btn btn-secondary" href="/journal">View details »</a></p>
                    </div>
                    <div className="col-lg-4">
                        <img className="bd-placeholder-img" width="100" height="100" src={meditation} aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"/>
                        <h3 className="fw-normal">Meditation</h3>
                        <p>Meditate with variety of soothing music, to gain a sense of peace and balance that can benefit your emotional well-being and overall health.</p>
                        <p><a className="btn btn-secondary" href="/meditation">View details »</a></p>
                    </div>
                    <div className="col-lg-4">
                        <img className="bd-placeholder-img" width="100" height="100" src={affirmations} aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"/>
                        <h3 className="fw-normal">Affirmations</h3>
                        <p>Read positive affirmations everyday to have a positive mindset and train your mind to create positive responses to different circumstances.</p>
                        <p><a className="btn btn-secondary" href="/affirmations">View details »</a></p>
                    </div>
                </div>
                <div className="row py-5">
                    <div className="col-lg-4">
                        <img className="bd-placeholder-img" width="100" height="100" src={articles} aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"/>
                        <h3 className="fw-normal">Articles</h3>
                        <p>Read articles from a trusted resource to understand various mental illnesses and use this awareness to help others and yourself.</p>
                        <p><a className="btn btn-secondary" href="/readings">View details »</a></p>
                    </div>
                    <div className="col-lg-4">
                        <img className="bd-placeholder-img" width="100" height="100" src={motivation} aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"/>
                        <h3 className="fw-normal">Motivation</h3>
                        <p>Know the importance of mindfulness self-care journey from the experts and start your journey with an aware motivated mind.</p>
                        <p><a className="btn btn-secondary" href="#motivation">View details »</a></p>
                    </div>
                    {/* <div className="col-lg-4">
                        <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                        <h3 className="fw-normal">Heading</h3>
                        <p>And lastly this, the third column of representative placeholder content.</p>
                        <p><a className="btn btn-secondary" href="#">View details »</a></p>
                    </div> */}
                </div>               
            </div>
            <div id="motivation" className="home pb-5">
            <h2 className="container display-6 fw-medium text-body-emphasis text-center py-5" style={{'padding':'20px'}}>Motivation</h2>
            <Carousel activeIndex={index} onSelect={handleSelect} className='container outlines p-5 '>
                <Carousel.Item>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            <div className="col">
                            <div className="card shadow-sm">
                                {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail1</text></svg> */}
                                <iframe width="100%" height="225" src="https://www.youtube.com/embed/mRAvlQbdz5k?si=ZCxjeVgo2fxOP8ob" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                <div className="card-body">
                                <p className="card-text">Why It’s Important to Care for Your Mental Well-Being | Nadia Sheikh | TEDx </p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div> */}
                                    <small className="text-body-secondary">9 mins</small>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col">
                            <div className="card shadow-sm">
                                {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail2</text></svg> */}
                                <iframe width="100%" height="225" src="https://www.youtube.com/embed/H3LMAMjWAGU?si=Ahz2-fyC7I6OsbfW" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                <div className="card-body">
                                <p className="card-text">Impact of Mindful Meditation on Emotional Well-being | Dr. JAI MADAAN | TEDxGIBS</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div> */}
                                    <small className="text-body-secondary">9 mins</small>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col">
                            <div className="card shadow-sm">
                                {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail3</text></svg> */}
                                <iframe width="100%" height="225" src="https://www.youtube.com/embed/wAZn9dF3XTo?si=6SIW2qQzvTiF0U5D" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                <div className="card-body">
                                <p className="card-text">A Science-Supported Journaling Protocol to Improve Mental & Physical Health</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div> */}
                                    <small className="text-body-secondary">9 mins</small>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            <div className="col">
                            <div className="card shadow-sm">
                                {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail1</text></svg> */}
                                <iframe width="100%" height="225" src="https://www.youtube.com/embed/JVwLjC5etEQ?si=T4ONYb4vb6dY45xs" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                <div className="card-body">
                                <p className="card-text">How mindfulness meditation redefines pain, happiness & satisfaction | Dr. Kasim Al-Mashat</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div> */}
                                    <small className="text-body-secondary">9 mins</small>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col">
                            <div className="card shadow-sm">
                                {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail2</text></svg> */}
                                <iframe width="100%" height="225" src="https://www.youtube.com/embed/BbLFsQubdtw?si=H2Wq5FQ4NhT92Ndx" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                <div className="card-body">
                                <p className="card-text">Feed Your Mental Health | Drew Ramsey | TEDxCharlottesville</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div> */}
                                    <small className="text-body-secondary">9 mins</small>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col">
                            <div className="card shadow-sm">
                                {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail3</text></svg> */}
                                <iframe width="100%" height="225" src="https://www.youtube.com/embed/TFbv757kup4?si=TsIf1CbsUs0OsqN2" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                <div className="card-body">
                                <p className="card-text">The Secret of Becoming Mentally Strong | Amy Morin | TEDxOcala</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div> */}
                                    <small className="text-body-secondary">9 mins</small>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                </Carousel.Item>
            </Carousel>
            </div> 
            {/* <hr className='separator'/> */}
            <footer id="contact" className='bg-body-secondary'>
                <h2 className="display-6 fw-medium text-body-emphasis text-center py-5">Contact</h2>
                <div className="container d-flex flex-column flex-sm-row justify-content-center py-4 my-4 contact-card">
                    <div className="col-md-6 mb-3">
                    <form
                        className="w-75"
                        action=""
                        encType="multipart/form-data"
                        method="post">
                        <div className="row" />
                        <span className="contact-headline">
                        <h5>Send Email</h5>
                        </span>
                        <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com"
                            required=""
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="subject" className="form-label">
                            Subject
                        </label>
                        <textarea
                            className="form-control"
                            id="subject"
                            rows={1}
                            required=""
                            defaultValue={""}
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="message" className="form-label">
                            Message
                        </label>
                        <textarea className="form-control" id="message" rows={5} required="" defaultValue={""}/>
                        </div>
                        <a id="send" className="btn btn-primary" href="mailto:apurvagawande124@gmail.com" onClick={sendingEmail} type="submit" value="submit">
                        Send</a>
                    </form>
                    </div>
                    <div className="col-md-4 mb-3 justify-content-center">
                    <h6>📍 Fullerton, USA</h6>
                    <h6>
                        <i className="bi bi-envelope-at">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor"  className="bi bi-envelope-at" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                            <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                        </svg>
                        </i>{" "}
                        apurva.gawande@csu.fullerton.edu
                    </h6>
                    <br />
                    <ul className="nav col-md-4 justify-content-start list-unstyled d-flex">
                        <li className="ms-3">
                            <a className="bi bi-linkedin" href="https:www.linkedin.com/in/apurvagawande">
                                <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                </svg>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="text-body-secondary" href="https://www.github.com/ApurvaG04">
                                <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="d-flex justify-content-center py-5 border-top footer text-white">
                    <h6>💻 Developed by Apurva Gawande</h6>
                </div>
            </footer>           
        </div>
    );
};

export default Home;
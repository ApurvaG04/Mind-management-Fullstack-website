import { Link } from 'react-router-dom';
import './App.css';

const Home = () => {
    return (
        <div className='homepage background'>
            <span className='container align-middle'>
                <h1>Welcome to the Mind Care.</h1>
                <p>We help you to build a mindfulness routine in your life. Start your mindfulness jouney now.</p>
                <Link to="/signup">
                    <button className='w3-button w3-white w3-border w3-border-blue'>Start Now</button>
                </Link>
            </span>
        </div>
    );
};
export default Home;
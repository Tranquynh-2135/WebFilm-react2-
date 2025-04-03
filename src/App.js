import './App.css';
import Home from './pages/home.jsx';
import './assets/main.css';
import Login from './pages/login.jsx';
import SignUp from './pages/signup.jsx'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;

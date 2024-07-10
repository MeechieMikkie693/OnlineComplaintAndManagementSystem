import './App.css';
import SignUp from './SignUp/SignUp';
import Landing from './Landing/Landing';
import {BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/users' element={<SignUp/>}/>
      </Routes>
  </Router>
  );
}

export default App;
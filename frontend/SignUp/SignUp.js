// SignUp.js
import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [Id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Student');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const toggleRole = () => {
    setRole(role === 'Student' ? 'Employee' : 'Student');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(role==='Student'){
      try {
        const newUser = {
          studentId: Id,
          email: email,
          password: pass
        };
        const response = await axios.post('http://localhost:8000/students/users/signup', newUser);
        console.log('User created:', response.data);
        localStorage.setItem('userId', Id);
        navigate('/studentdashboard')
      // Optionally, you can redirect or show a success message
      } catch (error) {
        console.error('Error creating student:', error);
        // Handle error: Display an alert or set an error state
      }
    }
    if(role==='Employee'){
      try {
        const newUser = {
          employeeId: Id,
          email: email,
          password: pass
        };
        const response = await axios.post('http://localhost:8000/employees/users/signup', newUser);
        console.log('User created:', response.data);
        localStorage.setItem('userId', Id);
        navigate('/employeedashboard')
      // Optionally, you can redirect or show a success message
      } catch (error) {
        console.error('Error creating probsovler:', error);
        // Handle error: Display an alert or set an error state
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if(role==='Student'){
    try {
      if(Id==='admin' && pass==='1234'){
        navigate('/admindashboard')
      }
      const response = await axios.post(`http://localhost:8000/students/users/login`, {
        studentId:Id,
        password: pass,
      });
      console.log('User found:', response.data);
      localStorage.setItem('userId', Id);
      navigate(`/studentdashboard`);
    } catch (error) {
      console.error(`Error logging in ${role}:`, error.response ? error.response.data : error.message);
    }
  }
    if(role==='Employee'){
      try {
        if(Id==='admin' && pass==='1234'){
          navigate('/admindashboard')
        }
        const response = await axios.post(`http://localhost:8000/employees/users/login`, {
          employeeId:Id,
          password: pass,
        });
        console.log('User found:', response.data);
        localStorage.setItem('userId', Id);
        navigate(`/employeedashboard`);
      } catch (error) {
        console.error(`Error logging in ${role}:`, error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="form-container">
      <div className='spancontainer'> 
        <span className={isLogin ? 'Login' : 'Signup'} onClick={handleSignupClick} style={{width:"20"}}>
          Sign Up
        </span>&emsp;
        <span className={isLogin ? 'Signup' : 'Login'} onClick={handleLoginClick}>
          Login
        </span>
        </div>
        <div className='spancontainer'> 
        <div className='under-line'></div>
        </div>
        <div className="form-inner">
          <form className={isLogin ? 'login' : 'signup'} onSubmit={isLogin ? handleLogin : handleSignUp}>
            {isLogin ? (
              <>
              <div>
             <button className="btn role" style={{color:"white"}} type='button' value={role} onClick={toggleRole}>
               {role}
             </button>
             <div className='spancontainer'>
             <span style={{marginBottom: "20px"}}>(Click to change)</span>
             </div>
           </div>
                <div className="field">
                  <input type="text" style={{background:"#283c6e"}} placeholder="Id" value={Id} onChange={(e) => setId(e.target.value)} required />
                </div>
                <div className="field">
                  <input type="password" placeholder="Password" style={{background:"#283c6e"}} value={pass} onChange={(e) => setPass(e.target.value)} required />
                </div>
                  <button type="submit" className='btn' style={{backgroundColor:"#171717",color:"white"}}>LOG IN</button>
                <div className="signup-link">Create an account <a href="/" onClick={handleSignupClick}>Signup now</a></div>
              </>
            ) : (
              <>
              <div>
             <button className="btn role" style={{color:"white"}} type='button' value={role} onClick={toggleRole}>
               {role}
             </button>
             <div className='spancontainer'>
             <span style={{marginBottom: "20px"}}>(Click to change)</span>
             </div>
           </div>
                <div className="field">
                  <input type="text" style={{background:"#283c6e"}} placeholder="Id" value={Id} onChange={(e) => setId(e.target.value)} required />
                </div>
                <div className="field">
                  <input type="email" style={{background:"#283c6e"}} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="field">
                  <input type="password" style={{background:"#283c6e"}} placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} required />
                </div>
                {/* <div className="field">
                  <input type="password" placeholder="Confirm password" required />
                </div> */}                  
                  <button type="submit" className='btn' style={{backgroundColor:"#171717",color:"white"}}>SIGN UP</button>
                <div className="signup-link" style={{color:"#171717"}}>Already have an account? <a href="/" onClick={handleLoginClick}>Login</a></div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './SignUp.css';
// import { useNavigate} from 'react-router-dom';
// import { Card, Row, Col, Container ,Button} from 'react-bootstrap';
// import user_icon from '../Assets/person.png';
// import email_icon from '../Assets/email.png';
// import password_icon from '../Assets/password.png';

// export default function SignUp() {
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [Id, setId] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('Student');
//   const [pass, setPass] = useState('');

//   const navigate = useNavigate();

//   const showSignUp = () => {
//     setIsSignUp(true);
//   };

//   const showLogin = () => {
//     setIsSignUp(false);
//   };

//   const toggleRole = () => {
//     setRole(role === 'Student' ? 'Employee' : 'Student');
//   };


//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     if(role==='Student'){
//       try {
//         const newUser = {
//           studentId: Id,
//           email: email,
//           password: pass
//         };
//         const response = await axios.post('http://localhost:8000/students/users/signup', newUser);
//         console.log('User created:', response.data);
//         localStorage.setItem('userId', Id);
//         navigate('/studentdashboard')
//       // Optionally, you can redirect or show a success message
//       } catch (error) {
//         console.error('Error creating student:', error);
//         // Handle error: Display an alert or set an error state
//       }
//     }
//     if(role==='Employee'){
//       try {
//         const newUser = {
//           employeeId: Id,
//           email: email,
//           password: pass
//         };
//         const response = await axios.post('http://localhost:8000/employees/users/signup', newUser);
//         console.log('User created:', response.data);
//         localStorage.setItem('userId', Id);
//         navigate('/employeedashboard')
//       // Optionally, you can redirect or show a success message
//       } catch (error) {
//         console.error('Error creating probsovler:', error);
//         // Handle error: Display an alert or set an error state
//       }
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if(role==='Student'){
//     try {
//       if(Id=='admin' && pass=='1234'){
//         navigate('/admindashboard')
//       }
//       const response = await axios.post(`http://localhost:8000/students/users/login`, {
//         studentId:Id,
//         password: pass,
//       });
//       console.log('User found:', response.data);
//       localStorage.setItem('userId', Id);
//       navigate(`/studentdashboard`);
//     } catch (error) {
//       console.error(`Error logging in ${role}:`, error.response ? error.response.data : error.message);
//     }
//   }
//     if(role==='Employee'){
//       try {
//         if(Id=='admin' && pass=='1234'){
//           navigate('/admindashboard')
//         }
//         const response = await axios.post(`http://localhost:8000/employees/users/login`, {
//           employeeId:Id,
//           password: pass,
//         });
//         console.log('User found:', response.data);
//         localStorage.setItem('userId', Id);
//         navigate(`/employeedashboard`);
//       } catch (error) {
//         console.error(`Error logging in ${role}:`, error.response ? error.response.data : error.message);
//       }
//     }
//   };

//   return (
//     <div className="container mt-4" style={{borderRadius:"10px"}}>
//       <Card>
//         <Card.Body>
//         <Container className="mt-3">
//           <Row style={{fontSize:"40px"}}>
//           <Col className={isSignUp ? 'active' : 'inactive'} onClick={showSignUp} style={{width:"20"}}>
//             Sign Up
//           </Col>
//           <Col>
//           <span className={!isSignUp ? 'active' : 'inactive'} onClick={showLogin}>
//             Login
//           </span>
//           </Col>
//         <div className='underline'></div>
//         </Row>
//       {isSignUp ? (
//         <form onSubmit={handleSignUp}>
//           <div>
//             <button className="btn btn-dark" type='button' value={role} onClick={toggleRole}>
//               {role}
//             </button>
//             <span>(Click to change)</span>
//           </div>
//           <div>
//             <img src={user_icon} alt='' />
//             <input
//               type='text'
//               placeholder='Id'
//               className='Id'
//               value={Id}
//               onChange={(e) => setId(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <img src={email_icon} alt='' />
//             <input
//               type='email'
//               placeholder='Email Id'
//               className='email'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <img src={password_icon} alt='' />
//             <input
//               type='password'
//               placeholder='Password'
//               className='pass'
//               value={pass}
//               onChange={(e) => setPass(e.target.value)}
//               required
//             />
//           </div>
//           <div class="button-borders">
//             <button class="primary-button"> SIGN UP
//             </button>
//           </div>
//         </form>
//       ) : (
//         <form onSubmit={handleLogin}>
//           <div>
//             <button className="btn btn-dark" type='button' value="role" onClick={toggleRole}>
//               {role}
//             </button>
//             <span>(Click to change)</span>
//           </div>
//           <div>
//             <img src={user_icon} alt='' />
//             <input
//               type='text'
//               placeholder='Id'
//               className='Id'
//               value={Id}
//               onChange={(e) => setId(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <img src={password_icon} alt='' />
//             <input
//               type='password'
//               placeholder='Password'
//               className='pass'
//               value={pass}
//               onChange={(e) => setPass(e.target.value)}
//               required
//             />
//           </div>
//           <div >
//             Forgot Password? <span>Can't Change</span>
//           </div>
//           <button type='submit' className="btn btn-dark">
//             Login
//           </button>
//         </form>
       
//       )}
//       </Container>
//       </Card.Body>
//        </Card>
//     </div>
//   );
// }
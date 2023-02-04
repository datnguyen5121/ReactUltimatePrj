import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import {postLogin} from '../../services/apiService'
import {  toast } from 'react-toastify';
import {AiFillEye} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'
const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)

    const navigate = useNavigate();
    
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    const handleLogin = async() => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
            return
        }
        if (!password) {
            toast.error('Invalid password')
            return
        }
        //submit apis
        let data = await postLogin(email, password)
             if (data && +data.EC === 0) {
            toast.success(data.EM)
            navigate('/admins/manage-users')
            }

            if (data && +data.EC !== 0) {
            toast.error(data.EM)
            }
    }

    const handleNavigateRegister = () => {
            navigate('/register')
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className="login-container">
            <div className='header'>
                <span>
                    Dont have an account yet ?
                </span>
                <button onClick={() => handleNavigateRegister()}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Dat Nguyen
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this ?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                        <label>Email</label>
                        <input type={'email'} 
                        className="form-control"
                        value={email}
                        onChange={(event)=> setEmail(event.target.value)}/>
                </div>
                <div className='form-group password-container'>
                        <label>Password</label>
                        <input type={showPassword ? 'password' : 'text'} className="form-control"
                        value={password}
                        onChange={(event)=> setPassword(event.target.value)}
                        />
                        <div className='eye-toggle' onClick={() => handleShowPassword()}>
                            {showPassword ? <AiFillEye/> : <AiFillEyeInvisible/>} </div>
                        
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button 
                            className='btn-submit'
                            onClick={() => handleLogin()}
                            >Login to Dat Nguyen</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => {navigate('/')}}> &#60; Go to HomePage</span>
                </div>
            </div>
        </div>
    )
}
export default Login
import React, { /* useRef, */useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import axios from '../../../axios-auth';
//import axios from 'axios';



const Login = (props) => {

    const [auth, setAuth] = useAuth();
    const history = useHistory();

    //const inputRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    //const [valid, setValid] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`/accounts:signInWithPassword?`, {
                email,
                password,
                returnSecureToken: true,
            });
            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId,
            });
            history.push('/')
        } catch (ex) {
            if (ex.response.data.error.message === "EMAIL_NOT_FOUND") {
                setError('Nie ma takiego użytkownika!')
            } else if (ex.response.data.error.message === "INVALID_PASSWORD") {
                setError('Błędne dane')
            } else  setError('Błędne dane')
            setLoading(false);
        }
    }

    if (auth) {
        history.push('/');
    }

    return(
        <div className='container'>
            <h2>Logowanie</h2>
            {/* {valid === false ? (
                <div className='alert alert-danger'>Niepoprawne dane logowania</div>
            ) : null} */}
            <div 
                className='card'
                style={{minWidth: 400, width: '50%', margin: '30px auto'}}
            >
                <div 
                    className='card-body'>
                    <form onSubmit={submit}>
                        <div className='form-group'>
                            <label htmlFor='email-input'>Email</label>
                            <input
                                id='email-input'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label>Hasło</label>
                            <input 
                                type='password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='form-control' />
                        </div>
                       { error ? <div className='alert alert-danger'>
                            {error}
                        </div> : null}
                        <LoadingButton loading={loading}>Zaloguj</LoadingButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
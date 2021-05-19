//import { filter } from 'lodash';
import React, { useState, useEffect } from 'react';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import { validateEmail } from '../../../helpers/validations';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../axios-auth';
//import { set } from 'lodash';

const ProfileDetails = () => {

    const [auth, setAuth] = useAuth()
    const [email, setEmail] = useState(auth.email);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const [success, setSuccess] = useState('')

    const buttonDisabled = Object.values(errors).filter(x => x).length;

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                idToken: auth.token,
                email: email,
                returnSecureToken: true,
            };
            if (password) {
                data.password = password;
            }
            const res = await axios.post('/accounts:update', data);
            console.log(res);

            setAuth({
                email: res.data.email,
                password: res.data.password,
                token: res.data.idToken,
                userId: res.data.localId,
            });
            setSuccess('Dane zostały zmienione');
            setTimeout(() => {
                setSuccess('');
            }, 2000)
 
        } catch (ex) {
            console.log(ex.response)
        }
        setLoading(false);
    }

    useEffect(() => {
        if (validateEmail(email)) {
            setErrors({
                ...errors,
                email: '',
            })
        } else {
            setErrors({
                ...errors,
                email: 'Niepoprawny email',
            })
        }
    },[email]);

    useEffect(() => {
        if (password.length >= 4 || !password) {
            setErrors({
                ...errors,
                password: '',
            })
        } else {
            setErrors({
                ...errors,
                password: 'Wymagane 4 znaki',
            })
        }
    },[password]);

    return(
        <form onSubmit={submit}>
            <div className='form-group'>
                <label>Login</label>
                {success && <div className='alert alert-success'>{success}</div>}
                <input /* ref={inputRef} */
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`} />
                <div className='invalid-feedback'>
                    {errors.email}
                </div>
                <div className='valid-feedback'>
                    Wszystko gra!
                </div>
            </div>
            <div className='form-group'>
                <label>Hasło</label>
                <input 
                    type='password' 
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                <div className='invalid-feedback'>
                   {errors.password}
                </div>
            </div>
            <LoadingButton 
                loading={loading}
                disabled={buttonDisabled}
            >
                Zapisz
            </LoadingButton>
        </form>
    );
};

export default ProfileDetails;
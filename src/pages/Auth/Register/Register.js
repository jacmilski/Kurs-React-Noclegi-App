import React, { useState } from 'react';
import Input from '../../../components/Input/Input';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import { validate } from '../../../helpers/validations';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import axios from '../../../axios-auth';

function Register() {
    const history = useHistory();
    //console.log(history)
    const [loading, setloading] = useState(false);
    const [auth, setAuth] = useAuth();

    const [form, setForm] = useState({
        email: {
            value: '',
            error: '',
            showError: false,
            rules: ['required', 'email'],
        },
        password: {
            value: '',
            error: '',
            showError: false,
            rules: ['required'],
        },
    });

    const [error, setError] = useState('');

    const submit = async e => {
        e.preventDefault();
        setloading(true);

        try {
            const res = await axios.post(`/accounts:signUp?`, {
                email: form.email.value,
                password: form.password.value,
                returnSecureToken: true,
            });

            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId,
            });

            history.push('/');
            
        } catch (ex) {
            console.log(ex.response.data.error.message);
            let message = ex.response.data.error.message;
            
            switch(message) {
                case 'EMAIL_EXISTS': {
                    setError('Taki użytkownik istnieje!');
                };
                break;
                case 'WEAK_PASSWORD : Password should be at least 6 characters': {
                    setError('Słabe hasło, wymagane min. 6 znaków!');
                };
                break;
                default:
                    return '';
            }
        }
        setloading(false);
    };
    console.log(error)

    const changeHandler = (value, fieldName) => {
        const error = validate(form[fieldName].rules, value);

        setForm({
            ...form,
            [fieldName]: {
                ...form[fieldName],
                value,
                showError: true,
                error: error
            }
        });
    };

    const valid = !Object.values(form)
                    .map(input => input.error)
                    .filter(error => error).length;

    if (auth) {
        history.push('/');
    }

    return (
        <div className="card">
            <div className="card-header">Rejestracja</div>
            <div className="card-body">
                <p className="text-muted">Uzupełnij dane</p>

                <form onSubmit={submit}>

                    <Input
                        label="Email"
                        type='email'
                        value={form.email.value}
                        onChange={val => changeHandler(val, 'email')}
                        error={form.email.error}
                        showError={form.email.showError}
                    />

                    <Input
                        label="Hasło"
                        type='password'
                        value={form.password.value}
                        onChange={val => changeHandler(val, 'password')}
                        error={form.password.error}
                        showError={form.password.showError}
                    />

                    {error ? (
                        <div className='alert alert-danger'>{error}</div>
                    ) : null}

                    <div className="text-right">
                        <LoadingButton
                            loading={loading}
                            disabled={!valid}
                            className="btn-success">
                            Gotowe!
                        </LoadingButton>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Register;

//<script>
//  // Your web app's Firebase configuration
//  var firebaseConfig = {
//    apiKey: "AIzaSyA4riEazUu7wCjndPHNSjtAs__w6vBJZTQ",
//    authDomain: "kurs-react---noclegi.firebaseapp.com",
//    databaseURL: "https://kurs-react---noclegi-default-rtdb.europe-west1.firebasedatabase.app",
//    projectId: "kurs-react---noclegi",
//    storageBucket: "kurs-react---noclegi.appspot.com",
//    messagingSenderId: "8700354050",
//    appId: "1:8700354050:web:170ddb01d875399562111b"
//  };
//  // Initialize Firebase
//  firebase.initializeApp(firebaseConfig);
//</script>
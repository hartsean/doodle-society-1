import React, { useState } from 'react';
import './log-in.css'
import {GoogleLogin} from 'react-google-login';
import axios from 'axios';

const Login = ({ setUser }) => {
    const [ name, setName] = useState("");
    const [ url, setUrl] = useState("");
    const [load, setLoad] = useState(false);
    //  function to be called when google login succeeds
    const responseGoogle = (response) => {
        //  set page to loading state
        setLoad(true);
        //  display name and image of logged in user
        setName(response.profileObj.name);
        setUrl(response.profileObj.imageUrl);
        //  post user info
        axios.post('/api/users', response.profileObj)
            .then(id => axios.get(`/api/users/${id.data}`)) //  get the user who just logged in
            .then((user) => {
                setUser(user.data); //  set the user for the app
            })
            .catch(err => console.error(err));
    }

    return (
    <div className="login" >
        <h1>Doodle Society</h1>
        <div className="log-form">
        <h2>Login to continue</h2>
        <h3>{ name }</h3>
        <img src={url} alt={name}/>
            <div>
            {load && <img src={process.env.PUBLIC_URL + '/spinner.gif'} /> || (
            <GoogleLogin
                clientId="803513597131-pp5q6uea273cs7qtj6rmidaq4jptvpdq.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={() => console.log('failed to login')}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            )}       
            </div>
        </div>
    </div>
    )
};

export default Login

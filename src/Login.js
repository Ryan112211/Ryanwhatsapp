import { Button } from '@material-ui/core'
import React from 'react'
import { auth ,provider} from './firebase'
import "./Login.css"
import { actionTypes } from './Reducer'
import { useStateValue } from './StateProvider'
function Login() {
const [{user},dispatch]=useStateValue();
const signin=()=>{
auth.signInWithPopup(provider).then((result)=>
dispatch({
    type:actionTypes.SET_USER,
    user:result.user
}))
    .catch((error)=>
        alert(error.message)

    )

}
    return (

        <div className="login">
<div className="login__container">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""></img> 
    <div className="login__text">
        <h1>Sign In to Whatsapp</h1>
    </div>
    <Button type="submit" onClick={signin}>Sign In with Google</Button>

        </div>
        </div>
    )
}

export default Login

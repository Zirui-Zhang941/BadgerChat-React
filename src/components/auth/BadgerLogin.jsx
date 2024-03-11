import React from 'react';
import { useEffect, useState,useRef,useContext } from "react"
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogin() {

    // TODO Create the login component.
    //const[username,setUserName]=useState();
    //const [password,setPassword]=useState();
    const navigate = useNavigate();
    const userRef=useRef();
    const passRef=useRef();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const handleLogin=()=>{
        const username=(userRef.current.value);
        const password=(passRef.current.value);
        if(!username&&!password){
            alert(`You must provide both a username and password!`);
            return;
        }

        fetch(`https://cs571.org/api/s24/hw6/login`,{
            method: 'POST',
            credentials: "include",
            headers:{
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then(response => {
            console.log(response.status);
            if (response.ok) {
                // Store login status and user info in sessionStorage
                sessionStorage.setItem("logedin",JSON.stringify({ iflog: true, username }));
                console.log(sessionStorage.getItem(`logedin`));
                setLoginStatus({ iflog: true, username });
                navigate('/');
            }
            response.json().then(data => {
                alert(data.msg);
            });
        }).catch(error => {
            console.error('Error uploading file:', error);
        });
    }

    return <>
        <h1>Login</h1>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control type="text" id="username" placeholder="Username" ref={userRef} />

        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control type="password" id="password" placeholder="Password" ref={passRef} />
        
        <div style={{ marginTop: '20px' }}>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    </>
}

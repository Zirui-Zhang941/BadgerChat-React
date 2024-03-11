
import { Button } from 'react-bootstrap';
import React, { useEffect, useState,useRef } from "react"
import Form from 'react-bootstrap/Form';
export default function BadgerRegister() {

    // TODO Create the register component.
    const [username,setUserName]=useState();
    const [password,setPassword]=useState();
    const [repassword,setRepassword]=useState();
    const handleRegister=()=>{
        if(!username&&!password){
            alert(`You must provide both a username and password!`);
            return;
        }
        if(password!==repassword){
            alert(`Your passwords do not match!`);
            return;
        }

        fetch(`https://cs571.org/api/s24/hw6/register`,{
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
                alert('The registration was successful');
            } else if (response.status === 409) {
                alert('That username has already been taken!');
            } else if (response.status === 400 || response.status === 413) {
                alert('Error!');
            } else {
                alert('An unexpected error occurred. Please try again later.');
            }
        }).catch(error => {
            console.error('Error uploading file:', error);
        });
    }

    return <>
        <div>
        <h1>Register</h1>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control type="username" placeholder="Username" id='username'
        onChange={(e)=>setUserName(e.target.value)}
        />
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" id='password'
        onChange={(e)=>setPassword(e.target.value)}
        />
        <Form.Label htmlFor="Repeat Password">Repeat Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" id='repassword'
        onChange={(e)=>setRepassword(e.target.value)}
        />
        </div>
        <div style={{ marginTop: '20px' }}>
            <Button onClick={handleRegister}>Register</Button>
        </div>
        
    </>
}

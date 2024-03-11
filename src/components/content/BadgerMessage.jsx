import React from "react"
import { Card ,Button} from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);

    const handleDelete=()=>{
        props.handledelete();
    }
    console.log(props.isOwner);
    return <div key={props.key} id={props.key}>
    <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {props.isOwner && (
            <Button onClick={handleDelete}>
                Delete
            </Button>
        )}
    </Card>
    </div>
}

export default BadgerMessage;
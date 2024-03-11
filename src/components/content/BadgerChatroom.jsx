import React, { useEffect, useState ,useContext} from "react"
import { Col,Row,Pagination, Button } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import Form from 'react-bootstrap/Form';

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const [title,setTitle]=useState();
    const [content,setContent]=useState();

    console.log(loginStatus.username);
    const loadMessages = (page) => {
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            
            //console.log(messages[1].id);
            //const dt = new Date(messages.created);
            //console.log(messages[1].created.toLocaleDateString());
            //console.log(messages[1].created.toLocaleTimeString());
        })
    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(() => {
        loadMessages(currentPage);
    }, [currentPage, props]);

    const handlesubmit=()=>{
        if(!title||!content){
            alert(`You must provide both a title and content!`);
            return;
        }
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content
            })
        })
        .then(response => {
            if (response.ok) {
                alert("Successfully posted!");
                loadMessages(currentPage); // Reload latest messages
            } else {
                response.json().then(data => {
                    alert(data.msg);
                });
            }
        })
        
    }

    const handledelete=(id)=>{
        fetch(`https://cs571.org/api/s24/hw6/messages?id=${id}}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                
            }
        })
        .then(response => {
            response.json().then(data => {
                alert(data.msg);
                loadMessages(currentPage);//since asy have to load inside then
            });
        })
        
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            <div>
            {!loginStatus.iflog ? (
                <h3>You must be logged in to post!</h3>
            ) : (
                    <>
                        <Form.Label htmlFor="posttitle">Post Title</Form.Label>
                        <Form.Control
                            
                            placeholder="Title"
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Form.Label htmlFor="postcontent">Post Content</Form.Label>
                        <Form.Control
                            placeholder="Content"
                            id="content"
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div style={{ marginTop: '20px' }}>
                            <Button onClick={handlesubmit}>Submit</Button>
                        </div>
                    </>
            )}
            </div>
        }
        <hr/>
        {
            
            messages.length > 0 ?
                <>
                    {  
                        <Row xs={1} sm={2} md={3} lg={4}>
                            {messages.map(message => (
                                <Col key={message.id}> 
                                    <BadgerMessage 
                                        title={message.title}
                                        poster={message.poster}
                                        content={message.content}
                                        created={message.created}
                                        isOwner={message.poster==loginStatus.username}
                                        
                                        handledelete={() => handledelete(message.id)}
                                    />
                                </Col>
                            ))}
                    </Row>
                    }
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
                
        }
            <Pagination>
                <Pagination.Item active={currentPage==1} onClick={()=>setCurrentPage(1)}>1</Pagination.Item>
                <Pagination.Item active={currentPage==2} onClick={()=>setCurrentPage(2)}>2</Pagination.Item>
                <Pagination.Item active={currentPage==3} onClick={()=>setCurrentPage(3)}>3</Pagination.Item>
                <Pagination.Item active={currentPage==4} onClick={()=>setCurrentPage(4)}>4</Pagination.Item>
            </Pagination>
    </>
}

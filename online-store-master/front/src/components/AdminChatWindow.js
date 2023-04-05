import React,{useContext, useEffect, useRef, useState} from 'react'
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Box } from '@mui/system';
import Button from "react-bootstrap/Button";
import { Context } from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate, browserr, useHistory} from 'react-router-dom';
import { ADMIN_ROUTE } from '../utils/consts';


const AdminChatWindow = observer((props) => {

    const [messages, setMessages] = useState([]);
    const [value,setValue] = useState('');

const  history = useHistory()
    const {user} = useContext(Context)
    let socket = useRef(
        {
            socket: null,
            chatId: 0,
            email: '',
            userId: 0,
            event: "connection",
            userState:"wait"
        }
    )

    useEffect(() =>
    {
        connect();
        window.onpopstate =  (event)=>
        {
            beforeExit();
            socket.current.email = '';
            socket.current.userId = 0;
            socket.current.userState = 'wait';
            history.push(ADMIN_ROUTE)
        }

        window.onbeforeunload =  (event)=>
        {
            beforeExit();
            socket.current.email = '';
            socket.current.userId = 0;
            socket.current.userState = 'wait';
            history.push(ADMIN_ROUTE)

        }
    },[])





    const beforeExit = () =>
    {
        let message;
        message = {
            id: socket.current.chatId,
            userId: null,
            email: null,
            adminId: user.User.id ,
            adminname: props.adminId,
            event: 'close',
            state: "closed",
            from: "admin",
            to: "server"
        }
        socket.current.socket.send(JSON.stringify(message));
    }


    function connect()
    {
        socket.current.socket = new WebSocket('ws://localhost:5000/websockets')
        let message;
        socket.current.socket.onopen = () =>
        {
            message =
                {
                    id: props.id,
                    userId: null,
                    email: null,
                    adminId: user.User.id,
                    adminname: props.adminname,
                    event: 'adminEnter',
                    state: "answering",
                    from: "admin",
                    to: "server",
                    sendBySender:Date.now()
                }
            socket.current.socket.send(JSON.stringify(message))
        }

        socket.current.socket.onmessage = (event) =>
        {

            const message = JSON.parse(event.data);
            if(message.event === 'adminEnter')
            {
                socket.current.email = message.email;
                socket.current.userId = message.userId;
                socket.current.userState = "answering";
                socket.current.chatId = message.id

            }
            else if(message.event === 'close' && message.from === 'client')
            {
                window.alert("Пользователь отключился от чата.");
                let messageOut = {
                    id: null,
                    userId: socket.current.userId,
                    message: "Клиент отключён",
                    email: socket.current.email,
                    adminId: user.User.id,
                    adminname: props.adminname,
                    event: 'close',
                    state: "closed",
                    from: "admin",
                    to: "server",
                    sendBySender:Date.now()
                }
                socket.current.socket.send(JSON.stringify(messageOut))
                history.push(ADMIN_ROUTE);
            }

            setMessages(prev => [message, ...prev])
        }

        socket.current.socket.onclose= (event) =>
        {
            const message = JSON.parse(event.data)

            if(message.event === 'timerClosed')
            {
                window.alert("Чат был закрыт сервером по причине простоя");
                history.push(ADMIN_ROUTE);
            }
        }

        socket.current.socket.onerror = () =>
        {
            window.alert("Ошибка чата");
            history.push(ADMIN_ROUTE);
        }

    }

    const sendMessage = async () => {

        let message = {
            id: socket.current.chatId,
            message: value,
            userId: socket.current.userId,
            email: socket.current.email,
            adminId: user.User.id,
            adminname: props.adminname,
            event: 'message',
            state: socket.current.userState,
            from: 'admin',
            to: 'server',
            sendBySender:Date.now()
        }

        if(socket.current.userState === "answering")
            message.to = 'client'


        socket.current.socket.send(JSON.stringify(message));
        setValue('')
    }

    return (
        <Card className="p-4 w-50 h-100">
            <Card.Title> Чат технической поддержки.</Card.Title>
            <Card.Body className="pt-0 h-100 pb-1">
                <Container className="h-75  h-md-50  flex-column-reverse overflow-auto align-items-end d-flex m-3 mx-0 ">
                    {messages.map((mess,index) =>
                        <Box
                            key={index}
                            className={mess.from === 'admin'? " align-self-end neo mb-2 p-2 px-5" :  "mb-2 p-2 px-5 neo  align-self-start"}>
                            <Box>
                                {mess.from === 'client'? `${mess.email } : ` : `${mess.adminname} :`}
                            </Box>
                            <Box>
                                {mess.message}
                            </Box>
                        </Box>


                    )}
                </Container>
                <Form className="d-flex flex-column m-0">
                    <Row>
                        <Form.Control
                            className="mt-1"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            type="text"
                            placeholder="Введите сообщение"
                        />

                    </Row>
                    <Row className="d-flex my-3 pl-3 pr-3">
                        <Button
                            onClick={sendMessage}
                            className="w-25"
                        >
                            Отправить
                        </Button>
                    </Row>
                </Form>
            </Card.Body>

        </Card>
    )
})

export default AdminChatWindow
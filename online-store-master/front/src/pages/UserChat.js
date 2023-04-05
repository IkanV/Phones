import React, {useContext, useEffect, useRef, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Context } from "../index";
import UserChatWindow from '../components/UserChatWindow';
import { observer } from 'mobx-react-lite';
import AdminChatWindow from '../components/AdminChatWindow'
import { useParams } from 'react-router-dom';
const UserChat = observer(() =>
{

    const [connected, setConnected] = useState(false);
    const [email, setemail] = useState('')
    const [adminName, setAdminName] = useState('')
    const {id} = useParams();
    const {user} = useContext(Context);


    if (!connected)
    {
        return( <Container
                style={{height: window.innerHeight - 54}}
            >
                <Card style={{width: 500}} className="p-4 pb-0">
                    <Card.Body className="m-0 pb-1">
                        <Form className="d-flex flex-column m-0">
                            <Row>
                                {
                                    user.User.role === 'USER' ?
                                        <Form.Control
                                            className="mt-1"
                                            value={email}
                                            onChange={e => setemail(e.target.value)}
                                            type="text"
                                            placeholder="Введите имя: "
                                        />
                                        :
                                        <Form.Control
                                            className="mt-1"
                                            value={adminName}
                                            onChange={e => setAdminName(e.target.value)}
                                            type="text"
                                            placeholder="Выедите имя:"
                                        />
                                }


                            </Row>
                            <Row className="d-flex my-3">
                                <Button
                                    onClick={() => setConnected(true)}
                                    className="w-25"
                                >
                                    Войти
                                </Button>
                            </Row>
                        </Form>
                    </Card.Body>

                </Card>
            </Container>

        )
    }


    return (
        <Container

            className="my-3 m-0 p-0 "

        >
            {
                user.User.role === "USER" ?
                    <UserChatWindow email={email}/>
                    :
                    <AdminChatWindow adminname={adminName} id={id}/>

           }
        </Container>

    );
})

export default UserChat;
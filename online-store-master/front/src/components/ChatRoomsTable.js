import React, {useContext, useEffect,useState} from 'react';
import {Col, Container} from "react-bootstrap";
import QuestionAnswer from '@mui/icons-material/QuestionAnswer';
import Check from '@mui/icons-material/Check';
import { Box } from '@mui/system';
import {NavLink} from "react-router-dom"
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchChatRooms} from "../http/chatRoomsApi";
import Pages2 from "./Pages2";
import Table from 'react-bootstrap/Table'
import {Button} from "@mui/material";
import {INTO_CHAT_ROUTE, ORDERS_ROUTE} from '../utils/consts';

const ChatRoomsTable = observer(() =>
{
    const {chatRoom} = useContext(Context)
    const {finished,setFinished} = useState(false)

    useEffect(() =>
    {
        fetchChatRooms(chatRoom.page, chatRoom.limit,finished).then(data => {
            chatRoom.setChatRooms(data.rows)
            chatRoom.setTotalCount(data.count)
        })
    }, [chatRoom.page,chatRoom.totalCount])

    const getChatRooms = () => {
        fetchChatRooms(1, chatRoom.limit,finished).then(data =>
            {
                chatRoom.setChatRooms(data.rows)
                chatRoom.setTotalCount(data.count)
            }

        )
    }

    return (
        <Container >
            <Table striped bordered hover responsive className={" shadow"}>
                <thead className={"bg-light"}>
                <tr>
                    <th>email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {chatRoom !== undefined ?

                    chatRoom.chatRooms.map((chatRoom) =>
                        (<tr  key={chatRoom.id} style={!chatRoom.closedAt ? {backgroundColor:""} : {backgroundColor:""}}>
                            <td>{chatRoom.email}</td>

                            <td>
                                {!chatRoom.closedAt ?
                                    <NavLink to={INTO_CHAT_ROUTE + `/${chatRoom.id}`}>ответить</NavLink>
                                    :
                                    <Box className={"d-flex justify-content-center"}>
                                        <Check/>
                                        <div>Завершено</div>

                                    </Box>

                                }
                            </td>

                        </tr>)
                    )
                    :
                    <tr></tr>
                }
                </tbody>
                <tfoot className={"bg-white"}>
                <tr>

                    <td colSpan={8}>
                        <Pages2
                            totalCount={chatRoom.totalCount}
                            limit={chatRoom.limit}
                            pageO={chatRoom.page}
                            updateData ={(event, value) => chatRoom.setPage(value)}
                        />

                    </td>
                </tr>

                </tfoot>
            </Table>
        </Container>
    )
})

export default ChatRoomsTable
const ws = require('ws');
const {ChatRoom} = require('./models/models');

let rooms = {};
let pingTimer;
const leave = (room,userId) =>
{
    if(! rooms[room][userId])
        return;
    if(Object.keys(rooms[room]).length === 1)
        delete rooms[room];
    else
        delete rooms[room][userId];
};

async function webSocket(expressServer)
{
    const websocketServer = new ws.Server(
        {
            noServer: true,
            path :'/websockets'
        }, () => {
            console.log('WS-server started on 5000')
        }
    )

    expressServer.on("upgrade", (request, socket, head) =>
    {
        websocketServer.handleUpgrade(request, socket, head, (websocket) =>
        {
            websocketServer.emit("connection", websocket, request);
        });
    });

    websocketServer.on('connection', function connection(ws)
    {
        ws.on('message',async function receiveMessage(message)
            {
                messageIn = JSON.parse(message);
                let chatRoom = {};
                let messageOut = {};
                switch (messageIn.event)
                {
                    case 'message':
                    {
                        const userId = messageIn.userId;
                        const email = messageIn.email;

                        messageOut =
                            {
                                id: messageIn.id,
                                userId: userId,
                                email: email,
                                message: messageIn.message,
                                adminId: messageIn.adminId,
                                adminname: messageIn.adminname,
                                event: "message",
                                state: "wait",
                                from: messageIn.from,
                                to: messageIn.to,
                                sendBySender: messageIn.sendBySender,
                                receivedByServer: Date.now(),
                            }
                        Object.entries(rooms[messageIn.id]).forEach(([, sock]) => sock.send(JSON.stringify(messageOut)));
                        break;
                    }
                    case 'connection':
                    {

                        const userId = messageIn.userId;
                        const email = messageIn.email;

                        chatRoom = await ChatRoom.create({userId,email: email});
                        messageOut =
                            {
                                id: chatRoom.id,
                                userId: userId,
                                email: email,
                                message: messageIn.message,
                                adminId: null,
                                adminname: null,
                                event: "connection",
                                state: "wait",
                                from: messageIn.from,
                                to: messageIn.to,
                                sendBySender: messageIn.sendBySender,
                                receivedByServer: Date.now(),
                            }
                        if(! rooms[chatRoom.id]) rooms[chatRoom.id] = {};
                        if(! rooms[chatRoom.id][userId])rooms[chatRoom.id][userId] = ws;
                        Object.entries(rooms[chatRoom.id]).forEach(([, sock]) => sock.send(JSON.stringify(messageOut)));

                        break;
                    }
                    case 'adminEnter':
                    {

                        const adminId = messageIn.adminId;
                        const adminname = messageIn.adminname;
                        chatRoom = await ChatRoom.findOne({where: {id: messageIn.id}});
                        await ChatRoom.update({adminId},
                            {where:
                                    {
                                        id: messageIn.id
                                    }
                            });
                        messageOut =
                            {
                                id: chatRoom.id,
                                userId: chatRoom.userId,
                                email: chatRoom.email,
                                message: messageIn.message,
                                adminId: adminId,
                                adminname: adminname,
                                event: "adminEnter",
                                state: "answering",
                                from: messageIn.from,
                                to: messageIn.to,
                                sendBySender: messageIn.sendBySender,
                                receivedByServer: Date.now(),
                            }
                        if(! rooms[chatRoom.id]) rooms[chatRoom.id] = {};
                        if(! rooms[chatRoom.id][adminId])rooms[chatRoom.id][adminId] = ws;
                        Object.entries(rooms[chatRoom.id]).forEach(([, sock]) => sock.send(JSON.stringify(messageOut)));
                        break;
                    }
                    case 'close':
                    {
                        let closedAt = Date.now();
                        messageOut =
                            {
                                id: messageIn.id,
                                userId: messageIn.userId,
                                email: messageIn.email,
                                message: messageIn.message,
                                adminId: messageIn.adminId,
                                adminname: messageIn.adminname,
                                event: "close",
                                state: "closed",
                                from: messageIn.from,
                                to: messageIn.to,
                                sendBySender: messageIn.sendBySender,
                                receivedByServer: Date.now(),
                            }

                        if(messageIn.from === 'client')
                        {
                            ws.close(3000,'clientOut');
                            leave(messageIn.id,messageIn.userId);
                            closedAt =  new Date(closedAt).toUTCString();
                            await ChatRoom.update({closedAt},
                                {where:
                                        {
                                            id: messageIn.id
                                        }
                                });
                        }
                        else
                        {
                            ws.close(3001,'adminOut');
                            leave(messageIn.id,messageIn.adminId);
                        }
                        if(rooms[messageIn.id] != null)
                            Object.entries(rooms[messageIn.id]).forEach(([, sock]) => sock.send(JSON.stringify(messageOut)));

                        break;
                    }
                }
            }
        )
    })

    return websocketServer;
};

module.exports = {webSocket}



// const checkTimeOut = setInterval(() =>
// {
//     let del = false;
//     Object.entries(rooms).forEach((room) =>
//     {
//         Object.entries(room).forEach(([, sock]) =>
//         {
//             if(Date.now() - )
//         }
//         )
//     })
// },10000)




/* message =
{
    id: 0,
    userId: 1,
    email: "Александр",
    adminId: 1,
    adminname: "Ольга"
    event: "message",
    state: "answering",
    from: "client",
    to: "server"
} */
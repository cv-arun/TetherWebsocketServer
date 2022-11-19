
const axios = require('./axios')


const socketServer = (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('online', (data) => {
        console.log(data, socket.id, 'online')
        data.userId !== '' && axios.post('/registerOnline', { userId: data.userId, socketId: socket.id }).
            then(data => console.log('online'))
            .catch(err => console.log(err))
    })

    socket.on("join_room", ({ roomId }) => {
        socket.join(roomId);
        console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
    });

    socket.on('client-to-server', (chat) => {
        axios.post('/addChat', { chat })
            .then(data => console.log('chat added'))
            .catch(err => console.log(err))
        socket.to(chat.roomId).emit('server-to-client', chat);
    });

    socket.on('offline', (data) => {
        console.log(data, 'offline')

        data.userId !== '' && axios.post('/registerOffline', { userId: data.userId }, {
            headers: {
                Origin: 'http://localhost:4000',
                Referer: 'http://localhost:4000/'
            }
        }).
            then(data => console.log('ofline'))
            .catch(err => console.log(err))
    })


    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
}


module.exports = socketServer
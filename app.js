const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const userMobile = require("./models/usermodel");
app.use(cors());
require('./db/connection');
const path = require('path');
const userRoutes = require("./route/routes");
app.use("/api/users", userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const server = require('http').createServer(app);
const PORT = 5000;
const HOST = "192.168.29.65";
server.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
})

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {

    socket.on("callUser", (data) => {
        io.to(data.to).emit("incomingCall", {
          signal: data.signal,
          from: data.from,
        });
      });
    
      socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
      });

    socket.on('sendMessage', async (data) => {
        try {
            io.emit('receiveMessage', data);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

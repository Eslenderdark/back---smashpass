import express from 'express';
import http from 'http';
import { Server } from 'socket.io'; // Cambié 'socket.io' por 'Server'
import cors from 'cors';
import path from 'path';

const app = express();
const server = http.createServer(app);

// Cambié 'socket' por 'io' para evitar confusión
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist/chat-app')));

const users = new Set();

io.on('connection', (socket: any) => { // Aquí sigue 'socket' para cada cliente individual

    socket.on('join', (username: string) => {
        if (username) {
            socket.username = username;
            users.add(username);
            io.emit('user list', Array.from(users)); // Cambié 'socket.emit' por 'io.emit' para emitir a todos los clientes
            io.emit('user joined', username); // Esto también lo emitimos a todos los clientes
        }
    });

    socket.on('chat message', (msg: string) => {
        console.log("Mensaje recibido!");
        io.emit('chat message', { 
            username: socket.username,
            message: msg
        }); // Cambié 'socket.emit' por 'io.emit' para emitir a todos los clientes
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            users.delete(socket.username);
            io.emit('user list', Array.from(users)); // Emitir la lista de usuarios a todos
            io.emit('user left', socket.username); // Avisar a todos que un usuario ha salido
        }
    });
});

server.listen(port, () =>
    console.log(`App listening on PORT ${port}.`));

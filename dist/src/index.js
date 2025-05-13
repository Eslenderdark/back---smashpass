"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io"); // Cambié 'socket.io' por 'Server'
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Cambié 'socket' por 'io' para evitar confusión
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist/chat-app')));
const users = new Set();
io.on('connection', (socket) => {
    socket.on('join', (username) => {
        if (username) {
            socket.username = username;
            users.add(username);
            io.emit('user list', Array.from(users)); // Cambié 'socket.emit' por 'io.emit' para emitir a todos los clientes
            io.emit('user joined', username); // Esto también lo emitimos a todos los clientes
        }
    });
    socket.on('chat message', (msg) => {
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
server.listen(port, () => console.log(`App listening on PORT ${port}.`));

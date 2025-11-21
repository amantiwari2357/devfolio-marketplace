require('dotenv').config();
const app = require('./app');
const { createServer } = require('http');
const { Server } = require('socket.io');

const server = createServer(app);

// Socket.IO setup with CORS
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:8080",
      "http://localhost:8081",
      "http://localhost:3000",
      "https://devfolio-marketplace-seven.vercel.app",
      "devfolio-marketplace-acy2.vercel.app",
      "https://devfolio-marketplace-acy2.vercel.app",
      "https://devfolio-marketplace-5i6k-mbfsocci2.vercel.app",
      "https://devfolio-marketplace-5i6k.vercel.app",
      "https://devfolio-marketplace-1.onrender.com",
      process.env.CORS_ORIGIN
    ].filter(Boolean),
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinProject', (projectId) => {
    socket.join(`project_${projectId}`);
    console.log(`User ${socket.id} joined project ${projectId}`);
  });

  socket.on('leaveProject', (projectId) => {
    socket.leave(`project_${projectId}`);
    console.log(`User ${socket.id} left project ${projectId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io available globally for controllers
global.io = io;

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO server ready`);
});

export class SocketManager {
  constructor(io) {
    this.io = io;
    this.connections = new Map();
    this.rooms = new Map();
    this.setupSocketHandlers();
  }

  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);
      
      this.connections.set(socket.id, {
        socket,
        playerId: null,
        gameRoom: null,
        connectedAt: new Date()
      });

      socket.on('player:join', (data) => this.handlePlayerJoin(socket, data));
      socket.on('player:leave', () => this.handlePlayerLeave(socket));
      socket.on('game:join-room', (data) => this.handleJoinRoom(socket, data));
      socket.on('game:leave-room', () => this.handleLeaveRoom(socket));
      socket.on('game:update', (data) => this.handleGameUpdate(socket, data));
      socket.on('game:action', (data) => this.handleGameAction(socket, data));
      
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        this.handleDisconnect(socket);
      });
    });
  }

  handlePlayerJoin(socket, data) {
    const connection = this.connections.get(socket.id);
    if (connection) {
      connection.playerId = data.playerId;
      connection.playerName = data.playerName;
      
      socket.emit('player:joined', {
        playerId: data.playerId,
        playerName: data.playerName,
        connectedAt: connection.connectedAt
      });
      
      console.log(`Player ${data.playerName} (${data.playerId}) joined`);
    }
  }

  handlePlayerLeave(socket) {
    const connection = this.connections.get(socket.id);
    if (connection) {
      if (connection.gameRoom) {
        this.handleLeaveRoom(socket);
      }
      
      console.log(`Player ${connection.playerName} left`);
    }
  }

  handleJoinRoom(socket, data) {
    const connection = this.connections.get(socket.id);
    if (!connection) return;

    const roomId = data.roomId;
    
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        id: roomId,
        players: new Map(),
        gameState: null,
        createdAt: new Date(),
        gameType: data.gameType || 'unknown'
      });
    }

    const room = this.rooms.get(roomId);
    
    if (connection.gameRoom) {
      this.handleLeaveRoom(socket);
    }

    socket.join(roomId);
    connection.gameRoom = roomId;
    
    room.players.set(socket.id, {
      playerId: connection.playerId,
      playerName: connection.playerName,
      socketId: socket.id,
      joinedAt: new Date()
    });

    socket.emit('game:room-joined', {
      roomId,
      players: Array.from(room.players.values()),
      gameState: room.gameState
    });

    socket.to(roomId).emit('game:player-joined', {
      playerId: connection.playerId,
      playerName: connection.playerName
    });

    console.log(`Player ${connection.playerName} joined room ${roomId}`);
  }

  handleLeaveRoom(socket) {
    const connection = this.connections.get(socket.id);
    if (!connection || !connection.gameRoom) return;

    const roomId = connection.gameRoom;
    const room = this.rooms.get(roomId);
    
    if (room) {
      room.players.delete(socket.id);
      
      socket.to(roomId).emit('game:player-left', {
        playerId: connection.playerId,
        playerName: connection.playerName
      });

      if (room.players.size === 0) {
        this.rooms.delete(roomId);
        console.log(`Room ${roomId} deleted (empty)`);
      }
    }

    socket.leave(roomId);
    connection.gameRoom = null;
    
    console.log(`Player ${connection.playerName} left room ${roomId}`);
  }

  handleGameUpdate(socket, data) {
    const connection = this.connections.get(socket.id);
    if (!connection || !connection.gameRoom) return;

    const roomId = connection.gameRoom;
    const room = this.rooms.get(roomId);
    
    if (room) {
      room.gameState = { ...room.gameState, ...data };
      
      socket.to(roomId).emit('game:state-updated', {
        playerId: connection.playerId,
        update: data,
        timestamp: new Date()
      });
    }
  }

  handleGameAction(socket, data) {
    const connection = this.connections.get(socket.id);
    if (!connection || !connection.gameRoom) return;

    const roomId = connection.gameRoom;
    
    this.io.to(roomId).emit('game:action', {
      playerId: connection.playerId,
      action: data,
      timestamp: new Date()
    });
  }

  handleDisconnect(socket) {
    const connection = this.connections.get(socket.id);
    if (connection) {
      if (connection.gameRoom) {
        this.handleLeaveRoom(socket);
      }
      this.connections.delete(socket.id);
    }
  }

  broadcast(event, data) {
    this.io.emit(event, data);
  }

  broadcastToRoom(roomId, event, data) {
    this.io.to(roomId).emit(event, data);
  }

  getConnectedPlayers() {
    return Array.from(this.connections.values())
      .filter(conn => conn.playerId)
      .map(conn => ({
        playerId: conn.playerId,
        playerName: conn.playerName,
        socketId: conn.socket.id,
        gameRoom: conn.gameRoom,
        connectedAt: conn.connectedAt
      }));
  }

  getRoomInfo(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    return {
      id: room.id,
      players: Array.from(room.players.values()),
      gameState: room.gameState,
      createdAt: room.createdAt,
      gameType: room.gameType
    };
  }

  getAllRooms() {
    return Array.from(this.rooms.values()).map(room => ({
      id: room.id,
      playerCount: room.players.size,
      gameType: room.gameType,
      createdAt: room.createdAt
    }));
  }
}
import { MongoClient } from 'mongodb';

export class Database {
  constructor(connectionString = 'mongodb://localhost:27017', dbName = 'js-games') {
    this.connectionString = connectionString;
    this.dbName = dbName;
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(this.connectionString);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log(`Connected to MongoDB database: ${this.dbName}`);
      return this.db;
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('Database connection closed');
    }
  }

  getCollection(name) {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db.collection(name);
  }

  async createPlayer(playerData) {
    const players = this.getCollection('players');
    const result = await players.insertOne({
      ...playerData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result.insertedId;
  }

  async getPlayer(playerId) {
    const players = this.getCollection('players');
    return await players.findOne({ _id: playerId });
  }

  async updatePlayer(playerId, updateData) {
    const players = this.getCollection('players');
    const result = await players.updateOne(
      { _id: playerId },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      }
    );
    return result.modifiedCount > 0;
  }

  async saveScore(playerId, gameType, score, metadata = {}) {
    const scores = this.getCollection('scores');
    const result = await scores.insertOne({
      playerId,
      gameType,
      score,
      metadata,
      timestamp: new Date()
    });
    return result.insertedId;
  }

  async getHighScores(gameType, limit = 10) {
    const scores = this.getCollection('scores');
    return await scores.find({ gameType })
      .sort({ score: -1 })
      .limit(limit)
      .toArray();
  }

  async getPlayerScores(playerId, gameType = null, limit = 10) {
    const scores = this.getCollection('scores');
    const query = { playerId };
    
    if (gameType) {
      query.gameType = gameType;
    }
    
    return await scores.find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  }

  async createGameSession(sessionData) {
    const sessions = this.getCollection('game_sessions');
    const result = await sessions.insertOne({
      ...sessionData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result.insertedId;
  }

  async updateGameSession(sessionId, updateData) {
    const sessions = this.getCollection('game_sessions');
    const result = await sessions.updateOne(
      { _id: sessionId },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      }
    );
    return result.modifiedCount > 0;
  }

  async getGameSession(sessionId) {
    const sessions = this.getCollection('game_sessions');
    return await sessions.findOne({ _id: sessionId });
  }

  async deleteGameSession(sessionId) {
    const sessions = this.getCollection('game_sessions');
    const result = await sessions.deleteOne({ _id: sessionId });
    return result.deletedCount > 0;
  }

  async cleanup() {
    const sessions = this.getCollection('game_sessions');
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const result = await sessions.deleteMany({
      updatedAt: { $lt: cutoffTime }
    });
    
    console.log(`Cleaned up ${result.deletedCount} old game sessions`);
    return result.deletedCount;
  }
}
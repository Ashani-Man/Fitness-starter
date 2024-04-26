const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/fitness_trackr';

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;




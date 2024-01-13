import express, { Application } from 'express';
import dotenv from 'dotenv';
import * as path from 'path';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import cors from 'cors';

const app: Application = express();
dotenv.config({ path: path.join(process.cwd(), 'dist', '.env') });

const env = {
  port: process.env.PORT
}

app.use(bodyParser.json());
app.use(cors())

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

interface IGuest {
  firstName: string;
  lastName: string;
  email: string;
  rsvp: boolean;
  plusOne: boolean;
  totalCompanions: number;
}

app.post('/api/rsvp', async (req, res) => {
  try {
      const { firstName, lastName, email, rsvp, plusOne, totalCompanions }: IGuest = req.body;
      const result = await pool.query(
          'INSERT INTO guests (firstName, lastName, email, rsvp, plusOne, totalCompanions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [firstName, lastName, email, rsvp, plusOne, totalCompanions]
      );

      res.json(result.rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

if (env.port) {
  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
  });
} else {
  console.error(`Missing env variables`);
}
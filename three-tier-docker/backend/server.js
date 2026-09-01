const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get("/api/message", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT message FROM messages LIMIT 1"
        );

        res.json({
            message: result.rows[0].message
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.listen(3000, () => {
    console.log("Backend running on port 3000");
});
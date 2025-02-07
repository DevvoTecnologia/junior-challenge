//
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

//
import { createUser } from "./routes/createUser"
import { userLogin } from "./routes/userLogin"
import { createRingForUser } from "./routes/createRing"
import { getUserRings } from "./routes/getUserRings"
import { deleteRingById } from "./routes/deleteRingByID"
import { updateRing } from "./routes/updateRingByID"
import { getUsersWithRings } from "./routes/getUsersWithRings"
import { deleteAllUsers } from "./routes/deleteAllUsers"

//
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

//
app.use(cors())
app.use(express.json())

// Rotas
//GET
app.get("/", (req, res) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Servidor NodeJS E-Bordados</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #f0f0f0;
                    }
                    .container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 5px;
                        text-align: center;
                        padding: 30px 20px;
                        background: white;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        border-radius: 8px;
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: #666;
                    }
                    .spinner {
                        border: 4px solid rgba(0, 0, 0, 0.1);
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        border-left-color: #333;
                        animation: spin 1s ease infinite;
                    }
                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Servidor NodeJS</h1>
                    <p>O servidor está funcionando corretamente, na porta: ${PORT}</p>
                    <div class="spinner"></div>
                </div>
            </body>
        </html>
    `
    res.send(htmlContent)
})
app.get("/api/get-user-rings/:user_email", getUserRings)
app.get("/api/get-users-rings", getUsersWithRings)

//DELETE
app.delete("/api/delete-ring", deleteRingById)
//app.delete("/api/delete-all-users", deleteAllUsers)

//PUT
app.put("/api/update-ring/:user_id/:ring_id", updateRing)

//POST
app.post("/api/create-user", createUser)
app.post("/api/login", userLogin)
app.post("/api/create-ring", createRingForUser)

//
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}: http://localhost:${PORT}`)
})

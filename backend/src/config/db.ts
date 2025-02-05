const { Pool } = require("pg")
require("dotenv").config()

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
})

pool.connect()
  .then(() => console.log("Conectado ao banco de dados com sucesso!"))
  .catch((error: any) => console.error("Erro ao conectar ao banco de dados:", error))

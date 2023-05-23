import mysql from "mysql2"

export const db = mysql.createConnection({
  host:"172.20.0.1",
  user:"wce",
  password:"wce",
  database:"social"
})

import mysql from "mysql"

export const db = mysql.createConnection({
  host:"172.18.0.1",
  user:"wce",
  password:"wce",
  database:"social"
})

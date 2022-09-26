import { query } from "../index.js";

const sqlString = `CREATE TABLE IF NOT EXISTS notes(

  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  longitude DECIMAL,
  latitude DECIMAL,
  title VARCHAR,
  category VARCHAR,
  img_url VARCHAR,
  description VARCHAR,
  user_email VARCHAR
    );`;

export async function createNotesTable() {
  const res = await query(sqlString);
  console.log(res.command);
}
createNotesTable();

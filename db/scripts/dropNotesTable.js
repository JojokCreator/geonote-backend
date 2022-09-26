import { query } from "../index.js";

const sqlString = `DROP TABLE IF EXISTS notes;`;

export async function dropNotesTable() {
  const res = await query(sqlString);
  console.log(res.command);
}
dropNotesTable();

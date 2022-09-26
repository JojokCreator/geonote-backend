import { query } from "../index.js";

const sqlString = `DROP TABLE IF EXISTS events;`;

export async function dropEventsTable() {
  const res = await query(sqlString);
  console.log(res.command);
}
dropEventsTable();

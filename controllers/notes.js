import { query } from "../db/index.js";

//Gets all the notes from the database (GET)
export const getNotes = async () => {
	const data = await query(`SELECT * FROM notes;`);
	return data.rows;
};
//Creates a new Notes (POST)
export const createNote = async (newNote) => {
	const {
		id,
		longitude,
		latitude,
		title,
		category,
		img_url,
		description,
		user_email,
	} = newNote;
	const data = await query(
		`INSERT INTO notes (id,
			longitude,
			latitude, 
			title,
			category,
			img_url,
			description,
			user_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;`,
		[
			id,
			longitude,
			latitude,
			title,
			category,
			img_url,
			description,
			user_email,
		]
	);
	return data.rows;
};

// UPDATE AN Notes BY ID (PATCH)
export const updateNote = async (updatedNote, id) => {
	const {
		id,
		longitude,
		latitude,
		title,
		category,
		img_url,
		description,
		user_email,
	} = updatedNote;
	const NoteUpdate = await query(
		`SELECT * FROM notes WHERE notes_id = ${id}`
	);
	if (longitude) {
		await query(
			`UPDATE notes SET longitude = $1 WHERE longitude = ${id};`,
			[longitude]
		);
	}
	if (latitude) {
		await query(
			`UPDATE notes SET latitude = $1 WHERE latitude = ${id};`,
			[latitude]
		);
	}

	if (title) {
		await query(`UPDATE notes SET title = $1 WHERE notes_id = ${id};`, [
			title,
		]);
	}
	if (category) {
		await query(`UPDATE notes SET category = $1 WHERE notes_id = ${id};`, [
			category,
		]);
	}
	if (img_url) {
		await query(`UPDATE notes SET img_url = $1 WHERE notes_id = ${id};`, [
			img_url,
		]);
	}
	if (description) {
		await query(`UPDATE notes SET description = $1 WHERE notes_id = ${id};`, [
			description,
		]);
	}
	if (couser_emailst) {
		await query(`UPDATE notes SET user_email = $1 WHERE notes_id = ${id};`, [user_email]);
	}
	if (NoteUpdate) {
		return NoteUpdate.rows;
	}
};

//Search by Notes ID (GET)
export const getNoteById = async (id) => {
	const data = await query(`SELECT * FROM notes WHERE notes_id = $1;`, [id]);
	return data.rows;
};

//Delete an Notes by id (DELETE)
export async function deleteNote(id) {
	const data = await query(
		`DELETE FROM notes WHERE notes_id = $1 RETURNING *`,
		[Number(id)]
	);
	return data.rows; a1
}

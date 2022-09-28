import { query } from "../db/index.js";
import { generateSignedURL } from "../s3.js";
//Gets all the notes from the database (GET)
export const getNotes = async () => {
	const data = await query(`SELECT * FROM notes;`);
	return data.rows;
};
//Creates a new Notes (POST)
export const createNote = async (newNote) => {
	let {
		id,
		longitude,
		latitude,
		title,
		category,
		img_url,
		description,
		user_email,
	} = newNote;

	try {
		const data = await query(
			`INSERT INTO notes (
				longitude,
				latitude, 
				title,
				category,
				img_url,
				description,
				user_email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
			[
				
				longitude,
				latitude,
				title,
				category,
				img_url = await generateSignedURL(img_url),
				description,
				user_email,
			]
		);
		console.log(data);
		return data.rows;
	} catch (error) {
		console.log(error);
	}
	
};

// UPDATE AN Notes BY ID (PATCH)
export const updateNote = async (updatedNote, id) => {
	const {
		longitude,
		latitude,
		title,
		category,
		img_url,
		description,
		user_email,
	} = updatedNote;
	const NoteUpdate = await query(
		`SELECT * FROM notes WHERE id = ${id}`
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
		await query(`UPDATE notes SET title = $1 WHERE id = ${id};`, [
			title,
		]);
	}
	if (category) {
		await query(`UPDATE notes SET category = $1 WHERE id = ${id};`, [
			category,
		]);
	}
	if (img_url) {
		await query(`UPDATE notes SET img_url = $1 WHERE id = ${id};`, [
			img_url,
		]);
	}
	if (description) {
		await query(`UPDATE notes SET description = $1 WHERE id = ${id};`, [
			description,
		]);
	}
	if (couser_emailst) {
		await query(`UPDATE notes SET user_email = $1 WHERE id = ${id};`, [user_email]);
	}
	if (NoteUpdate) {
		return NoteUpdate.rows;
	}
};

//Search by Notes ID (GET)
export const getNoteById = async (id) => {
	const data = await query(`SELECT * FROM notes WHERE id = $1;`, [id]);
	return data.rows;
};

//Delete an Notes by id (DELETE)
export async function deleteNote(id) {
	const data = await query(
		`DELETE FROM notes WHERE id = $1 RETURNING *`,
		[Number(id)]
	);
	return data.rows; a1
}

import express from "express";

import {
	getNotes,
	createNote,
	deleteNote,
	updateNote,
	getNoteById,
} from "../controllers/notes.js";

const notesRouter = express.Router();

// GET ALL Note (GET)
notesRouter.get("/notes", async (req, res) => {
	const result = await getNotes();
	res.json({ Success: true, Payload: result });
});

// //GET Note BY ID
notesRouter.get("/notes/:id", async (req, res) => {
	const id = Number(req.params.id);
	const result = await getNoteById(id);
	res.json({ Success: true, Payload: result });
});

// //CREATE A NEW Note (POST)
notesRouter.post(
	"/notes",async (req, res) => {
		const newNote = req.body;
		const result = await createNote(newNote);
		res.json({ Success: true, Payload: result });
	}
);

// //UPDATE Note DETAILS (PATCH)
notesRouter.patch("/notes/:id", async (req, res) => {
	const id = Number(req.params.id);
	const updatedNote = req.body;
	const result = await updateNote(updatedNote, id);
	res.json({ Success: true, Payload: result });
});

//DELETE AN Note (DELETE)

notesRouter.delete("/notes/:id", async (req, res) => {
	const id = Number(req.params.id);
	const result = await deleteNote(id);
	res.json({ Success: true, Payload: result });
});
export default notesRouter;
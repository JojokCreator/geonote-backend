import { query } from "../index.js";

export async function populateNotes() {
    const res = await query(
        `INSERT INTO notes (		
                longitude,
                latitude,
                title,
                category,
                img_url,
                description,
                user_email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
        [52.479780, -1.897950, 'Note here', 'action','http://image.jpg','This is description', 'heloo@gmail.com'
        ]
    );
    console.log(res.rows[0])
}

populateNotes();

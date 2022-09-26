import { query } from "../index.js";

export async function populateEvents() {
        const res = await query (
            `INSERT INTO events (img_url, name_of_event, event_host, name_of_event_host, start_time, end_time, description,cost, house_number, street_address, town, region, postcode, lat, long, userAttending) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;`,
             ['https://pbs.twimg.com/profile_images/1408775037998469121/tzArk3Rr_400x400.jpg', 'Brum JS', 2, 'Brum JS Host', '2023-07-19 10:30:00', '2023-07-19 13:30:00', 'Talk about Javascript', 0, '27', 'Cannon street', 'Birmingham', 'West Midlands', 'B2 5EP', 
             52.479780, -1.897950, 1
            ]
        );
        console.log(res.rows[0])
    }

populateEvents();

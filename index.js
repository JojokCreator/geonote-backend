import express from 'express';
import cors from 'cors';
import { generateUploadURL } from './s3.js'
import notesRoutes from './routes/notes.js';

const app = express();
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})

app.use('/', notesRoutes);

app.get('/', cors(), (req, res) => {
  res.json({
      message: 'Hello Welcome to Geonotebook server!',
  });
});



app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
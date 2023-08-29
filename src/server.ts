import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fetchOpenAIData } from './api'; // Assuming this is the file where you defined the function

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/webhook', async (req, res) => {
  const { query } = req.body;
  try {
    const data = await fetchOpenAIData(query);
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

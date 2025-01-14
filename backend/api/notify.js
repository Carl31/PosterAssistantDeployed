import readJsonFile from '../utils/readJsonFile.js';
import connectDB from '../utils/db.js'; // import the db connection
const ngrokURL = process.env.NGROK_URL;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const receivedData = req.body;
      const objectId = receivedData.objectId;

      console.log('Received response from local server:', objectId);

      // Connect to DB
      await connectDB();

      // Upload JSON to MongoDB
      const output = await readJsonFile(objectId);
      
      res.send({ message: 'Process initiated successfully' });
    } catch (err) {
      console.error('Error processing request:', err);
      res.status(500).send({ error: 'Failed to process request', details: err.message });
    }
  } else if (req.method === 'OPTIONS') {
    // Handle the preflight request
    res.setHeader('Access-Control-Allow-Origin', `${process.env.FRONTEND_URL}`); // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.status(200).end(); // Respond with 200 OK and terminate the response
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}
import axios from 'axios';
import connectDB from '../utils/db.js'; // import the db connection
import uploadJsonContent from '../utils/uploadJsonContent.js';

//const ngrokURL = 'https://your-ngrok-url.com'; // Replace with your actual ngrok URL
const ngrokURL = process.env.NGROK_URL;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const receivedJson = req.body;

      // Connect to DB
      await connectDB();

      // Upload JSON to MongoDB
      const objectId = await uploadJsonContent(receivedJson);

      // Send object ID to the local server
      const localServerApi = `https://"${ngrokURL}/process-object`;
      const response = await axios.post(localServerApi, { objectId });

      console.log('Received response from local server:', response.data);
      res.send({ message: 'Process initiated successfully', localResponse: response.data });
    } catch (err) {
      console.error('Error processing request:', err);
      res.status(500).send({ error: 'Failed to process request', details: err.message });
    }
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}

import axios from 'axios';
import connectDB from '../utils/db.js'; // import the db connection
import uploadJsonContent from '../utils/uploadJsonContent.js';

//const ngrokURL = 'https://your-ngrok-url.com'; // Replace with your actual ngrok URL
const ngrokURL = process.env.NGROK_URL;

export default async function handler(req, res) {
  if (req.method === 'GET') { // FIXME: should be a POST but doesnt work with vercel for some reason
    try {
      const receivedJson = req.query.json;
      console.log('Test:', req.query);

      // Connect to DB
      await connectDB();

      // Upload JSON to MongoDB
      const objectId = await uploadJsonContent(receivedJson);

      // Send object ID to the local server without waiting for a response
      const localServerApi = `https://${ngrokURL}/process-object`;
      await axios.post(localServerApi, { objectId })
        .then(() => {
          console.log('Notified local server successfully');
        })
        .catch(err => {
          console.error('Error notifying local server:', err);
          // Notify self-hosted error route
          axios.post(`https://${process.env.DEPLOYED_SERVER_URL}/api/error`, { errReason: 'Failed to notify local server' });
        });

      // Respond to the client immediately
      res.send({ message: 'Process initiated successfully', objectId });
    } catch (err) {
      console.error('Error processing request:', err);
      res.status(500).send({ error: 'Failed to process request', details: err.message });
    }
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}


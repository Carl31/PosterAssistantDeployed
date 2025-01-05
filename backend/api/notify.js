const readJsonFile = require('../utils/readJsonFile');
const ngrokURL = process.env.NGROK_URL;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const receivedData = req.body;
      const objectId = receivedData.objectId;

      console.log('Received response from local server:', response.data);

      // Connect to DB
      await connectDB();

      // Upload JSON to MongoDB
      const output = await readJsonFile(objectId);
      
      res.send({ message: 'Process initiated successfully' });
    } catch (err) {
      console.error('Error processing request:', err);
      res.status(500).send({ error: 'Failed to process request', details: err.message });
    }
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}
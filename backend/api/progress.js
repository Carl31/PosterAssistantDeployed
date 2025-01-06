const ngrokURL = process.env.NGROK_URL;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const receivedData = req.body;
      const update = receivedData.status;

      // Log the progress update
      console.log('Progress update from local server:', update);

      // Respond immediately to acknowledge the update
      res.send({ message: 'Progress update received successfully' });
    } catch (err) {
      console.error('Error processing request:', err);
      res.status(500).send({ error: 'Failed to process request', details: err.message });
    }
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}

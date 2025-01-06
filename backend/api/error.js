const ngrokURL = process.env.NGROK_URL;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const receivedData = req.body;
      const errReason = receivedData.errReason;
    // Do something with the error reason? Make it show on frontend?

      console.log('Error from local server:', errReason);
      
      //res.send({ message: 'Process initiated successfully' });
    } catch (err) {
      console.error('Error processing request:', err);
      res.status(500).send({ error: 'Failed to process request', details: err.message });
    }
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}
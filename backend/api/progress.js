const ngrokURL = process.env.NGROK_URL;
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL2
];

let progressUpdates = []; // Stores all progress updates
let lastIndex = 0; // Keeps track of the last sent index for polling
let lastUpdated = Date.now();

export default async function handler(req, res) {
  if (req.method === 'POST') {

    // Handle the preflight request
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      //testing: console.log("Allowed origin:", origin);
    } // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    try {
      const receivedData = req.body;
      const update = receivedData.status;

      // Log the progress update
      console.log('Progress update from local server:', update);
      progressUpdates.push(update);
      lastUpdated = Date.now();

      // Respond immediately to acknowledge the update
      res.send({ message: 'Progress update received successfully' });
    } catch (err) {
      console.error('Error processing request:', err);
      res.status(500).send({ error: 'Failed to process request', details: err.message });
    }
  } else if (req.method === 'GET') {
    // Handle the preflight request
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      //testing: console.log("Allowed origin:", origin);
    } // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (lastIndex < progressUpdates.length) {
      // Get all new messages since last poll
      const newMessages = progressUpdates.slice(lastIndex);
      lastIndex = progressUpdates.length; // Update last index
    }

    res.json({ messages: progressUpdates, timestamp: lastUpdated });


  } else if (req.method === 'OPTIONS') {
    /// Handle the preflight request
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      //testing: console.log("Allowed origin:", origin);
    } // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).end(); // Respond with 200 OK and terminate the response
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}
const ngrokURL = process.env.NGROK_URL;
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL2
];

let clients = [];

// Function to send updates to all clients
const sendUpdate = (update) => {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify({ status: update })}\n\n`);
  });
};

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

      sendUpdate(update); // Send update to frontend

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

    // For progress updates to frontend:
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Immediately send a "connected" message
    res.write("event: connected\ndata: Connected to SSE\n\n");

    clients.push(res); // Store client connection

    // Remove disconnected clients
    req.on("close", () => {
      clients = clients.filter(client => client !== res);
      console.log("Client disconnected from SSE");
    });

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
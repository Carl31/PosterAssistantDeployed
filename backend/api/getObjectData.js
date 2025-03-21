import readJsonFile from '../utils/readJsonFile.js';
import connectDB from '../utils/db.js'; // import the db connection
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL2
  ];

export default async function handler(req, res) {
    if (req.method === 'GET') {

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
            // For testing
            //console.log('Request Query:', req.query);

            const objectID = req.query.objectID
            if (!objectID) {
                return res.status(400).send({ error: 'objectID is required' });
            }

            console.log('Received response from local server:', objectID);

            // Connect to DB
            await connectDB();

            // Upload JSON to MongoDB
            const output = await readJsonFile(objectID);

            res.status(200).json(output);
        } catch (err) {
            res.status(500).send({ error: 'Error fetching file', details: err.message });
        }
    } else if (req.method === 'OPTIONS') {
        // Handle the preflight request
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
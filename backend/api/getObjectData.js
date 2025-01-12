import readJsonFile from '../utils/readJsonFile.js';
import connectDB from '../utils/db.js'; // import the db connection

export default async function handler(req, res) {
    if (req.method === 'GET') {
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
    } else {
        res.status(405).send({ message: 'Method Not Allowed' });
    }
}
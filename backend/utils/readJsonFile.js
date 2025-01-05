import fs from 'fs';
import File from '../models/File.js'; // mongoose schema

// read file from db
async function readJsonFile(fileId) {
    try {
        // Find the file by its ID
        const file = await File.findById(fileId);
        if (!file) {
            console.error('File not found!');
            return;
        }

        // Decode the binary data and parse it as JSON
        const jsonData = JSON.parse(file.data.toString());
        console.log('Reading JSON from MongoDB (' + fileId + '):\nDecoded JSON data:', jsonData);

        return jsonData;
    } catch (err) {
        console.error('Error reading JSON file:', err);
    }
}

module.exports = readJsonFile;
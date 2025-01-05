const fs = require('fs');
const File = require('../models/File'); // mongoose schema

// Upload JSON content to MongoDB and return its ID
async function uploadJsonContent(jsonContent) {
    try {
        // Ensure the JSON content is converted to a Buffer
        const jsonBuffer = Buffer.from(JSON.stringify(jsonContent));

        // Create a new file document
        const file = new File({
            name: 'appConfig.json',
            data: jsonBuffer, // Store as Buffer
            type: 'application/json',
        });

        // Save the file to the database
        const savedFile = await file.save();

        // Log and return the file's _id
        console.log('JSON file saved successfully to MongoDB:', savedFile._id);
        return savedFile._id; // Return the generated _id
    } catch (err) {
        console.error('Error saving file content:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
}

module.exports = uploadJsonContent;

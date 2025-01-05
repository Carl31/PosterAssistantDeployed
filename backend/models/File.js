import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: String,
    path: String, // If storing metadata
    data: Buffer, // If storing file content
    type: String,
    createdAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', FileSchema);

export default File;  // Ensure the File model is exported as the default

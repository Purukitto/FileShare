// Import the 'mongoose' library
const mongoose = require("mongoose");

// Define the 'File' schema
const File = new mongoose.Schema({
	// 'path' represents the file's storage location, it is a required field
	path: { type: String, required: true },

	// 'originalName' holds the original name of the uploaded file, required field
	originalName: { type: String, required: true },

	// 'password' stores the hashed password for password-protected files, optional field
	password: String,

	// 'downloadCount' keeps track of the number of times the file has been downloaded, default is 0
	downloadCount: { type: Number, default: 0, required: true },
});

// Create and export the 'File' model
module.exports = mongoose.model("File", File);

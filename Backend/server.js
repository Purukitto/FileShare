// Load environment variables from the .env file
require("dotenv").config();

// Import required modules and libraries
const File = require("./models/File.js");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
var cors = require("cors");

// Create an instance of Express
const app = express();
app.use(cors());

// Middleware to parse incoming JSON data and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup multer to handle file uploads and store them in the 'uploads' directory
const upload = multer({ dest: "uploads" });

// Connect to the MongoDB database using the URL from the .env file
mongoose.connect(process.env.DATABASE_URL);

// Define a route for handling file uploads
app.post("/upload", upload.single("file"), async (req, res) => {
	// Extract information about the uploaded file and create a data object
	const fileData = {
		path: req.file.path,
		originalName: req.file.originalname,
	};

	// Check if a password is provided for the file, and if so, hash it using bcrypt
	if (req.body.password != null && req.body.password != "")
		fileData.password = await bcrypt.hash(req.body.password, 10);

	// Create a new file record in the database using the 'File' model
	const file = await File.create(fileData);

	// Log the details of the uploaded file
	console.log("File uploaded " + file.id + " " + file.originalName);

	// Respond with JSON containing the file ID and original name
	res.json({
		fileId: file.id,
		fileName: file.originalName,
	});
});

// Define a route for routing to the correct page for a file by its ID
app.route("/download/:id").get(async (req, res) => {
	// Find the file in the database using the provided ID
	const file = await File.findById(req.params.id);

	// Replace any spaces in the 'name' query parameter with underscores
	req.query.name = req.query.name.replace(/ /g, "_");

	// If the file is password-protected, redirect to the appropriate URL
	if (file.password != null) {
		return res.redirect(
			308,
			process.env.CLIENT_URL +
				"/file/" +
				req.params.id +
				"?name=" +
				req.query.name +
				"&protected=true"
		);
	}

	// If the file is not password-protected, redirect to the appropriate URL
	return res.redirect(
		308,
		process.env.CLIENT_URL +
			"/file/" +
			req.params.id +
			"?name=" +
			req.query.name
	);
});

// Define a route for downloading a file by its ID and optional password
app.route("/file/:id/:password?").get(async (req, res) => {
	// Find the file in the database using the provided ID
	const file = await File.findById(req.params.id);

	// If the file is password-protected, handle password validation
	if (file.password != null) {
		// If no password is provided, redirect to the file download page
		if (req.query.password == undefined) {
			return res.redirect(
				303,
				process.env.CLIENT_URL + "/file/" + req.params.id
			);
		} else {
			// If a password is provided, compare it with the stored hash
			if (!(await bcrypt.compare(req.query.password, file.password))) {
				// If passwords don't match, respond with an "Unauthorized" status
				return res.status(401).send("Incorrect password");
			}
		}
	}

	// Increment the download count for the file and save it to the database
	file.downloadCount++;
	await file.save();
	console.log(
		"File " + file.id + " downloaded: " + file.downloadCount + " times"
	);

	// Respond with the file download
	res.download(file.path, file.originalName);
});

// Start the server and listen on the specified port or default to port 3000
app.listen(process.env.PORT || 3000);
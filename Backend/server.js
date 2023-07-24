require("dotenv").config();

const File = require("./models/file");

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
var cors = require("cors");

const app = express();

var corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads" });

mongoose.connect(process.env.DATABASE_URL);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.post(
	"/upload",
	cors(corsOptions),
	upload.single("file"),
	async (req, res) => {
		const fileData = {
			path: req.file.path,
			originalName: req.file.originalname,
		};
		if (req.body.password != null && req.body.password != "")
			fileData.password = await bcrypt.hash(req.body.password, 10);

		const file = await File.create(fileData);

		console.log("File uploaded " + file.id + " " + file.originalName);

		res.json({ fileId: file.id, fileName: file.originalName });
	}
);

app.route("/file/:id").get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
	const file = await File.findById(req.params.id);

	if (file.password != null) {
		if (req.body.password == null) {
			res.render("password");
			return;
		}

		if (!(await bcrypt.compare(req.body.password, file.password))) {
			res.render("password", { error: true });
			return;
		}
	}

	file.downloadCount++;
	await file.save();
	console.log(
		"File " + file.id + " downloaded: " + file.downloadCount + " times"
	);

	res.download(file.path, file.originalName);
}

app.listen(process.env.PORT || 3000);

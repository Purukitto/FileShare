require("dotenv").config();

const File = require("./models/file");

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
var cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads" });

mongoose.connect(process.env.DATABASE_URL);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
	const fileData = {
		path: req.file.path,
		originalName: req.file.originalname,
	};
	if (req.body.password != null && req.body.password != "")
		fileData.password = await bcrypt.hash(req.body.password, 10);

	const file = await File.create(fileData);

	console.log("File uploaded " + file.id + " " + file.originalName);

	res.json({
		fileId: file.id,
		fileName: file.originalName,
	});
});

app.route("/file/:id/:password?").get(async (req, res) => {
	const file = await File.findById(req.params.id);

	if (file.password != null) {
		if (req.params.password == undefined) {
			return res.redirect(
				303,
				"http://127.0.0.1:5173/file/" + req.params.id
			);
		} else {
			if (!(await bcrypt.compare(req.params.password, file.password))) {
				return res.send(alert("Wrong password"));
			}
		}
	}

	file.downloadCount++;
	await file.save();
	console.log(
		"File " + file.id + " downloaded: " + file.downloadCount + " times"
	);

	res.download(file.path, file.originalName);
});

app.listen(process.env.PORT || 3000);

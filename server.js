const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const app = express();
const upload = multer();

app.post("/convert", upload.single("file"), async (req, res) => {
    try {
        const inputBuffer = req.file.buffer;

        const output = await sharp(inputBuffer)
            .jpeg()
            .toBuffer();

        res.set({
            "Content-Type": "image/jpeg",
            "Content-Disposition": "inline; filename=output.jpg"
        });

        res.send(output);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Convert failed" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("GIF→JPG service running on port " + port);
});

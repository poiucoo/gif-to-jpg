const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const app = express();
const upload = multer();

// convert endpoint
app.post("/convert", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const inputBuffer = req.file.buffer;

        // Convert GIF → JPG
        const output = await sharp(inputBuffer)
            .jpeg()
            .toBuffer();

        res.set({
            "Content-Type": "image/jpeg",
            "Content-Disposition": "inline; filename=output.jpg"
        });

        res.send(output);
    } catch (err) {
        console.error("Convert error:", err);
        res.status(500).json({ error: "Conversion failed" });
    }
});

// ⭐ IMPORTANT for Zeabur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`GIF→JPG service running on port ${PORT}`);
});

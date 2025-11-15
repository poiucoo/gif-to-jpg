import express from "express";
import sharp from "sharp";

const app = express();
app.use(express.json({ limit: "50mb" }));

app.post("/convert", async (req, res) => {
  try {
    const { base64, mimeType } = req.body;

    if (!base64) return res.status(400).json({ error: "no base64" });

    const buffer = Buffer.from(base64, "base64");

    // 如果是 GIF → 轉成 JPG
    if (mimeType === "image/gif") {
      const jpg = await sharp(buffer).jpeg().toBuffer();
      return res.json({
        mimeType: "image/jpeg",
        base64: jpg.toString("base64"),
      });
    }

    // 否則原樣回傳
    return res.json({
      mimeType,
      base64,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log("server running on 3000"));


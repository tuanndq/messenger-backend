const { v4: uuidv4 } = require("uuid");
const firebase = require("../services/firebase");

const uploadCtrl = {
  uploadImage: async (req, res) => {
    try {
      console.log(req.file);
      if (!req.file) {
        res.status(400).send("Error: No files found");
        console.log("error: no file");
      }
      let idv4 = uuidv4();
      const blob = firebase.bucket.file(`images/${idv4}`);

      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      blobWriter.on("error", (err) => {
        console.log(err);
      });

      blobWriter.on("finish", () => {
        let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
          firebase.bucket.name
        }/o/${encodeURIComponent(blob.name)}?alt=media`;
        res.status(200).json({
          message: "File uploaded!",
          url: publicUrl,
        });
      });

      blobWriter.end(req.file.buffer);
    } catch (err) {
      console.log(err);
    }
  },

  uploadVideo: async (req, res) => {
    if (!req.file) {
      res.status(400).send("Error: No files found");
    }

    let idv4 = uuidv4();
    const blob = firebase.bucket.file(`videos/${idv4}`);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on("error", (err) => {
      console.log(err);
    });

    blobWriter.on("finish", () => {
      let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        firebase.bucket.name
      }/o/${encodeURIComponent(blob.name)}?alt=media`;
      res.status(200).json({
        message: "File uploaded!",
        url: publicUrl,
      });
    });

    blobWriter.end(req.file.buffer);
  },
};

module.exports = uploadCtrl;

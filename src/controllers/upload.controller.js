const { v4: uuidv4 } = require("uuid");
const firebase = require("../services/firebase");
const resourceMessenger = require("../utils/resource");

const uploadCtrl = {
  uploadImage: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send(resourceMessenger.msg.err.fileNotFound);
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
        let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name
          }/o/${encodeURIComponent(blob.name)}?alt=media`;

        res.status(200).json({
          msg: resourceMessenger.msg.success.uploadFile,
          url: publicUrl,
        });
      });

      blobWriter.end(req.file.buffer);
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  uploadVideo: async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).send(resourceMessenger.msg.err.fileNotFound);
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
        let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name
          }/o/${encodeURIComponent(blob.name)}?alt=media`;
        
        res.status(200).json({
          msg: resourceMessenger.msg.success.uploadFile,
          url: publicUrl,
        });
      });

      blobWriter.end(req.file.buffer);
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },
};

module.exports = uploadCtrl;

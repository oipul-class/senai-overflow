var admin = require("firebase-admin");

var serviceAccount = require("../config/firebaseKey.json");

const BUCKET = "senai-overflow-2021-01-60b94.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
  if (!req.file) return next();

  const image = req.file;

  const imageName = Date.now() + "." + image.originalname.split(".").pop();

  const file = bucket.file(imageName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  stream.on("error", (error) => {
    console.error(error);
  });

  stream.on("finish", async () => {
    //tornando o arquivo publico
    await file.makePublic();

    //obter a url publica
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${imageName}`;

    next();
  });

  stream.end(image.buffer);
};

module.exports = uploadImage;

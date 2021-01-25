var admin = require("firebase-admin"); //import do firebase admin

var serviceAccount = require("../config/firebaseKey.json"); //chave de serviço

const BUCKET = "senai-overflow-2021-01-60b94.appspot.com"; //storage/bucket

admin.initializeApp({
  //inicialização
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET, //qual bucket usar
});

const bucket = admin.storage().bucket(); //instancia do objeto bucket

const uploadImage = (req, res, next) => {
  //função para upload de imagem no bucket
  if (!req.file) return next();

  const image = req.file; //recebendo a imagem

  const imageName = Date.now() + "." + image.originalname.split(".").pop(); //nomeando

  const file = bucket.file(imageName); //criando arquivo

  //createWriteStream = escreve um arquivo novo no bucket passado

  const stream = file.createWriteStream({
    //criandpo um stream
    metadata: {
      contentType: image.mimetype,
    },
  });

  stream.on("error", (error) => {
    //caso acontecer um erro
    console.error(error);
  });

  stream.on("finish", async () => {
    //quando arquivo estiver sido enviado
    //tornando o arquivo publico
    file.makePublic(); //deixar o arquivo publico

    req.file.imageName = imageName;

    //obter a url publica
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${imageName}`; //enviando o link do arquivo para armazenamento

    next(); //avançar pro proxima função
  });

  stream.end(image.buffer); //final
};

module.exports = uploadImage; //exportando a função

const Multer = require("multer");

const uploadQuestionImage = Multer({
    storage: Multer.diskStorage({ //guarda em disco
        destination: "uploads/",
        filename: (req, file, callback) => {
            const filename = Date.now() + "." + file.originalname.split(".").pop();

            return callback(null, filename);
        }
    }),
    fileFilter: (req, file, callback) => {
        const allowedTypes = [ "image/jpeg", "image/png" ];
        
        if (allowedTypes.includes(file.mimetype)) 
            callback(null, true);
        else
            callback(new Error("Tipo de arquivo invalido"));

    },
    limits: { fileSize: 1024 * 1024 * 2 } //Limite de 2 megabytes
});

module.exports = uploadQuestionImage.single("image");
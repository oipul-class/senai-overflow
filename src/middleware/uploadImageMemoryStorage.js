const Multer = require("multer");

const uploadImageMemoryStorage = Multer({
    storage: Multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
        const allowedTypes = [ "image/jpeg", "image/png" ];
        
        if (allowedTypes.includes(file.mimetype)) 
            callback(null, true);
        else
            callback(new Error("Tipo de arquivo invalido"));

    },
    limits: { fileSize: 1024 * 1024 * 2 } //Limite de 2 megabytes
});

module.exports = uploadImageMemoryStorage.single("image");
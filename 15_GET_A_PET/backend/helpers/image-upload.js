const { error } = require("console")
const multer = require("multer")
const path = require("path")

//destintion to store img
const imgStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        let folder = ""
        if (req.baseUrl.includes("users")) {
            folder = "users"

        } else if (req.baseUrl.includes("pets")) {
            folder = "pets"
        }

        cb(null, `public/images/${folder}`)

    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) +  path.extname(file.originalname))
    }
})

const imgUpload = multer({
    storage: imgStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new error("Por favor envie jpeg  ou png"))
        }

        cb(undefined, true)
    }

})

module.exports = { imgUpload }


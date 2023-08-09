import  { NextApiRequest, NextApiResponse } from 'next'
const path = require("path");
const multer = require("multer");
import nc from 'next-connect';

type Data = {
    name: string
}
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `uploads-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] != "pdf") {
        cb(null, true);
    } else {
        cb(new Error("Not a PDF File!!"), false);
    }
};

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
export default function handler(
    req: NextApiRequest,
    res: any
) {


    upload.single('myfile')(req, res, function (err) {

        if (err) {
            console.log(err)
            return;
        }
        // file uploaded successfully
        res.status(200).json({res:"upload success"});
    })};

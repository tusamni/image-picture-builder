const { map } = require('bluebird');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

let input = './input/';
let output = './output/'

let sizes = [2000, 1440, 1080, 720, 480];
let formats = ['jpeg', 'webp', 'avif'];

async function optimizeImage(image) {
    let extension = path.extname(image); // extension of the image file
    let baseFilename = path.basename(image, extension); // filename of the image minus the extension
    let outputPath = output + baseFilename;

    sizes.map(function (size) {
        formats.map(function (format) {
            sharp(`${input}${image}`)
                .toFormat(format)
                .resize(size, size, { fit: "inside" })
                .toFile(`${outputPath}-w${size}.${format}`)
                .then(info => { console.log(info) })
                .catch(err => { console.log(error) })
        })
    })
}

fs.readdir(input, function (err, files) {
    if (err) {
        console.log("There was an error reading files from the input folder");
    }

    files.forEach(function (file) {
        optimizeImage(file).then(
            function (value) {
                console.log(value);
            },
            function (error) {
                console.log(error);
            }
        )
    });
});
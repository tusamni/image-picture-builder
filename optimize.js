const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const exifr = require('exifr');

let input = './input/';
let output = './output/'

let sizes = [2000, 1440, 1080, 720, 480, 16];
let formats = ['jpeg', 'webp', 'avif'];

// check for input and output folders
if (!fs.existsSync(input)) {
    fs.mkdirSync(input);
}
if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
}

// read the files in the input directory
fs.readdir(input, function (err, files) {
    if (err) {
        console.log("There was an error reading files from the input folder");
    }
    const inputCount = fs.readdirSync(input).length;
    const totalCount = (sizes.length * formats.length) * inputCount;
    let currentCount = 0;

    // foe each of the files
    files.forEach(async function (file) {
        let extension = path.extname(file); // extension of the image file
        let baseFilename = path.basename(file, extension); // filename of the image minus the extension
        let inputFile = `${input}${file}`;
        let outputFile = `${output}${baseFilename}`;

        sizes.map(function (size) {
            formats.map(function (format) {
                sharp(inputFile)
                    .toFormat(format)
                    .resize(size, size, { fit: "inside" })
                    .toFile(`${outputFile}-w${size}.${format}`)
                    .then(info => {
                        currentCount++;
                        console.log(`Successfully created ${currentCount} of ${totalCount}: ${outputFile}-w${size}.${format}`)
                    })
                    .catch(err => { console.log(err) })
            })
        })
    });
});
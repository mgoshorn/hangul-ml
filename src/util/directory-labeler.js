const imageE = document.getElementById('image-to-label');
const labelInput = document.getElementById('label-input');
const labelSubmit = document.getElementById('label-submit');
const dumpJsonSubmit = document.getElementById('dump-json-button');

const imgDir = 'file:///D:/hangul-ml-data/set-011/images/';
const imgBase = 'image_';
let counter = 1;
const labels = [];

const padString = (width, str, char) => {
    if (str.length >= width) return str;
    return padString(width, char + str, char);
}


const nextFile = () => {
    const imageId = padString(3, '' + (counter++), '0');

    return `${imgDir}${imgBase}${imageId}.jpg`;
}

const handleKeyPress = (e) => {
    if (e.keyCode === 13) handleSubmit();
}

function handleSubmit() {
    const label = labelInput.value;
    if (labelInput === '') return;
    labelInput.value = '';
    labels.push(label);
    updateImage()
}

function dumpLabels() {
    const json = JSON.stringify(labels);
    console.log(json);
}

const updateImage = () => {
    imageE.src = nextFile();
}

function initialize() {
    updateImage();

    labelSubmit.addEventListener('click', () => handleSubmit());
    dumpJsonSubmit.addEventListener('click', () => dumpLabels());
    labelInput.addEventListener('keypress', (e) => handleKeyPress(e));
}

initialize();
const imageE = document.getElementById('image-to-label');

const spriteWidth = 150;
const spriteHeight = 150;

const datasetWidth = 750;
const datasetHeight = 1500;

const datasetSpriteWidth = datasetWidth / spriteWidth;
const datasetSpriteHeight = datasetHeight / spriteHeight;

const labelInput = document.getElementById('label-input');

const labels = [];
let currentId = 0;

function getHorizontalOffset(id) {
    return (id % datasetSpriteWidth) * spriteWidth;
}

function getVerticalOffset(id) {
    return Math.floor(id / datasetSpriteWidth) * spriteHeight;
}

function updateDisplayedSprite() {
    const horizontalPx = getHorizontalOffset(currentId);
    const verticalPx = getVerticalOffset(currentId);
    console.log(`${horizontalPx}px ${verticalPx}px`);
    imageE.style.backgroundPosition = `-${horizontalPx}px -${verticalPx}px`;
    console.log(imageE.background);
}

function handleSubmit() {
    const label = labelInput.value;
    labelInput.value = '';
    labels.push(label);
    currentId++;
    updateDisplayedSprite();
}

function initialize() {
    console.log('initializing');
    const submitButton = document.getElementById('label-submit');
    submitButton.addEventListener('click', () => {
        handleSubmit();
    })
    updateDisplayedSprite();

    const dumpJsonButton = document.getElementById('dump-json-button');
    dumpJsonButton.addEventListener('click', () => {
        console.log(JSON.stringify(labels));
    })

    labelInput.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    })
}

initialize();
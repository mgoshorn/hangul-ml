const {} = require('./jamo-util');

const inputSyllableDirectory = '../syllable-data/images';
const outputSyllableDirectory = '../syllable-data/categorized/';

const trainingDirectory = outputSyllableDirectory + 'training/'
const validationDirectory = outputSyllableDirectory + 'validation/'
const testingDirectory = outputSyllableDirectory + 'testing/'

const syllableLabelLocation = '../syllables-1-labels.json'

async function openDirectory() {
    const dir = await false.promises.openDir(inputSyllableDirectory);
    for await (const item of dir) {
        console.log(item);
    }
    console.log('complete');
}

openDirectory();
const mappings = {
    finalConsonant: new Map<string,
        number>(),
    initialConsonant: new Map<string,
        number>(),
    vowel: new Map<string,
        number>(),
};

mappings.initialConsonant.set('ㄱ', 0);
mappings.initialConsonant.set('ㄲ', 1);
mappings.initialConsonant.set('ㄴ', 2);
mappings.initialConsonant.set('ㄷ', 3);
mappings.initialConsonant.set('ㄸ', 4);
mappings.initialConsonant.set('ㄹ', 5);
mappings.initialConsonant.set('ㅁ', 6);
mappings.initialConsonant.set('ㅂ', 7);
mappings.initialConsonant.set('ㅃ', 8);
mappings.initialConsonant.set('ㅅ', 9);
mappings.initialConsonant.set('ㅆ', 10);
mappings.initialConsonant.set('ㅇ', 11);
mappings.initialConsonant.set('ㅈ', 12);
mappings.initialConsonant.set('ㅉ', 13);
mappings.initialConsonant.set('ㅊ', 14);
mappings.initialConsonant.set('ㅋ', 15);
mappings.initialConsonant.set('ㅌ', 16);
mappings.initialConsonant.set('ㅍ', 17);
mappings.initialConsonant.set('ㅎ', 18);

mappings.vowel.set('ㅏ', 0);
mappings.vowel.set('ㅐ', 1);
mappings.vowel.set('ㅑ', 2);
mappings.vowel.set('ㅒ', 3);
mappings.vowel.set('ㅓ', 4);
mappings.vowel.set('ㅔ', 5);
mappings.vowel.set('ㅕ', 6);
mappings.vowel.set('ㅖ', 7);
mappings.vowel.set('ㅗ', 8);
mappings.vowel.set('ㅘ', 9);
mappings.vowel.set('ㅙ', 10);
mappings.vowel.set('ㅚ', 11);
mappings.vowel.set('ㅛ', 12);
mappings.vowel.set('ㅜ', 13);
mappings.vowel.set('ㅝ', 14);
mappings.vowel.set('ㅞ', 15);
mappings.vowel.set('ㅟ', 16);
mappings.vowel.set('ㅠ', 17);
mappings.vowel.set('ㅡ', 18);
mappings.vowel.set('ㅢ', 19);
mappings.vowel.set('ㅣ', 20);

mappings.finalConsonant.set('', 0);
mappings.finalConsonant.set('ㄱ', 1);
mappings.finalConsonant.set('ㄲ', 2);
mappings.finalConsonant.set('ㄳ', 3);
mappings.finalConsonant.set('ㄴ', 4);
mappings.finalConsonant.set('ㄵ', 5);
mappings.finalConsonant.set('ㄶ', 6);
mappings.finalConsonant.set('ㄷ', 7);
mappings.finalConsonant.set('ㄹ', 8);
mappings.finalConsonant.set('ㄺ', 9);
mappings.finalConsonant.set('ㄻ', 10);
mappings.finalConsonant.set('ㄼ', 11);
mappings.finalConsonant.set('ㄽ', 12);
mappings.finalConsonant.set('ㄾ', 13);
mappings.finalConsonant.set('ㄿ', 14);
mappings.finalConsonant.set('ㅀ', 15);
mappings.finalConsonant.set('ㅁ', 16);
mappings.finalConsonant.set('ㅂ', 17);
mappings.finalConsonant.set('ㅄ', 18);
mappings.finalConsonant.set('ㅅ', 19);
mappings.finalConsonant.set('ㅆ', 20);
mappings.finalConsonant.set('ㅇ', 21);
mappings.finalConsonant.set('ㅈ', 22);
mappings.finalConsonant.set('ㅊ', 23);
mappings.finalConsonant.set('ㅋ', 24);
mappings.finalConsonant.set('ㅌ', 25);
mappings.finalConsonant.set('ㅍ', 26);
mappings.finalConsonant.set('ㅎ', 27);

const reverseMap = {
    finalConsonant: new Map(),
    initialConsonant: new Map(),
    vowel: new Map(),
};

for (const mappingName in mappings) {
    if (!mappings.hasOwnProperty(mappingName)) {
        continue;
    }
    const mapping = mappings[mappingName];
    for (const entry of mapping) {
        reverseMap[mappingName].set(entry[1], entry[0]);
    }
}

export function constructHangul(jamo: string[]) {
    return String.fromCharCode(
        44032 +
        mappings.initialConsonant.get(jamo[0]) * 588 +
        mappings.vowel.get(jamo[1]) * 28 +
        (jamo[2] ? mappings.finalConsonant.get(jamo[2]) : 0),
    );
}

export function destructHangul(hangul: string): string[] {
    const charCode = hangul.charCodeAt(0);
    const initialConsonantId = Math.floor((charCode - 44032) / 588);
    const vowelId = Math.floor(((charCode - initialConsonantId * 588) - 44032) / 28);
    const finalId = Math.floor(((charCode - initialConsonantId * 588) -
        vowelId * 28) - 44032);

    const jamo = [
        reverseMap.initialConsonant.get(initialConsonantId),
        reverseMap.vowel.get(vowelId),
    ];
    if (finalId) {
        jamo.push(reverseMap.finalConsonant.get(finalId));
    }

    return jamo;
}
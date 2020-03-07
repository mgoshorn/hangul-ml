const filter = document.getElementById('filter');
const text = document.getElementById('text');
const output = document.getElementById('output');
const count = document.getElementById('count');

const isHangul = (c) => {
    // console.log(c.charCodeAt(0));
    const code = c.charCodeAt(0);
    return code >= 44032 && code <= 55203;
};

filter.addEventListener('click', () => {
    const body = text.value;
    const chars = [];
    for (let i = 0; i < body.length; i++) {
        if (isHangul(body.charAt(i))) {
            chars.push(body.charAt(i));
        }
    }
    const result = chars.join('');
    console.log(JSON.stringify(chars.slice(0, 300)));
    output.innerText = result;
    count.innerText = result.length;
});
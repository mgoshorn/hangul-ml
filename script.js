const r = '2020-03-03T00:00:00';
const d = Date;
const f = new d(r);
const diff = f - new d();
const secondsms = 1000;
const minutems = secondsms * 60;
const hoursms = minutems * 60;
const daysms = hoursms * 24;
const fl = Math.floor;
const daysRemaining = fl(diff / daysms);
const hoursRemaining = fl(diff % daysms / hoursms);
const minutesRemaining = fl(diff % hoursms / minutems);
const secondsRemaining = fl(diff % minutems / secondsms);
const s = (i) => i > 1 ? 's' : '';
if (daysRemaining < 0) {
    console.log('FF7R has already been released. Go play it!')
} else {

}
console.log(`FF7R releases in ${daysRemaining} day${s(daysRemaining)}, \
${hoursRemaining} hour${s(hoursRemaining)}, \
${minutesRemaining} minute${s(minutesRemaining)}, \
${secondsRemaining} second${s(secondsRemaining)}.`)
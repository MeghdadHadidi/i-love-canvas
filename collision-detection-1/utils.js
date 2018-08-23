function getRandom(min = 0, max = 1) {
    let n = parseFloat((Math.random() * (max - min) + min).toFixed(1));
    if(n > 0.88){
        n = Math.round(n)
    }
    return n;
}

function getRandomInt(min = 0, max = 1) {
    let n = Math.floor(Math.random() * (max - min + 1) + min);
    return n;
}
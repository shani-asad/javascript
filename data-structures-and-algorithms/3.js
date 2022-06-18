// Question
// Given a object data, return the data multiple by 3 and sort the data.
// Expected output : { j: 0, k: 9, i: 18, l: 36 }

const data = { i: 6, j: null, k: 3, l: 12 };

function result(data) {
    const arr = []
    for (const key in data) {
        arr.push([key, data[key] * 3]);
    }
    
    arr.sort(function (a, b) {
        return a[1] - b[1];
    })

    const obj = {}
    arr.forEach(item => {
        obj[item[0]] = item[1]
    })

    return obj;
}

console.log(result(data));

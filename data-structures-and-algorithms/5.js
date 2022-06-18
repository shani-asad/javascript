/**
 * Direction
 * Divide students to all of groups & students must sorted by first name
 *
 * Expected Result
 * [
 *   [
 *     { "firstName": "Belle", "lastName": "Norton" },
 *     { "firstName": "Finnley", "lastName": "Rennie" }
 *   ],
 *   [
 *     { "firstName": "Kai", "lastName": "Lyons" },
 *     { "firstName": "Peyton", "lastName": "Gardner" }
 *   ],
 *   [{ "firstName": "Tatiana", "lastName": "Dickerson" }]
 * ]
 */
const students = [
    { firstName: "Kai", lastName: "Lyons" },
    { firstName: "Belle", lastName: "Norton" },
    { firstName: "Finnley", lastName: "Rennie" },
    { firstName: "Tatiana", lastName: "Dickerson" },
    { firstName: "Peyton", lastName: "Gardner" },
];
const groups = 3;

function compare(a, b) {
    if (a.firstName < b.firstName) {
        return -1;
    }
    if (a.firstName > b.firstName) {
        return 1;
    }
    return 0;
}

function result(students, groups) {
    students.sort(compare)

    const studentsNum = students.length
    const initPerGroup = parseInt(studentsNum / groups)
    const leftOver = studentsNum - groups * initPerGroup

    const studPerGroup = []

    for (let i = 0; i < groups; i++) {
        studPerGroup[i] = initPerGroup
    }

    if (leftOver > 0) {
        for (let i = 0; i < leftOver; i++) {
            studPerGroup[i]++
        }
    }

    const grouping = []
    studPerGroup.forEach(item => {
        grouping.push(
            students.slice(0, item)
        )
        students.splice(0, item)
    })

    return grouping

}

console.log(result(students, groups));

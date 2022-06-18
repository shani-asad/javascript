/**
 * Direction
 * Get name of the day of 4 days ago from today
 *
 * Expected result:
 * 1. if date now = monday
 * 2. then result = thursday
 */
function result(day) {
    var days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ];

    var idx = days.indexOf(day);

    idx -= 4;
    if (idx < 0) {
        idx += 7;
    }

    return days[idx];
}

const day = "saturday";
console.log(result(day));

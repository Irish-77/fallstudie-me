OWNER_DAY = 'me_day'
getWeek().then(resp => {
    console.log(resp);
})
function getWeek() {
    return getDays();
}

function getDays() {
    return new Promise((resolve, reject) => {
        $.post(API + 'listobejcts?owner=' + OWNER_DAY, async function (resp) {
            let date_index = 0;
            let days = [];
            for (var key of Object.keys(resp.data)) {
                day = resp.data[key].properties;

                date = await getDateOfDay(date_index);
                date_index += 1;

                day['date'] = date;
                days.push(day);
            }
            resolve(days);
        });
    })
}

function getDateOfDay(week_day = 0) {
    date = new Date();
    date_difference = date.getDay() - 1;
    if (date_difference == -1) {
        date_difference = 6;
    }
    date_difference -= week_day;
    date.setDate(date.getDate() - date_difference);
    return date;
}
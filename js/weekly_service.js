OWNER_DAY = 'me_day'
getWeek().then(resp => {
    console.log(resp);
})
function getWeek() {
    return getDays();
}

function getDays() {
    return new Promise((resolve, reject) => {
        $.post(API + 'listobejcts?owner=' + OWNER_DAY, function (resp) {
            let days = [];
            for (var key of Object.keys(resp.data)) {
                days.push(resp.data[key].properties);
            }
            resolve(days);
        });
    })
}
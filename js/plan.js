API = 'http://3.131.4.23:5001/';
OWNER_DAY = 'me_day';


function getWeek() {
    return getDays();
}

function getDays() {
    return new Promise((resolve, reject) => {
        $.post(API + 'listobejcts?owner=' + OWNER_DAY, async function(resp) {
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


function umlaute(str) {
    if (str != null) {
        return str.replace('ae', 'ä').replace('ue', 'ü').replace('oe', 'ö');
    }
    return null;
}

$(document).ready(function() {



    getWeek().then(resp => {

        var today = new Date(new Date().toDateString()).getTime();

        console.log(resp);

        for (i = 0; i < resp.length; i++) {
            /** TEMP */
            var date = resp[i].date; //.setHours(0, 0, 0, 0);

            var current_id = "id_" + i;



            var day_short = date.toLocaleString('default', { weekday: 'short' });
            var day_nr = date.toLocaleString('default', { day: '2-digit' });
            var month_short = date.toLocaleString('default', { month: 'short' });

            var eigenschaft = umlaute(resp[i].attribute);
            var task = umlaute(resp[i].task);
            var dauer = umlaute(resp[i].duration);
            var beschreibung = umlaute(resp[i].description);

            var step = `<div id="${current_id}" class="step"> <div id="beschriftung"> <h3>${day_short},<br>${day_nr}<br>${month_short}</h3> </div> <div class="v-stepper"> <div class="circle"></div> <div class="line"></div> </div> <div class="content" style="text-align: justify;"> <h3>${eigenschaft}</h3> <h5>${task}</h5> <p>🎯 ${beschreibung}</p> <p>⏰ ${dauer}</p> <div id="accordion_${current_id}"> </div> </div> </div>`;
            $('#plan').append(step);





            if (resp[i].exercises.length != 0) {
                var tasks = `<div class="accordion accordion-flush" id="accordionFlushExample" style="color: white;"> <div class="accordion-item"> <h2 class="accordion-header" id="flush-headingOne"> <button class="accordion-button collapsed shadow-none" style="width: 100% !important;" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne_${current_id}" aria-expanded="false" aria-controls="flush-collapseOne_${current_id}"> Detailansicht </button>            </h2> <div id="flush-collapseOne_${current_id}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample"> <div class="accordion-body"> <ul id="list_${current_id}" class="list-group"> </ul> </div> </div> </div> </div>`;
                $('#accordion_' + current_id).append(tasks);

                for (a = 0; a < resp[i].exercises.length; a++) {
                    var text = resp[i].exercises[a].text;
                    var value = resp[i].exercises[a].value;
                    var singleTask = `<li class="list-group-item d-flex justify-content-between align-items-center">${text}<span class="badge bg-primary rounded-pill">${value}x</span></li>`;
                    $('#list_' + current_id).append(singleTask);
                }
            }
            //Todo: Stage

            if (new Date(date.toDateString()).getTime() === today) {
                $('#' + current_id).addClass('active');
            } else if (new Date(date.toDateString()).getTime() < today) {
                $('#' + current_id).addClass('completed');
            }
        }
    });










    for (i = 0; i < 1; i++) {
        const date = new Date(2020, 10, 01);
        console.log(date.toLocaleString('default', { month: 'short' }));
        console.log(date.toLocaleString('default', { month: 'long' }));
        console.log(date.toLocaleString('default', { weekday: 'narrow' }));
        console.log(date.toLocaleString('default', { weekday: 'short' }));
        console.log(date.toLocaleString('default', { weekday: 'long' }));
        console.log(date.toLocaleString('default', { year: 'numeric' }));
        console.log(date.toLocaleString('default', { year: '2-digit' }));
        console.log(date.toLocaleString('default', { day: 'numeric' }));
        console.log(date.toLocaleString('default', { day: '2-digit' }));

    }





});
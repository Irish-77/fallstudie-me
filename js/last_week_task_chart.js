function getData() {
    return data = {
        'header': {
            'x_axis': 'Wochentag',
            'y_axis': 'Anzahl der Tasks',
        },
        'data': [5, 13, 9, 6, 12, 10, 2,
        ]
    }
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

drawChart();
async function drawChart() {
    var ctx = document.getElementById('chart-1');
    var tableData = await getData();
    var y_axis = [];
    var x_axis = [];
    var date_index = 0;
    var today = new Date();

    for (let row of tableData.data) {
        day = getDateOfDay(date_index)
        var day_short = date.toLocaleString('default', { weekday: 'short' });
        x_axis.push(day_short);
        if (today.getDay() == 0) {
            y_axis.push(row);
        } else if (today.getDay() >= day.getDay() && day.getDay() != 0) {
            y_axis.push(row);
        } else {
            y_axis.push(0)
        }
        date_index += 1;
    }

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            backgroundColor: "transparent",
            labels: x_axis,
            datasets: [{
                data: y_axis,
                backgroundColor: [
                    'rgba(112, 103, 162, 0.3)',
                    'rgba(112, 103, 162, 0.3)',
                    'rgba(112, 103, 162, 0.3)',
                    'rgba(112, 103, 162, 0.3)',
                    'rgba(112, 103, 162, 0.3)',
                    'rgba(112, 103, 162, 0.3)',
                    'rgba(112, 103, 162, 0.3)',
                ],
                borderColor: [
                    'rgba(112, 103, 162, 1)',
                    'rgba(112, 103, 162, 1)',
                    'rgba(112, 103, 162, 1)',
                    'rgba(112, 103, 162, 1)',
                    'rgba(112, 103, 162, 1)',
                    'rgba(112, 103, 162, 1)',
                    'rgba(112, 103, 162, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Erfüllte Tasks je Wochentag',
                fontColor: "#FFF",
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        fontColor: 'white',
                        labelString: tableData.header.y_axis,
                    },
                    ticks: {
                        fontColor: 'white',
                        beginAtZero: true,
                        stepSize: 5,
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        fontColor: 'white',
                    }
                }]
            }
        }
    });
}
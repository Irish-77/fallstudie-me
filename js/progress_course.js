function getData() {
    return data = {
        'header': {
            'x_axis': 'Kurse',
            'y_axis': 'Absolviert in Prozent',
        },
        'data': [
            ['Stärke', 40],
            ['Intellekt', 70],
            ['Charisma', 30],
        ]
    }
}

drawChart();
async function drawChart() {
    var ctx = document.getElementById('chart-0');
    var tableData = await getData();
    var labels = [];
    var data = [];

    for (let row of tableData.data) {
        labels.push(row[0]);
        data.push(row[1]);
    }

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            backgroundColor: "transparent",
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(112, 103, 162, 0.3)',
                    'rgba(112, 103, 162, 0.3)',
                    'rgba(112, 103, 162, 0.3)',
                ],
                borderColor: [
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
                text: 'Fortschritt Deiner Kurse',
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
                        labelString: '%'
                    },
                    ticks: {
                        fontColor: 'white',
                        beginAtZero: true,
                        max: 100,
                        min: 0,
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
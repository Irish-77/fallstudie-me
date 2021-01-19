function getData() {
    return data = {
        'data': [
            ['Stärke', 1],
            ['Intellekt', 3],
            ['Pünktlichkeit', 1],
            ['Charisma', 1],
            ['Führungsstärke', 0],
            ['Athletisch', 0],
            [
                ['Soziale', 'Kompetenz'], 1
            ],
            ['Verkaufstechniken', 1],
            ['IT-Verständis', 3],
        ]
    }
}

drawChart();
async function drawChart() {
    var ctx = document.getElementById('chart-3');
    var tableData = await getData();
    var labels = [];
    var data = [];

    for (let row of tableData.data) {
        labels.push(row[0]);
        data.push(row[1]);
    }

    var myChart = new Chart(ctx, {
        type: 'radar',

        data: {
            backgroundColor: "transparent",
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: 'rgba(112, 103, 162, 0.3)',
                borderColor: 'rgba(112, 103, 162, 1)',
                borderWidth: 1
            }]
        },
        options: {
            pointLabelSeperator: "\n",
            title: {
                display: true,
                text: 'Gesamtfortschritt pro Eigenschaft',
                fontColor: 'white'
            },
            legend: {
                display: false,
            },
            labels: {
                fontColor: 'white',
            },
            scale: {
                ticks: {
                    fontColor: 'white',
                    backdropColor: 'transparent', // should render black behind the text
                    beginAtZero: true,
                    min: 0,
                    max: 3,
                    stepSize: 1,
                    suggestedMin: 50,
                    suggestedMax: 100
                },
                angleLines: {
                    display: false
                },

                gridLines: {
                    color: 'rgba(112, 103, 162, 1)',
                },
                pointLabels: {
                    fontColor: "white",
                },
            }
        }
    });
}
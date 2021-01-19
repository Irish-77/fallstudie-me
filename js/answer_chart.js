function getData() {
    return data = {
        'data': [0.67, 0.33]
    }
}

drawChart();
async function drawChart() {
    var ctx = document.getElementById('chart-2');
    var tableData = await getData();
    var labels = ['Korrekt', 'Falsch'];
    var data = tableData.data

    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            backgroundColor: "transparent",
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(112, 103, 162, 0.3)',
                    'rgba(112, 103, 162, 0.0)',
                ],
                borderColor: [
                    'rgba(112, 103, 162, 1)',
                    'rgba(112, 103, 162, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Beantwortete Fragen',
                fontColor: "#FFF",
            },
            legend: {
                display: true,
            },
            scales: {}
        }
    });
}
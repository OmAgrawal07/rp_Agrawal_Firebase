/*
    This will be changed to a bar graph, not line
*/

async function getData(){
    const response = await fetch("static/data/individual-absorbance.csv")
    const data = await response.text()  // CSV is in text format
    // console.log(data);

    const xWeeks = [];       // x-axis labels = week values
    // y-axis labels for absorbance readings
    const yBarley = [];      
    const yRye = [];     
    const yWheat = [];     
    const yHay = [];   
    const yAlgae = [];   
    const yNoAlgae = [];   

    // \n = new line
    // split('\n') will separate table into an array of individual rows
    // slice(start, end) will return a new array starting at index start up to but not including index end

    const table = data.split('\n').slice(1);
    console.log(table);

    table.forEach(row => {
        const columns = row.split(',');  // split rows on the commas
        const week = columns[0];         // assign week value
        xWeeks.push(week);               // push week value into week array

        const absBarley = parseFloat(columns[1]); 
        yBarley.push(absBarley);          

        const absRye = parseFloat(columns[2]);
        yRye.push(absRye);

        const absWheat = parseFloat(columns[3]);
        yWheat.push(absWheat);
        
        const absHay = parseFloat(columns[4]);
        yHay.push(absHay);

        const absAlgae = parseFloat(columns[5]);
        yAlgae.push(absAlgae);

        const absNoAlgae = parseFloat(columns[6]);
        yNoAlgae.push(absNoAlgae);
    });

    return {xWeeks, yBarley, yRye, yWheat, yHay, yAlgae, yNoAlgae} 
}

async function createChart() {
    const data = await getData();       // createChart will wait until getData() is finished processing
    const ctx = document.getElementById('absChart');
    const absChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xWeeks,
            datasets: [
                {
                    label: 'Barley Straw',
                    data: data.yBarley,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Rye Straw',
                    data: data.yRye,
                    fill: false,
                    backgroundColor: 'rgba(0, 102, 255, 0.2)',
                    borderColor: 'rgba(0, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Wheat Straw',
                    data: data.yWheat,
                    fill: false,
                    backgroundColor: 'rgba(0, 153, 51, 0.2)',
                    borderColor: 'rgba(0, 153, 51, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Orchard Grass Hay',
                    data: data.yHay,
                    fill: false,
                    backgroundColor: 'rgba(100, 103, 21, 0.2)',
                    borderColor: 'rgba(100, 103, 21, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Only Algae',
                    data: data.yAlgae,
                    fill: false,
                    backgroundColor: 'rgba(0, 215, 75, 0.2)',
                    borderColor: 'rgba(0, 215, 75, 1)',
                    borderWidth: 1
                },
                {
                    label: 'No Algae',
                    data: data.yNoAlgae,
                    fill: false,
                    backgroundColor: 'rgba(55, 13, 122, 0.2)',
                    borderColor: 'rgba(55, 13, 122, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,           // Re-size based on screen size
            scales: {                   // Display options - x and y axes
                x: {
                    title: {
                        display: true,
                        text: 'Weeks',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        callback: function(val, index) {
                            // Labeling of tick marks
                            return this.getLabelForValue(val);
                        },
                        font: {
                            size: 16
                        },
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Oxygen Readings (% composition)',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        maxTicksLimit: data.yBarley.length,       // tick mark limit
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {                  // Display options
                title: {
                    display: true,
                    text: 'Oxygen Readings of Different Closed Environments',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();
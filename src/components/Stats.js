import React,{useEffect} from 'react'
import { Chart,registerables } from 'chart.js'

export default function Stats() {

    let myChart = null;
    Chart.register(...registerables)

    const labels = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'Notes Added or Updated',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 0],
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    useEffect(() => {
        if (myChart !== null) {
            myChart.destroy();
        }
// eslint-disable-next-line
        myChart = new Chart(
            document.getElementById('myChart'),
            config
        );

    }, [myChart]);

    return (
        <div style={{ marginTop: '7rem' }}>
            <div>
                <canvas id={`myChart`} width="270" height="100"></canvas>
            </div>
        </div>
    )
}

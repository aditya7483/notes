import React,{useEffect} from 'react'
import { Chart, registerables } from 'chart.js'

export default function Stats(props) {
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

    


    useEffect(() => {
        let count=0;
        if( count === 0)
        {if (myChart !== null) {
            myChart.destroy();
        }
        props.statsData.then((res)=>{
            
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Notes Added or Updated',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: res
                }]
            };

            
            const config = {
                type: 'line',
                data: data,
                options: {}
            };

            // eslint-disable-next-line
            myChart = new Chart(
                document.getElementById('myChart'),
                config
                );
            })}
            count++;
        
    }, []);

    return (
        <div style={{ marginTop: '7rem' }}>
            <div>
                <canvas id={`myChart`} width="270" height="100"></canvas>
            </div>
        </div>
    )
}


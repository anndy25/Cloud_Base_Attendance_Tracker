import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

const LineChart = () => {
    const [data, setData]= useState({
        labels:["Jan","Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
        datasets:[
          {
            label:"First Dataset",
            data:[10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
            backgroundColor:'rgb(0,0,255,0.4)',
            borderColor:'blue',
            tension:0.4,
            fill:true,
            pointStyle:'rect',
            pointBorderColor:'blue',
            pointBackgroundColor:'#fff',
            showLine:true
          }
        ]
      })
      return (
        <div style={{width:"50rem"}}>
          <Line data={data}>Hello</Line>
        </div>
      );
}

export default LineChart
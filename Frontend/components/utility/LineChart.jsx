import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function LineChart() {
  const canvasEl = useRef(null);




  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");


    var gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, 'rgba(67, 56, 201,0.8)'); // start with the base color with some opacity
    gradient.addColorStop(0.5, 'rgba(79, 70, 229, 0.6)'); // middle stop with a lighter shade of the base color and less opacity
    gradient.addColorStop(1, 'rgba(201, 198, 228, 0)');


    const weight = [60.0, 60.2, 123, 3, 23, 35];

    const labels = [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",

    ];
    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: "My First Dataset",
          data: weight,
          fill: true,
          borderWidth: 2,
          borderColor: '#4f46e5',
          lineTension: 0.2,
          pointBackgroundColor: '#4f46e5',
          pointRadius: 3
        }
      ],


    };
    var options = {
      scales: {
        x: {
          grid: {
            display: false
          }
        },
      }
    };
    const config = {
      type: "line",
      data: data,
      options: options
    }
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  }, []);

  return (

    <div style={{ width: "auto" }} className='p-6'>
      <canvas id="myChart" ref={canvasEl} height="130" />
    </div>
  );
}

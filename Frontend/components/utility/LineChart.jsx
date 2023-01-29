import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function LineChart() {
  const canvasEl = useRef(null);

  // const colors = {
  //   purple: {
  //     default: "rgba(149, 76, 233, 1)",
  //     half: "rgba(149, 76, 233, 0.5)",
  //     quarter: "rgba(149, 76, 233, 0.25)",
  //     zero: "rgba(149, 76, 233, 0)"
  //   },
  //   indigo: {
  //     default: "rgba(80, 102, 120, 1)",
  //     quarter: "rgba(80, 102, 120, 0.25)"
  //   }
  // };
  const colors = {
    purple: {
      default: "rgba(2, 49, 243, 0.715)",
      half: "rgba(2, 96, 211, 0.742)",
      quarter: "rgba(243, 243, 246, 0.797)",
      zero: "rgba(243, 243, 244, 0.375)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);



    const weight = [60.0, 60.2,123,3,23,35];

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
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3
        }
      ],

     
    };

   const config = {
      type: "line",
      data: data,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  },[]);

  return (

    <div style={{ width: "50rem" }} className='p-4 '>
      <canvas id="myChart" ref={canvasEl} height="130" />
    </div>
  );
}

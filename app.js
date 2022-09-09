const colors = {
  red: {
    full: "rgba(245, 66, 66,1)",
    default: "rgba(245, 66, 66,0.4)",
  },
  orange: {
    full: "rgba(247, 167, 108,1)",
    default: "rgba(247, 167, 108,0.4)",
  },
  green: {
    full: "rgba(103,205,172,1)",
    default: "rgba(103,205,172,0.5)",
  },
};

const MINUS_VALUE = 300;
const datasets = [0, 2000, 4000, 5000, 6200];
const visibleDatasets = [...datasets];
visibleDatasets[0] = null;
visibleDatasets[visibleDatasets.length - 1] = null;
const datasetsForBars = visibleDatasets.map((val) => {
  if (val) return val - MINUS_VALUE;
  return val;
});
const labels = datasets.map((item) => item + "$");

const ctx = document.querySelector("canvas").getContext("2d");

const gradient = ctx.createLinearGradient(0, 0, 500, 0);
gradient.addColorStop(0, colors.red.default);
gradient.addColorStop(0.35, colors.orange.default);
gradient.addColorStop(1, colors.green.default);
const borderGradient = ctx.createLinearGradient(0, 0, 500, 0);
borderGradient.addColorStop(0, colors.red.full);
borderGradient.addColorStop(0.35, colors.orange.full);
borderGradient.addColorStop(1, colors.green.full);
const options = {
  data: {
    labels: labels,
    positon: 0,
    datasets: [
      {
        type: "line",
        fill: true,
        backgroundColor: gradient,
        pointBackgroundColor: "trasparent",

        borderColor: borderGradient,
        data: datasets,
        lineTension: 0.2,
        borderWidth: 4,
        pointRadius: 0,
      },
      {
        type: "line",
        backgroundColor: "transparent",
        pointBackgroundColor: [
          "",
          colors.red.full,
          colors.orange.full,
          colors.green.full,
        ],
        pointHoverBackgroundColor: [
          "",
          colors.red.full,
          colors.orange.full,
          colors.green.full,
        ],
        fill: false,
        borderColor: "transparent",
        data: visibleDatasets,
        lineTension: 0.2,
        borderWidth: 5,
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBorderColor: "rgba(255,255,255,1)",
        pointBorderWidth: 3,
        pointHoverBorderWidth: 4,
        pointHoverBorderColor: "rgba(255,255,255,1)",
        stepped: true,
        order: -1,
      },
      {
        type: "bar",
        data: datasetsForBars,

        backgroundColor: [
          colors.green.full,
          colors.red.full,
          colors.orange.full,
        ],
        hoverBackgroundColor: [
          colors.green.full,
          colors.red.full,
          colors.orange.full,
        ],
        barThickness: 17,
        borderRadius: {
          topLeft: 14,
          topRight: 14,
        },

        // this dataset is drawn below
        order: 2,
      },
    ],
  },
  options: {
    beginAtZero: true,
    scaleBeginAtZero: true,
    layout: {
      padding: {
        top: 45,
        left: 10,
        bottom: 0,
        right: 10,
      },
    },
    plugins: {
      tooltip: {
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex === 1;
        },
        backgroundColor: "rgb(255,255,255)",
        titleColor: "rgb(0,0,0)",
        borderColor: "rgb(247, 167, 108)",
        borderWidth: 2,
        yAlign: "bottom",
        xAlign: "center",

        caretPadding: 14,
        padding: 10,
        displayColors: false,
        boxPadding: 0,
        titleFont: {
          size: 16,
        },
        padding: {
          top: 16,
          left: 16,
          right: 16,
          bottom: 6,
        },
        bodyFont: {
          display: false,
          size: 0,
          lineHeight: 0,
        },
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        display: true,
        offset: false,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        display: true,

        ticks: {
          minRotation: 90,

          labelOffset: -30,

          stepSize: 1,
          count: 3,
          callback: function (label, index, labels) {
            switch (index) {
              case 0:
                return "Worst";
              case 1:
                return "Average";
              case 2:
                return "Best";
            }
          },
        },
        gridLines: {
          display: false,
        },
      },
    },
    legend: {
      display: false,
    },
  },
};

window.onload = function () {
  window.myLine = new Chart(ctx, options);
  //   Chart.defaults.global.defaultFontColor = colors.indigo.default;
  //   Chart.defaults.global.defaultFontFamily = "Fira Sans";
};

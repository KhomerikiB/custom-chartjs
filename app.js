const colors = {
  red: {
    full: "rgba(255, 110, 106,1)",
    default: "rgba(255, 110, 106,0.3)",
  },
  orange: {
    full: "rgba(255, 171, 102,1)",
    default: "rgba(255, 171, 102,0.3)",
  },
  green: {
    full: "rgba(103, 205, 172,1)",
    default: "rgba(103, 205, 172,0.3)",
  },
};
const MINUS_VALUE = 350;

const getPrices = async () => {
  const res = await fetch(
    "https://cai-back.leavingstone.club/api/v1/car-catalogue/85ac8e90-594f-4086-8dbc-9c90c341b49e/translated"
  );
  const json = await res.json();
  return json;
};
const drawChart = (datasetsForChart) => {
  const lastDataset = datasetsForChart[datasetsForChart.length - 1];
  const datasets = [0, ...datasetsForChart, lastDataset + lastDataset / 10];
  const visibleDatasets = [...datasets];
  visibleDatasets[0] = null;
  visibleDatasets[visibleDatasets.length - 1] = null;
  const datasetsForBars = visibleDatasets.map((val) => {
    if (val) return val - MINUS_VALUE;
    return val;
  });
  const labels = datasets.map((item) => item + "$");

  const ctx = document.querySelector("canvas").getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 400, 0);
  gradient.addColorStop(0, colors.red.default);
  gradient.addColorStop(0.45, colors.orange.default);
  gradient.addColorStop(1, colors.green.default);
  const borderGradient = ctx.createLinearGradient(0, 0, 400, 0);
  borderGradient.addColorStop(0, colors.red.full);
  borderGradient.addColorStop(0.45, colors.orange.full);
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
          order: -2,
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
          borderColor: colors.orange.full,
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

  window.myLine = new Chart(ctx, options);
  //   Chart.defaults.global.defaultFontColor = colors.indigo.default;
  //   Chart.defaults.global.defaultFontFamily = "Fira Sans";
};
const initChart = async () => {
  const response = await getPrices();
  const datasets = [
    response["base-price"],
    response["average-price"],
    response["as-tested-price"],
  ];
  drawChart(datasets);
};

initChart();

let presentStudents = 20;
let absentStudents = 5;
let totalStudents = presentStudents + absentStudents;

// Update card contents with initial data
document.getElementById('presentCount').textContent = presentStudents;
document.getElementById('absentCount').textContent = absentStudents;
document.getElementById('totalCount').textContent = totalStudents;

let selectedChartType = 'pie';
let chartInstance = null;

// Event listener for chart options
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function(event) {
    selectedChartType = event.target.dataset.chartType;
    updateChart();
  });
});

// Function to update chart
function updateChart() {
  if (chartInstance) {
    chartInstance.destroy();
  }

  let ctx = document.getElementById('chartCanvas').getContext('2d');
  switch (selectedChartType) {
    case 'pie':
      drawPieChart(ctx, presentStudents, absentStudents);
      break;
    case 'line':
      drawLineChart(ctx, presentStudents, absentStudents);
      break;
    case 'bar':
      drawBarChart(ctx, presentStudents, absentStudents);
      break;
  }
}

// Function to draw pie chart
function drawPieChart(ctx, present, absent) {
  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [{
        data: [present, absent],
        backgroundColor: ['#36a2eb', '#ff6384']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Attendance Overview'
      }
    }
  });
}

// Function to draw line chart
function drawLineChart(ctx, present, absent) {
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [{
        label: 'Present',
        data: [present, 0], // Assuming no absent students for simplicity
        borderColor: '#36a2eb',
        fill: false
      },
      {
        label: 'Absent',
        data: [0, absent], // Assuming no present students for simplicity
        borderColor: '#ff6384',
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Attendance Overview'
      }
    }
  });
}

// Function to draw bar chart
function drawBarChart(ctx, present, absent) {
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [{
        label: 'Number of Students',
        data: [present, absent],
        backgroundColor: ['#36a2eb', '#ff6384']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Attendance Overview'
      }
    }
  });
}

// Initial chart
let ctx = document.getElementById('chartCanvas').getContext('2d');
drawPieChart(ctx, presentStudents, absentStudents);
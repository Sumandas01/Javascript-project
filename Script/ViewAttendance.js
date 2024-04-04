document.addEventListener("DOMContentLoaded", function () {
    let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

    function renderAttendanceTable() {
      let tableBody = document.getElementById("attendanceTableBody");
      tableBody.innerHTML = "";

      for (const [employeeName, attendanceData] of Object.entries(attendance)) {
        let row = document.createElement("tr");
        row.innerHTML = `
          <td>${employeeName}</td>
          <td>${attendanceData}</td>
          <td><button class="btn btn-primary" onclick="editAttendance('${employeeName}')">Edit</button></td>
        `;
        tableBody.appendChild(row);
      }
    }

    window.editAttendance = function (employeeName) {
      localStorage.setItem("currentEmployee", employeeName);
      window.location.href = "edit_attendance.html";
    };

    renderAttendanceTable();
  });
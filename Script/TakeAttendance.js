document.addEventListener("DOMContentLoaded", function () {
    let students = [
      "Suman Das",
      "Birupakhya Dash",
      "Kamlesh Vaghela",
      "Kunal Swain",
      "Rohit Kumar Rout",
      "Satyadarshan Senapati"
    ];

    let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

    function renderAttendanceTable() {
      let tableBody = document.getElementById("attendanceTableBody");
      tableBody.innerHTML = "";

      students.forEach(function (student) {
        let row = document.createElement("tr");
        row.innerHTML = `
          <td>${student}</td>
          <td>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="${student}" id="${student}-present" value="present" required>
              <label class="form-check-label" for="${student}-present">Present</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="${student}" id="${student}-absent" value="absent" required>
              <label class="form-check-label" for="${student}-absent">Absent</label>
            </div>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }

    document.getElementById("attendanceForm").addEventListener("submit", function (event) {
      event.preventDefault();
      let currentDate = new Date().toISOString().slice(0, 10);
      if (attendance[currentDate]) {
        alert("Attendance has already been taken for today.");
        return;
      }
      let inputs = document.querySelectorAll("input[type='radio']:checked");
      if (inputs.length !== students.length) {
        alert("Please mark attendance for all students.");
        return;
      }
      let attendanceData = {};
      students.forEach(function (student) {
        let value = document.querySelector(`input[name='${student}']:checked`).value;
        attendanceData[student] = value;
      });
      attendance[currentDate] = attendanceData;
      localStorage.setItem("attendance", JSON.stringify(attendance));

      alert("Attendance submitted successfully.");
      document.getElementById("attendanceForm").reset();
    });

    renderAttendanceTable();
  });
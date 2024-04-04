document.addEventListener("DOMContentLoaded", function () {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    function renderEmployeeTable() {
      let tableBody = document.getElementById("employeeTableBody");
      tableBody.innerHTML = "";

      employees.forEach(function (employee, index) {
        let row = document.createElement("tr");
        row.innerHTML = `
          <td>${employee.name}</td>
          <td>${employee.age}</td>
          <td>${employee.email}</td>
          <td>${employee.phone}</td>
          <td>${employee.designation}</td>
          <td>${employee.salary}</td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${index})">Delete</button>
            <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#editEmployeeModal" onclick="populateEditForm(${index})">Edit</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }

    // Load employee data when page is loaded
    renderEmployeeTable();

    document.getElementById("addEmployeeForm").addEventListener("submit", function (event) {
      event.preventDefault();

      let employee = {
        name: document.getElementById("employeeName").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phoneNumber").value,
        designation: document.getElementById("designation").value,
        salary: document.getElementById("salary").value,
      };

      employees.push(employee);
      localStorage.setItem("employees", JSON.stringify(employees));
      renderEmployeeTable();
      document.getElementById("addEmployeeForm").reset();
      $('#addEmployeeModal').modal('hide');
    });

    window.deleteEmployee = function (index) {
      if (confirm("Are you sure you want to delete this employee?")) {
        employees.splice(index, 1);
        localStorage.setItem("employees", JSON.stringify(employees));
        renderEmployeeTable();
      }
    };

    window.populateEditForm = function (index) {
      let employee = employees[index];
      document.getElementById("editEmployeeIndex").value = index;
      document.getElementById("editEmployeeName").value = employee.name;
      document.getElementById("editAge").value = employee.age;
      document.getElementById("editEmail").value = employee.email;
      document.getElementById("editPhoneNumber").value = employee.phone;
      document.getElementById("editDesignation").value = employee.designation;
      document.getElementById("editSalary").value = employee.salary;
    };

    document.getElementById("editEmployeeForm").addEventListener("submit", function (event) {
      event.preventDefault();

      let index = document.getElementById("editEmployeeIndex").value;
      employees[index] = {
        name: document.getElementById("editEmployeeName").value,
        age: document.getElementById("editAge").value,
        email: document.getElementById("editEmail").value,
        phone: document.getElementById("editPhoneNumber").value,
        designation: document.getElementById("editDesignation").value,
        salary: document.getElementById("editSalary").value,
      };

      localStorage.setItem("employees", JSON.stringify(employees));
      renderEmployeeTable();
      $('#editEmployeeModal').modal('hide');
    });
  });
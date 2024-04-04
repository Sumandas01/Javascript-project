let TblContent = "";
document.addEventListener("DOMContentLoaded", function () {
  let TblBody = document.getElementById("LearningCrudTblTbody");
  let storedData = localStorage.getItem("LearningCrudData");
  if (storedData) {
    TblBody.innerHTML = storedData;
  }

  let ButtonId = document.getElementById('SubmitFormbtn');

  ButtonId.addEventListener('click', function (event) {
    let NameValue = document.querySelector('#name').value;
    let Emailvalue = document.querySelector('#email').value;
    let PhoneNumberValue = document.querySelector('#phone').value;
    let DateOfBirthValue = document.querySelector('#dob').value;
    let Gender = document.querySelector('#gender').value;
    var payload = {
      name: NameValue,
      email: Emailvalue,
      phonenumber: PhoneNumberValue,
      dateofbirth: DateOfBirthValue,
      gender: Gender
    }
    if (payload != null) {
      TblContent += "<tr><td>" + payload.name + "</td>";
      TblContent += "<td>" + payload.email + "</td>";
      TblContent += "<td>" + payload.phonenumber + "</td>";
      TblContent += "<td>" + payload.dateofbirth + "</td>";
      TblContent += "<td>" + payload.gender + "</td></tr>";
    }

    let TblBody = document.getElementById("LearningCrudTblTbody");
    if (TblContent != "") {
      let row = document.createElement("tr");
      row.innerHTML = TblContent;
      TblBody.appendChild(row);
      localStorage.setItem("LearningCrudData", TblBody.innerHTML);
    }
  });
});

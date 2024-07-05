function getAge() {
  document.getElementById("age-years").textContent = "--";
  document.getElementById("age-months").textContent = "--";
  document.getElementById("age-days").textContent = "--";

  let dobDay = document.querySelector("#day-input").value;
  let dobMonth = document.querySelector("#month-input").value;
  let dobYear = document.querySelector("#year-input").value;

  const today = new Date();

  if (dobDay < 1 || dobDay > 31) {
    displayError("day", dobDay);
  } else if (dobMonth < 1 || dobMonth > 12) {
    displayError("month", dobMonth);
  } else if (dobYear < 1 || dobYear > today.getFullYear()) {
    displayError("year", dobYear);
  } else {
    //Check if date is valid: Leap year/ 31st/ feb
    if (dobMonth == 2) {
      if ((dobDay == 29 && !isLeapYear(dobYear)) || dobDay > 29) {
        displayError("all", 0);
        return;
      }
    } else if (dobDay == 31) {
      if (![1, 3, 5, 7, 8, 10, 12].includes(dobMonth)) {
        displayError("all", 0);
        return;
      }
    }

    let age = today.getFullYear() - dobYear;
    let monthDiff = today.getMonth() + 1 - dobMonth;
    let daysDiff = today.getDate() - dobDay;

    console.log(today.getMonth(), age);

    if (monthDiff == 0 && daysDiff < 0) {
      age--;
      monthDiff = 11;
      daysDiff += 30;
      console.log("working");
    } else {
      if (daysDiff < 0) {
        daysDiff += 30;
      }
      if (monthDiff < 0) {
        age--;
        monthDiff += 12;
      }
    }

    for (i = 0; i < 3; i++) {
      document.getElementsByTagName("input")[i].style.borderColor =
        "hsl(0, 0%, 86%)";
      document.querySelectorAll(`label`)[i].style.color = "hsl(0, 1%, 44%)";
      document.querySelectorAll(`.date-selector p`)[i].innerText = "";
    }
    
    document.getElementById("age-years").textContent = age;
    document.getElementById("age-months").textContent = monthDiff;
    document.getElementById("age-days").textContent = daysDiff;
  }
}

function clearStyles() {}

function displayError(fieldName, value) {
  let errMsg = "";
  if (fieldName == "all") {
    for (i = 0; i < 3; i++) {
      document.getElementsByTagName("input")[i].style.borderColor =
        "hsl(0, 100%, 67%)";
      document.querySelectorAll(`label`)[i].style.color = "hsl(0, 100%, 67%)";
    }
    document.getElementById(`day-error`).innerText = "Must be a valid date";
  } else {
    if (value == "") {
      errMsg = "This field is required";
    } else if (fieldName === "year") {
      errMsg = "Must be in the past";
    } else {
      errMsg = "Must be a valid " + fieldName;
    }

    document.querySelector(`label[for='${fieldName}-input']`).style.color =
      "hsl(0, 100%, 67%)";
    document.getElementById(`${fieldName}-input`).style =
      "border-color:hsl(0, 100%, 67%)";
    document.getElementById(`${fieldName}-error`).innerText = errMsg;
  }
}

function isLeapYear(year) {
  if (year % 100 == 0) {
    return year % 400 == 0 ? true : false;
  } else if (year % 4 == 0) {
    return true;
  } else {
    return false;
  }
}

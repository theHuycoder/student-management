// Toggle Sidebar
const toggleAddButton = document.getElementById("toggle-add");
const leftSideBar = document.getElementById("left-side");
const closeSidebarButton = document.getElementById("close-sidebar");
toggleAddButton.addEventListener("click", () => {
    leftSideBar.classList.toggle("d-none");
})
closeSidebarButton.addEventListener("click",()=>{
    leftSideBar.classList.add("d-none");
})


//Form
const tableBody = document.getElementById("table-body");
const addForm = document.getElementById("add-form");
const studentName = document.getElementById("student-name");
const studentBirthday = document.getElementById("student-birthday");
const studentClass = document.getElementById("student-class");
const studentMark1 = document.getElementById("student-mark1");
const studentMark2 = document.getElementById("student-mark2");
const studentMark3 = document.getElementById("student-mark3");
const addButton = document.getElementById("add-btn");
// Check localStorage
let localValues = JSON.parse(localStorage.getItem("studentList"));
let studentList = !localValues ? [] : localValues;
//Auto render list
for (let i = 0; i < studentList.length; i++) {
    let rowPrevious = document.createElement("tr");
    let studentValuesPrevious = Object.values(studentList[i]);
    for (let j = 0; j < studentValuesPrevious.length; j++) {
        let cellPrevious = document.createElement("td");
        cellPrevious.textContent = studentValuesPrevious[j];
        rowPrevious.appendChild(cellPrevious);
    }
    tableBody.appendChild(rowPrevious);
}
let id = studentList.length === 0 ? 0 : studentList.length;
// Click to add
addButton.addEventListener("click", (e) => {
    e.preventDefault();
    let nameValue = studentName.value;
    let birthdayValue = studentBirthday.value;
    let classValue = studentClass.value;
    let mark1 = studentMark1.value;
    let mark2 = studentMark2.value;
    let mark3 = studentMark3.value;
    console.log(validateForm(nameValue, birthdayValue, classValue));
    if (validateForm(nameValue, birthdayValue, classValue)) {
        id += 1;
        let newStudent = {
            id,
            name: nameValue,
            birthday: birthdayValue,
            classVal: classValue,
            mark1,
            mark2,
            mark3
        }
        studentList.push(newStudent);
        let row = document.createElement("tr");
        let studentValues = Object.values(newStudent);
        for (let j = 0; j < studentValues.length; j++) {
            let cell = document.createElement("td");
            cell.textContent = studentValues[j];
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
        let myJSON = JSON.stringify(studentList);
        localStorage.setItem("studentList", myJSON);
    }
})
// Average
const calculateAverageButton = document.getElementById("calculate-average");
calculateAverageButton.addEventListener("click",()=>{
    for (let i = 0; i < studentList.length;i++){
        let currentStudent = studentList[i];
        const {mark1,mark2,mark3} = currentStudent;
        let averageMark = calculateAverage(mark1,mark2,mark3);
        currentStudent.averageMark = averageMark;
    }
    let myJSON = JSON.stringify(studentList);
    localStorage.setItem("studentList", myJSON);
    const allTableRows = document.querySelectorAll("#table-body tr");



})

//Helpers Functions
function validateForm(name, birthday, classVal) {
    const warningList = document.getElementsByClassName("text-danger");
    const removeAll = () => {
        for (let i = 0; i < warningList.length; i++) {
            warningList[i].classList.remove("d-none");
        }
    }
    const addAll = () => {
        for (let i = 0; i < warningList.length; i++) {
            warningList[i].classList.add("d-none");
        }
    }
    const removeSpecified = (i) => {
        warningList[i].classList.remove("d-none")
    }
    if (!name && !birthday && !classVal) {
        removeAll();
        return false;
    } else {
        addAll();
        if (name && birthday && classVal) {
            return true;
        } else {
            if (!name) {
                removeSpecified(0);
            }
            if (!birthday) {
                removeSpecified(1);
            }
            if (!classVal) {
                removeSpecified(2)
            }
            return false;
        }

    }
}

function calculateAverage(markArr) {
    let sum =0;
    for (let i=0; i < markArr.length;i++){
        sum+= markArr[i];
    }
    return (sum/markArr.length).toFixed(2);
}



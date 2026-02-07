// Jalanin setelah HTML siap
document.addEventListener("DOMContentLoaded", function () {
  var addBtn = document.getElementById("addBtn");
  var filter = document.getElementById("filter");

  addBtn.addEventListener("click", addTodo);
  filter.addEventListener("change", filterTodo);
});

function addTodo() {
  var taskInput = document.getElementById("task");
  var dateInput = document.getElementById("date");
  var list = document.getElementById("list");
  var error = document.getElementById("error");

  var task = taskInput.value.trim();
  var date = dateInput.value; // format internal: YYYY-MM-DD

  if (task === "" || date === "") {
    error.innerText = "Tugas dan tanggal harus diisi";
    return;
  }

  error.innerText = "";

  var li = document.createElement("li");
  li.setAttribute("data-date", date);

  var textSpan = document.createElement("span");
  textSpan.innerText = task + " - " + date;

  var deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.innerText = "Hapus";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    filterTodo();
  });

  li.appendChild(textSpan);
  li.appendChild(deleteBtn);
  list.appendChild(li);

  taskInput.value = "";
  dateInput.value = "";

  filterTodo();
}

function filterTodo() {
  var filter = document.getElementById("filter").value;
  var items = document.querySelectorAll("#list li");

  // today format: YYYY-MM-DD
  var today = new Date().toISOString().split("T")[0];

  items.forEach(function (item) {
    var itemDate = item.getAttribute("data-date");

    if (filter === "today") {
      item.style.display = (itemDate === today) ? "list-item" : "none";
    } else {
      item.style.display = "list-item";
    }
  });
}
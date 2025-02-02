let data = []; // data will be stored at run time

function store_as_temp_storage(name){
  sessionStorage.setItem("temp_store",JSON.stringify(name))
}

function clicked() {
  let user = document.getElementById("#username").value
  let password = document.getElementById("#password").value
  let i=0;
  let flag = true;
  while(i<data.length){
    if(data[i].user_name == user && data[i].user_password == password){
      store_as_temp_storage(user)
      location.href = "../html_pages/main.html";
      flag = false;
      break;
    }
    i++;
  }
  if(flag){
    alert("Invalid Password Or UserName");
  }
}

function admin_clicked() {
  window.location.href = "admin_login.html";
}

function get_data_from_DB(){
  let temp = JSON.parse(localStorage.getItem("user_detail"));
  if (temp != null) {
    for (let i = 0; i < temp.length; i++) {
      data.push(temp[i]);
    }
  }
}
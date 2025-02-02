let message = "";

get_admin_message();
winners_display();

function get_admin_message(){
  let temp = JSON.parse(localStorage.getItem("admin_operation"));
  if(temp != null){
    if(temp[0] == "Published"){
      message = temp[1];
    }else{
      message = "Re-Election"
      let temp = document.getElementById("heading")
      temp.innerHTML = "";
    }
  }else{
    message = "Not Yet Published"
    let temp = document.getElementById("heading")
    temp.innerHTML = "";
  }
}

function winners_display(){
  let name = document.getElementById("name")
  name.innerHTML = message;
}
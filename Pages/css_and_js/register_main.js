let id_s = ["#voterid", "#addhar", "#number", "#username", "#password"];
let original_data = [];
let values = ["voter_id","addhar_number","mobile_number","user_name","user_password"];

function post_data_to_DB(){
  localStorage.setItem("user_detail",JSON.stringify(original_data));
}

function get_data_from_DB() {
  let temp = JSON.parse(localStorage.getItem("user_detail"));
  if(temp != null){
    for(let i=0; i<temp.length; i++){
      original_data.push(temp[i]);
    }
  }
}

function clicked() {
  let local_data = {
    "voter_id":null,
    "addhar_number":null,
    "mobile_number":null,
    "user_name":null,
    "user_password":null
  };
  let element;
  let check_status = null;
  for (let i = 0; i < id_s.length; i++) {
    element = document.getElementById(id_s[i]).value;
    if (element != "") {
      if (id_s[i] === "#addhar" || id_s[i] === "#number") {
        try {
          let convert = parseInt(element);
          if (!isNaN(convert)) {
            local_data[values[i]] = convert;
          } else {
            alert("Invalid Numeric Data : " + id_s[i]);
            check_status = false;
            break;
          }
        } catch (e) {
          console.log(e);
          check_status = false;
          break;
        }
      } else {
        local_data[values[i]] = element;
      }
      check_status = true;
    } else {
      alert("Fill the form");
      break;
    }
    if (i == id_s.length - 1) {
      if (check_status) {
        alert("Registration Complete");
        original_data.push({...local_data});
        post_data_to_DB();
        document.getElementById("register_form").reset()
        location.href = "../html_pages/login.html"
      }
    }
  }
}
// ---------This file is used in front end.
const left_div = document.getElementById("left_part");
const content_of_candidades = document.getElementById("content_of_candidades");
const heading = document.getElementById("heading");

let user_credentials = [];
let candidates = [];
let name = "";



//-----------------------------------------------
// First step to fetch the data from the storage
get_candidates_from_DB(); 
// Second step to fetch the data of specific user who has logged in. from the session storage 
get_specfic_data();
//-----------------------------------------------


// -- Getting specific data
function get_specfic_data(){
  name = JSON.parse(sessionStorage.getItem("temp_store"))
  let users_data = JSON.parse(localStorage.getItem("user_detail"))
  if(users_data != null || users_data != []){
    for(let i=0; i<users_data.length; i++){
      if(users_data[i].user_name === name){
        user_credentials.push({...users_data[i]})
        display_user_details(name)
        display_candidates()
        break;
      }
    }
  }
}
// -- Fetching data of Candidate from data base to display the candidates in the front end.
function get_candidates_from_DB(){
  let temp = JSON.parse(localStorage.getItem("candidates"))
  if(temp != null){
    for(let i=0; i<temp.length; i++){
      candidates.push(temp[i])
    }
  }
}
// -- Display Candidates in the front end.
function display_candidates(){
  if(candidates != null){
    let div,h2,h4,hr,button;
    for(let i=0; i<candidates.length; i++){
      div = document.createElement("div")
      div.setAttribute("class","candidate_details")
      h2 = document.createElement("h2")
      h2.innerHTML = "Name : " + candidates[i].candidate_name;
      h4 = document.createElement("h4")
      h4.innerHTML = "Party : " + candidates[i].party_name;
      hr = document.createElement("hr")
      button = document.createElement("button")
      button.innerHTML = "VOTE"
      button.setAttribute("name",candidates[i].candidate_name)
      button.setAttribute("class","vote_button")
      button.setAttribute("onclick","vote(this.name)")
      div.appendChild(h2)
      div.appendChild(h4)
      div.appendChild(hr)
      div.appendChild(button)
      content_of_candidades.appendChild(div);
    }
  }
}
// -- Display user details  
function display_user_details(userName){
  let name = document.getElementById("name")
  let votter_id = document.getElementById("votter_id")
  let addhar_no = document.getElementById("addhar_no")
  let mobile_number = document.getElementById("mobile_number")
  let status = document.getElementById("status_of_vote")
  name.innerHTML = "Name : " + user_credentials[0]["user_name"]
  votter_id.innerHTML = "VoterID : " + user_credentials[0]["voter_id"]
  addhar_no.innerHTML = "Addhar No. : " + user_credentials[0]["addhar_number"]
  mobile_number.innerHTML = "Mobile No. : " + user_credentials[0]["mobile_number"]
  status.style.color = "black"
  let user_status = "";
  let voters = JSON.parse(localStorage.getItem("voters"));
  let bool_data = false;
  if(voters != null){
    for(let i=0; i<voters.length; i++){
      if(userName == voters[i]){
        bool_data = true;
        break;
      }
    }
    if(bool_data){
      status.innerHTML = "Status : " + "Voted"
      user_status = "Voted"
    }else{
      status.innerHTML = "Status : " + "Not Voted"
      user_status = "Not Voted"
    }
  }else{
    status.innerHTML = "Status : " + "Not Voted"
    user_status = "Not Voted"
  }
  sessionStorage.setItem("user_vote_status",JSON.stringify(user_status));
}
function logout(){
  if(confirm("Are you sure to exit..!")){
    location.href = "../../index.html"
    sessionStorage.clear();
  }
}
function navigate_to_home(){
  sessionStorage.clear();
  location.href = "../../index.html";
}
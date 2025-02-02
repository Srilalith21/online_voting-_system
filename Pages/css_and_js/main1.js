// ------ This file is used in Back-end
let vote_count_of_candidates = [];
let voted_users = [];

let user_name;
let user_vote_status;

get_vote_count_data_from_DB();

function get_details_of_vote_history(){
  let name =  JSON.parse(sessionStorage.getItem("temp_store"));
  let status = JSON.parse(sessionStorage.getItem("user_vote_status"));
  if(name != null && status != null){
    user_name = name;
    user_vote_status = status;
  }else{
    user_vote_status = "Not Voted";
  }
}

function get_voters_from_DB(){
  let temp = JSON.parse(localStorage.getItem("voters"));
  if(temp != null){
    for(let i=0; i<temp.length; i++){
      voted_users.push(temp[i]);
    }
  }else{
    localStorage.setItem("voters",JSON.stringify([]));
  }
}

function get_vote_count_data_from_DB(){
  let temp = JSON.parse(localStorage.getItem("vote_count"));
  if(temp != null){
    for(let i=0; i<temp.length; i++){
      vote_count_of_candidates.push(temp[i]);
    }
  }
}

// The Main part of the backend this is the function which is invoked when vote button is clicked 
function vote(candidateName){
  get_voters_from_DB();
  get_details_of_vote_history();
  if(user_vote_status == "Not Voted"){
    alert("voted");
    count_vote_for(candidateName);
    localStorage.setItem("vote_count",JSON.stringify(vote_count_of_candidates));
    voted_users.push(user_name);
    localStorage.setItem("voters",JSON.stringify(voted_users));
    location.reload()
  }else{
    alert("Cannot vote As you have already voted");
  }
}

function count_vote_for(name){
  for(let i=0; i<vote_count_of_candidates.length; i++){
    if(name == vote_count_of_candidates[i].name){
      vote_count_of_candidates[i].count += 1;
      break;
    }
  }
}

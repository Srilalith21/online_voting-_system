let winner_div = document.getElementById("candidate_winner");
let candidates_vote = [];
let announcement_name = "";
let announcement_party = "";
let key;

get_voters_count();
find_max_vote();
check_candidates();
display_winner();

function check_candidates(){
  let check = JSON.parse(localStorage.getItem("candidates"));
  if(check != null){
    key = true;
  }else{
    key = false;
  }
}

function display_winner(){
  if(key){
    let name_display = document.getElementById("name")
    // let party_display = document.getElementById("party")
    name_display.innerHTML = announcement_name;
    // party_display.innerHTML = announcement_party;
  }
}

function get_voters_count(){
  let temp = JSON.parse(localStorage.getItem("vote_count"));
  if(temp != null){
    for(let i=0; i<temp.length; i++){
      candidates_vote.push(temp[i]);
    }
  }
}

function find_max_vote(){
  let largest;
  let name;
  try {
    largest = candidates_vote[0].count;
    name = candidates_vote[0].name;
  } catch (error) {
    console.log("cannot fetch values");
  }
  // let party = candidates_vote[0].party;
  for(let i=0; i<candidates_vote.length-1; i++){
    if(largest <= candidates_vote[i+1].count){
      largest = candidates_vote[i+1];
      name = candidates_vote[i+1].name;
      party = candidates_vote[i+1].party;
    }
  }
  announcement_name = name;
  // announcement_party = party;
}

function publish_clicked(){
  if(key){
    let temp = ["Published",announcement_name];
    localStorage.setItem("admin_operation",JSON.stringify(temp));
    alert("Publish Successfull");
  }
}

function stop_clicked(){
  if(key){
    localStorage.removeItem("admin_operation")
  }
}

function re_election(){
  if(key){
    let temp = ["Re Election"];
    localStorage.setItem("admin_operation",JSON.stringify(temp));
    alert("Re-Election Successfull");
  }
}
const slide_bar = document.getElementById("#side_bar")
const img_evt = document.getElementById("#img")
const candidate_data_div = document.getElementById("#candidate_data_div")
const candidate_data_table_div = document.getElementById("#candidate_data_teble_div")
const table = document.getElementById("table")
let data = []; // This data will be fetched from Database
let election_dates = [];
let bool_val = false


function post_data_to_DB(data_value) {
    localStorage.setItem("candidates", JSON.stringify(data_value));
}

function get_value_from_DB() {
    let temp = JSON.parse(localStorage.getItem("candidates"));
    if (temp != null) {
      let i = 0;
      while (i < temp.length) {
        data.push(temp[i]);
        i++;
      }
    }
}

function get_election_date_from_DB(){
    let temp = JSON.parse(localStorage.getItem("election_date"))
    if(temp != null){
        for(let i=0; i<temp.length; i++){
            election_dates.push(temp[i])
        }
    }else{
        console.log("Error Occured While fetching data from DB of Election dates part.");
    }
}

function activate_evt(){
    if(bool_val){
        slide_bar.style.right = "100%"
        bool_val = false
    }else{
        slide_bar.style.right = "80%"
        bool_val = true
    }
}

function check_data(){
    get_value_from_DB()
    if(data[0] == null){
       return false
    }
    return true
}

function display_data(){
    let element;
    let p_name;
    let p_party;
    for(let i=0; i<data.length; i++){
        p_name = document.createElement("p")

        element = document.createElement("div")
        element.setAttribute("class","candidate")
        
        p_name.textContent = data[i].candidate_name
        p_name.setAttribute("class","p_name")
        
        p_party = document.createElement("p")
        p_party.textContent = data[i].party_name    
        p_party.setAttribute("class","p_party")
        
        p_name.appendChild(p_party)
        element.appendChild(p_name)

        if(data[i].party_name == "BJP"){
            element.style.backgroundColor = "#f28c55"
        }
        else if(data[i].party_name == "CONGRESS"){
            element.style.backgroundColor = "#5682e8"
        }else{
            element.style.backgroundColor = "#5e944b"
        }
        candidate_data_div.appendChild(element)
    }
}

function display(){
    if(check_data()){
        display_data()
        
    }else{
        candidate_data_div.style.height = "7rem"
        const element = document.createElement("h3")
        element.innerHTML = "No Candidates"
        element.style.textAlign = "center"
        element.style.fontFamily = "monospace"
        candidate_data_div.appendChild(element)
    }
}

function create_table_and_add_data(){
    get_election_date_from_DB();
    const storing_place = document.getElementById("tbody_el")
    let trow;
    let tdata1,tdata2;
    for(let i=0; i<election_dates.length; i++){
        trow = document.createElement("tr")
        tdata1 = document.createElement("td")
        tdata2 = document.createElement("td")
        tdata1.innerHTML = election_dates[i].date
        tdata2.innerHTML = election_dates[i].type_of_election
        trow.appendChild(tdata1)
        trow.appendChild(tdata2)
        storing_place.appendChild(trow)
    }
}

function check_candidates(){
    let temp = JSON.parse(localStorage.getItem("candidates"));
    if(temp == null || temp.length == 0){
        localStorage.removeItem("vote_count")
    }
}

function admin_logout(){
    localStorage.removeItem("admin");
    location.href = "../../index.html";
}

display();
create_table_and_add_data();
check_candidates();

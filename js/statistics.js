if (document.title === "Senate - TGIF") {
    url = "https://api.propublica.org/congress/v1/113/senate/members.json"
  } else if (document.title === "House - TGIF")  {
    url = "https://api.propublica.org/congress/v1/113/house/members.json"
  }



var statistics = {
  "number_of_republicans": 0,
  "number_of_democrats": 0,
  "number_of_independents": 0,
  "total_party": 0,

  "average_republicans":0,
  "average_democrats":0,
  "average_independents":0,
  "total_average":0,

  "attendance_Bottom":[],
  "attendance_Top":[],
  "loyal_Top": [],
  "loyal_Bottom": []
 };

  
 
 var app = new Vue({
  el: "#app",
  data: {
    statistics:statistics,
    attendance_Bottom:[],
    attendance_Top:[],
    loyal_Top: [],
    loyal_Bottom:[],
    members:[],
    memberTop:[],  

     republican : [],
     democrat : [],
     independent : [],
     arrayParty:[],
   },


created: function () {
  this.getData();
},
methods: {
  getData: function() {
  fetch(url,{
  method: 'GET',
     headers:{
        "X-API-Key": "B0XqY0T7xhm1JCRGP4GMP96DmFErfu3wWcm2uu4O"
     }
   })  
  .then(function (response) {
    if (response.ok)
      return response.json();
  })
  .then(function (data) {
      console.log(data);
      app.members = data.results[0].members; 
      app.senadores = app.members;
      app.initTable();
    
   }) 
  .catch(function (error) {
    //console.log(error);
  })
 },   
    
 initTable: function (){
 
  members = app.members;
  var arrayParty = [];
     
  var republican = app.members.filter(member => member.party == "R");
  var democrat = app.members.filter ( member => member.party == "D");
  var independent = app.members.filter(member => member.party == "I");


  statistics.number_of_republicans = republican.length;
  statistics.number_of_democrats = democrat.length;
  statistics.number_of_independents = independent.length;
  statistics.total_party = members.length;

  statistics.average_republicans = average(republican);
  statistics.average_democrats = average(democrat);
  statistics.average_independents = average(independent);
  statistics.total_average = average(members);

  statistics.attendance_Bottom = getLeastAndMostMembers(members, "missed_votes_pct", true);
  statistics.attendance_Top = getLeastAndMostMembers (members, "missed_votes_pct", false);
  statistics.loyal_Top = getLeastAndMostMembers(members, "votes_with_party_pct", false);
  statistics.loyal_Bottom = getLeastAndMostMembers(members, "votes_with_party_pct", true);

  function average (arrayParty){
    votedParty = 0;
    if(arrayParty.length == 0) return 0;
    arrayParty.forEach(function(member){
      votedParty += member.votes_with_party_pct
    }
    )
    voted = votedParty/arrayParty.length;
    return parseFloat(voted.toFixed(2));
  }

  function getLeastAndMostMembers(array, key, order) {
    let i = 0
    let percent = Math.round(array.length * 0.10);
    var memberTop = [];
    let arr = Array.from(array);
  
   arr.sort((a,b) => order ? a[key] - b[key] : b[key] - a[key])

    while (i < percent || arr[i][key] == arr[i + 1][key]) {
        memberTop.push(arr[i]);
    i++;
    }
  
     return memberTop;  
     
  }
   
  console.log(JSON.stringify(statistics,null,2));
 
  }, //fin initTable
} // cierra methods

});  //cierra Vue 

if (document.title === "Senate - TGIF") {
    url = "https://api.propublica.org/congress/v1/113/senate/members.json"
  } else if (document.title === "House - TGIF")  {
    url = "https://api.propublica.org/congress/v1/113/house/members.json"
  }



var members=[];
var senadores=[];

var app = new Vue({
  el: "#app",
  data: {
      members:[],
      senadores:[],
        },
   
  created: function () {
      this.getData();
  },
  methods: {
  getData: function() {
    fetch(url, {
        method: "GET",
         headers: {
                  "X-API-Key": "B0XqY0T7xhm1JCRGP4GMP96DmFErfu3wWcm2uu4O"
                }
          })
          .then(function (response) {
                 return response.json();
          })
          .then(function (data) {
            console.log(data);
            app.members = data.results[0].members; 
            
            app.senadores = app.members;
         
           app.filterMember();
           
          })
         
          .catch(function (error) {
              console.log(error);
          })
  
}, 
  
  filterMember: function() {
    
    var republican = document.getElementById("republican");
    var democrat = document.getElementById("democrat");
    var independent = document.getElementById("independent");
    var estado = document.getElementById("estado");
    
    
    var members = app.senadores;
    app.members =[];
   
    for (let i = 0; i < members.length; i++) {
      if (estado.value == members[i].state || estado.value == 'all' ) {
        if (republican.checked == true && members[i].party == "R") {
          app.members.push(members[i]);
        }
        if (democrat.checked == true && members[i].party == "D") {
          app.members.push(members[i]);
        }
        if (independent.checked == true && members[i].party == "I") {
          app.members.push(members[i]);
        }
        if (estado.value == members[i].state && (republican.checked == false && democrat.checked == false && independent.checked== false )) {
          app.members.push(members[i]);
        }
      }
    }
    var senadores=Array.from(app.members);
    console.log(senadores);
    
  }, //filterMember
 } //cierra method
})//cierra Vue

    

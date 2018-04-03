window.onload
//function dropdownOptions()
{
//unique values(city, state, etc) from list objects
    cities = Array.from(new Set(dataSet.map(c => c.city))); 
    states = Array.from(new Set(dataSet.map(s => s.state)));
    countries = Array.from(new Set(dataSet.map(s => s.country)));
    shapes = Array.from(new Set(dataSet.map(s => s.shape)));
    //append shape options
    var list = document.getElementById("shapeOptions");
    shapes.forEach(function(item){
        var option = document.createElement("option");
        option.value = item.toUpperCase();
        list.appendChild(option);
    });
    //append state options
    var list = document.getElementById("stateOptions");
    states.forEach(function(item){
        var option = document.createElement("option");
        option.value = item.toUpperCase();
        list.appendChild(option);
    });
    //append country options
    var list = document.getElementById("country");
    countries.forEach(function(item){
        var option = document.createElement("option");
        option.value = item.toUpperCase();
        option.text = item.toUpperCase();
        list.appendChild(option);
    });

}
       
function getUFOSighting(){
  var filterCriteria = {};
  var inputIds=["datetime", "country", "state", "city", "shape"]; 
  //get values of all filter criteria
  inputIds.map(f => filterCriteria[f]=document.getElementById(f).value);
  //delete non-selected filter option
  Object.keys(filterCriteria).forEach((key) => (filterCriteria[key] == "") && delete filterCriteria[key]);
  //array of user filter
  arrFilterOptions = Object.entries(filterCriteria);
  //filter dataset per user criteria
  if (arrFilterOptions.length > 0){
      //filterByUserCriteria(filterCriteria);
      var arrByCriteria = dataSet;
      for(var i=0; i<arrFilterOptions.length; i++){
          if(arrFilterOptions[i][0]=="city"){
            var arrByCriteria = arrByCriteria.filter(f => f[arrFilterOptions[i][0]].includes(arrFilterOptions[i][1].toLowerCase()));
          }
          else{
            var arrByCriteria = arrByCriteria.filter(f => f[arrFilterOptions[i][0]]===arrFilterOptions[i][1].toLowerCase());
          }
      }
      if (arrByCriteria.length === 0){
          alert("No UFO sighting(s) found!")
          return true;
      }
      else{
        displaySighting(arrByCriteria);
      }
    }
    else{
        alert("Please enter search criteria");
    }
    return false;
}

function displaySighting(queryResults){ 
    var sightings = document.getElementById("sightingsTable");
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    var table = document.createElement("table");
    table.className+="table table-bordered table-sm table-responsive";

    var tr = document.createElement("tr");
    tr.style+="text-align: right;";
    var theaders = Object.keys(dataSet[0]);

    for (var i=0; theaders.length > i; i++){
        var th = document.createElement("th");
        var h = theaders[i];
        var txt = h.charAt(0).toUpperCase() + h.slice(1);
        th.append(txt);
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    table.appendChild(thead);
    sightings.innerHTML = " ";
    sightings.appendChild(table);
   /*<thead>
        <tr style="text-align: right;">
        <th>Date/time</th>
        <th style="width: 80px">City</th>
        <th>State</th>
        <th>Country</th>
        <th>Shape</th>
        <th>Comment</th>
        </tr>
    </thead>*/
    
    for (var i=0; i<queryResults.length; i++){
        var tr = document.createElement("tr");
        var content = [queryResults[i].datetime, queryResults[i].city, queryResults[i].state, queryResults[i].country, queryResults[i].shape, queryResults[i].durationMinutes, queryResults[i].comments]
        for (var j=0; j<7; j++){
            var td = document.createElement("td");
            if (j==1 || j==4){
                var propCaseContent = content[j].split(" ").map(function(w) {return w.charAt(0).toUpperCase() + w.slice(1)}).join(" ");
                var txt = document.createTextNode(propCaseContent); 
            }
            else if (j>1 && j<=3){
                var txt = document.createTextNode(content[j].toUpperCase()); 
            }
            else{
                var txt = document.createTextNode(content[j]);
            }
            td.appendChild(txt);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        table.appendChild(tbody);
    }
    return true;
   
}

function selectOnlyThis(id){
    var myCheckbox = document.getElementsByName("myCheckbox");
    Array.prototype.forEach.call(myCheckbox,function(el){
        el.checked = false;
    });
    id.checked = true;
}
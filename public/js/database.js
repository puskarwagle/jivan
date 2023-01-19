window.onload = function showtablenames() {
  fetch('/table-names')
    .then(response => response.json())
    .then(tableNames => {
      const divB = document.getElementById('dataAllTables');
      tableNames.forEach(tableName => {
        const clientS = document.createElement('div');
        clientS.className = "clientS";
        const clientName = document.createElement('b');
        clientName.textContent = (tableNames.indexOf(tableName) + 1) + ". " + tableName;
        clientS.appendChild(clientName);
        // Get the rows for this table
        fetch(`/table-rows/${tableName}`)
          .then(response => response.json())
          .then(data => {
            data.data.forEach(row => {
            	//const rowString = JSON.stringify(row);
            	console.log(row);
            	const rowAdmission = document.createElement('span');
              rowAdmission.textContent = row.admission;
              clientS.appendChild(rowAdmission);
              
            	const rowFather = document.createElement('span');
              rowFather.textContent = row.father;
              clientS.appendChild(rowFather);
              
            	const rowSubstances = document.createElement('span');
              rowSubstances.textContent = row.substances;
              clientS.appendChild(rowSubstances);
              
              console.log(row.clientImageDefault)
              const rowClientImage = document.createElement('img');
              rowClientImage.src = row.clientImageDefault + '.jpg';
              rowClientImage.alt = row.name;
              clientS.appendChild(rowClientImage);
            });
           	divB.appendChild(clientS);
          });
      });
    })
    .catch(error => {
      console.error(error);
    });
};







// date function
let dateNow = document.querySelector('#uniqueId');
dateNow.value = Date.now();

// upoad image function
function uploadImg(){
	let clientImg = document.querySelector('#clientImg');
	let clientName = document.querySelector('#name');
	clientImg.src = './images/clients/' + clientName.value;
}

console.log("hi");

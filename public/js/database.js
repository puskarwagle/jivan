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
            	const propertiesToDisplay = ["name", "dob", "age", "education", "profession"];
							Object.entries(row)
    					.filter(([property, value]) => propertiesToDisplay.includes(property))
    					.forEach(([property, value]) => {
    					const rowProperty = document.createElement('span');
    					rowProperty.textContent = `${value}`;
    					clientS.appendChild(rowProperty);
						 });
            data.data.forEach(row => {
            	const propertiesToDisplay = ["name", "dob", "age", "education", "profession", "father", "mother", "spouse", "address", "contact1", "contact2", "years", "maritial", "substances", "admittedBy", "health", "diseases", "weight", "medication", "clientImageDefault"];
							const editForm = document.createElement('form');
							Object.entries(row)
    					.filter(([property, value]) => propertiesToDisplay.includes(property))
    					.forEach(([property, value]) => {
    							const editField = document.createElement('field');
    							const editLabel = document.createElement('label');
    							editLabel.htmlFor = `${property}`;
    							const editInput = document.createElement('input');
    							editInput.type = 'text';
    							editInput.name = `${property}`;
    							editInput.value = `${value}`;
    						editForm.appendChild(editLabel);
    						editForm.appendChild(editInput);
						 });
					clientS.appendChild(editForm);
						 });
					divB.appendChild(clientS);
            });
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

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
              const propertiesToDisplay = ["name", "dob", "age", "education", "profession", "father", "mother", "spouse", "address", "contact1", "contact2", "years", "maritial", "substances", "admittedBy", "health", "diseases", "weight", "medication", "clientImageDefault"];
              const editForm = document.createElement('form');
              editForm.id = 'modifyForm';
              editForm.action = '/submit-form-data';
              editForm.method = 'post';
              Object.entries(row).filter(([property, value]) => propertiesToDisplay.includes(property)).forEach(([property, value]) => {
                const editField = document.createElement('div');
                const editLabel = document.createElement('label');
                editLabel.htmlFor = `${property}`;
                editLabel.textContent = `${property}` + ':';
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.name = `${property}`;
                editInput.value = `${value}`;
                editField.appendChild(editLabel);
                editField.appendChild(editInput);
                editForm.appendChild(editField);
              });
              const submitForm = document.createElement('input');
              submitForm.type = 'submit';
              editForm.appendChild(submitForm);
              clientS.appendChild(editForm);
            });
            divB.appendChild(clientS);
          });
      });
    })
    .catch(error => {
      console.error(error);
    });
};



// generateUniqueId() function
function generateUniqueId() {
	const cletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const sletters = "abcdefghijklmnopqrstuvwxyz";
	const timestamp = Date.now().toString().substr(-4);
	const randomLetter1 = cletters[Math.floor(Math.random() * cletters.length)];
	const randomLetter2 = sletters[Math.floor(Math.random() * sletters.length)];
	const uniqueId = randomLetter1 + timestamp + randomLetter2;
	return uniqueId;
};
let uniqueId = generateUniqueId();
let dateNow = document.querySelector('#uniqueId');
dateNow.value = uniqueId;



// upoad image function
function uploadImg(){
	let clientImg = document.querySelector('#clientImg');
	let clientName = document.querySelector('#name');
	clientImg.src = './images/clients/' + clientName.value;
}

console.log("hi");

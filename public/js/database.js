// Function 1 - Show all table names
function showTableNames() {
  fetch('/table-names')
    .then(response => response.json())
    .then(tableNames => {
    console.log('1');
      const divB = document.getElementById('dataAllTables');
      tableNames.forEach(tableName => {
        const clientS = document.createElement('div');
        clientS.className = "clientS";
        const clientName = document.createElement('b');
        clientName.textContent = (tableNames.indexOf(tableName) + 1) + ". " + tableName;
        clientS.appendChild(clientName);
        divB.appendChild(clientS);
        console.log('2');
      });
    })
};
window.onload = showTableNames;


// Fetch tablerows as per tablenames 
function showTableRows(tableName) {
  fetch(`/table-rows/${tableName}`)
    .then(response => response.json())
    .then(data => {
      const divB = document.getElementById('dataAllTables');
      divB.innerHTML = '';
      data.data.forEach(row => {
        const propertiesToDisplay = ["id", "name", "dob", "age", "education", "profession", "father", "mother", "spouse", "address", "contact1", "contact2", "years", "maritial", "substances", "admittedBy", "health", "diseases", "weight", "medication", "clientImageDefault"];
        const editForm = document.createElement('form');
        editForm.id = 'modifyForm';
        editForm.action = '/submit-form-data';
        editForm.method = 'post';
        Object.entries(row).filter(([property, value]) => propertiesToDisplay.includes(property)).forEach(([property, value]) => {
          const editField = document.createElement('fieldset');
          const editLabel = document.createElement('label');
          editLabel.htmlFor = `${property}`;
          editLabel.textContent = `${property[0].toUpperCase()}${property.slice(1)}` + ':';
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
        submitForm.classList.add("submit-button");
        editForm.appendChild(submitForm);
        divB.appendChild(editForm);
        
        const backButton = document.createElement('button');
				backButton.textContent = 'All Clients';
				backButton.id = 'back-button';
				backButton.onclick = function() {
  				showTableNames();
				};
				divB.appendChild(backButton);
      });
    })
};
// Event listener to show rows for selected table
document.getElementById('dataAllTables').addEventListener('click', (event) => {
	if (event.target.tagName === 'B') {
		const tableName = event.target.textContent.split('. ')[1];
		showTableRows(tableName);
	}
});

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

$(document).ready(function(){
  $('.clientS').click(function(){
  	console.log("workig");
    $('#modifyForm').toggle(400);
  });
});

// upoad image function
function uploadImg(){
	let clientImg = document.querySelector('#clientImg');
	let clientName = document.querySelector('#name');
	clientImg.src = './images/clients/' + clientName.value;
}

console.log("hi");

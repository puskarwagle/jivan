// Function 2 Get the names of Clients
function showRowNames() {
  fetch('/row-names')
    .then(response => response.json())
    .then(rowNames => {
      const divB = document.getElementById('dataAllTables');
      rowNames.forEach(rowName => {
        const clientS = document.createElement('div');
        clientS.className = "clientS";
        const clientName = document.createElement('b');
        clientName.textContent = (rowNames.indexOf(rowName) + 1) + ". " + rowName;
        clientS.appendChild(clientName);
        divB.appendChild(clientS);
      });
    })
};
window.onload = showRowNames;
console.log("here");


function showClientsRows(name) {
  fetch(`/clients-rows?name=${name}`)
    .then(response => response.json())
    .then(data => {
      const divB = document.getElementById('dataAllTables');
      divB.innerHTML = '';
      data.data.forEach(row => {
        // create the form and input fields as before
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
        submitForm.textContent = 'Update';
        submitForm.classList.add("submit-button");
        editForm.appendChild(submitForm);
        divB.appendChild(editForm);
        
          const backButton = document.createElement('button');
				backButton.textContent = 'All Clients';
				backButton.id = 'back-button';
				backButton.onclick = function() {
            document.getElementById('modifyForm').remove();
            document.getElementById('deleteButton').remove();
  				  showRowNames();
           };
        // create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = `Delete ${row.name}`;
        deleteButton.id = 'deleteButton';
        deleteButton.onclick = function() {
          fetch('/delete-row', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: row.name }),
    }).then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            deleteButton.innerHTML = row.name + ' Deleted';
            deleteButton.style.backgroundColor = 'white';
            deleteButton.style.color = 'red';
        }
    });
        };
         divB.appendChild(backButton);
         divB.appendChild(deleteButton);
      });
    })
};
// Event listener to show rows for selected table
document.getElementById('dataAllTables').addEventListener('click', (event) => {
	if (event.target.tagName === 'B') {
		const rowName = event.target.textContent.split('. ')[1];
		showClientsRows(rowName);
	}
});

/*

*/

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
};

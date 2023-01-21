const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/formdata.db');
const errorHandler = require('errorhandler');
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler());

app.post("/submit-form", async (req, res) => {
  try {
    const formData = req.body;
    let tableName = formData.name;
    tableName = tableName.replace(/ /g, "_");
    const currentDate = new Date();
    const dob = new Date(formData.dob);
    const age = currentDate.getFullYear() - dob.getFullYear();
    const clientImageDefault = `.//images/clients/${tableName}`;
    Object.entries(formData).forEach(([key, value]) => {
    if (!value) {
        formData[key] = "null";
  	  }
		});
    await new Promise((resolve, reject) => {
      db.run(
        `CREATE TABLE ${tableName} ( id TEXT, name TEXT, dob DATE, age INTEGER, education TEXT, profession TEXT, father TEXT, mother TEXT, spouse TEXT, address TEXT, contact1 INTEGER, contact2 INTEGER, years INTEGER, maritial TEXT, substances TEXT, admittedBy TEXT, health TEXT, diseases TEXT, weight INTEGER, medication TEXT, clientImageDefault TEXT )`,
        (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
    // Insert the data into the table with the calculated age
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO ${tableName} (id, name, dob, age, education, profession, father, mother, spouse, address, contact1, contact2, years, maritial, substances, admittedBy, health, diseases, weight, medication, clientImageDefault) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [formData.id, formData.name, formData.dob, age, formData.education, formData.profession, formData.father, formData.mother, formData.spouse, formData.address, formData.contact1, formData.contact2, formData.years, formData.maritial, formData.substances, formData.admittedBy, formData.health, formData.diseases, formData.weight, formData.medication, clientImageDefault],
        function(err) {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
    res.json({
      message: "Form data inserted successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occured while inserting data"
    });
  } finally {
    db.close();
  }
});


// get all the table names from the database table-namesPOST
app.get('/table-names', (req, res) => {
	db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
			}
	let tableNames = rows.map(row => row.name);
	res.json(tableNames);
	});
});

app.get('/table-rows/:tableName', (req, res) => {
	const tableName = req.params.tableName;
	const query = `SELECT * FROM ${tableName}`;
	db.all(query, (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
	res.json({ data: rows });
	});
});




//these are the technologies im using to create my web-based app and database: javascript, node.js, express.js, fs module, ejs template engine and sqlite3
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
              const propertiesToDisplay = ["id", "name", "dob", "age", "education", "profession", "father", "mother", "spouse", "address", "contact1", "contact2", "years", "maritial", "substances", "admittedBy", "health", "diseases", "weight", "medication", "clientImageDefault"];
              const editForm = document.createElement('form');
              editForm.id = 'modifyForm';
              editForm.action = '/submit-form-data';
              editForm.method = 'post';
              Object.entries(row).filter(([property, value]) => propertiesToDisplay.includes(property)).forEach(([property, value]) => {
                const editField = document.createElement('fieldset');
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
              submitForm.classList.add("submit-button");
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
//these are the name and type of the form inputs that goes inside the database
const formInputs = {
    id: 'number',
    name: 'text',
    admission: 'date',
    age: 'number',
    education: 'text',
    profession: 'text',
    father: 'text',
    mother: 'text',
    spouse: 'text',
    address: 'text',
    contact1: 'number',
    contact1: 'number',
    years: 'number',
    maritial: 'radio',
    substances: 'checkbox',
    admittedBy: 'radio',
    health: 'radio',
    diseases: 'text',
    weight: 'number',
    medication: 'text'
    clientImageDefault
};


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
          editLabel.textContent = `${property} + ':'`;
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
      });
    });
};

// Function 1 - Show all table names
function showTableNames() {
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
        });
    });
};

// Initial call to show all table names
window.onload = showTableNames;

// Event listener to show rows for selected table
document.getElementById('dataAllTables').addEventListener('click', (event) => {
	if (event.target.tagName === 'B') {
		const tableName = event.target.textContent.split('. ')[1];
		showTableRows(tableName);
	}
});

// to call the function when click on the table name




//this is my server side code. I have sqlite3, express.js, ejs, errorhandler packages installed. in the form i want to get all the names of the tables in the database. Modify the codes to add that functionality. the database file is ./database/form-data.db: 

// serarch through the database with the given keyword
document.querySelector('#queryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const queryType = "search";
    const keyword = formData.get('query');
    let url = '/query';
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ queryType, keyword })
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            // Handle the response here
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
	});

// get the table
document.querySelector("#queryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const queryType = formData.get("queryType");
    const tableName = formData.get("tableName");
    const keyword = formData.get("query");
    let url = "/query";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ queryType, tableName, query }),
    };
	fetch(url, options)
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('#dataDivResults');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    
    const headers = Object.keys(data.data[0]);
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    // Populate the table with data
    data.data.forEach(row => {
      const tr = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = row[header];
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    // Add the table to the container
    container.appendChild(table);
  })
  .catch(error => {
    console.error(error);
  });
});

//Search and select keyword
app.post('/query', (req, res) => {
const queryType = req.body.queryType;
const keyword = req.body.keyword;
const tableName = req.body.tableName;
switch (queryType) {
    case 'search':
        db.all(`SELECT * FROM all_tables WHERE column_name LIKE '%${keyword}%'`, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ data: rows });
        });
        break;
    case 'table':
        db.all(`SELECT * FROM ${tableName} WHERE column_name LIKE '%${keyword}%'`, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ data: rows });
        });
        break;
    default:
        // Return an error message if the query type is not recognized
        res.status(400).json({ error: 'Invalid query type' });
}
});
//these are the technologies im using to create my web-based app and database: javascript, node.js, express.js, fs module, ejs template engine and sqlite3

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

//below is my server-side code to insert the form (form id='cientForm', inside views/pages/database.ejs) data into the database:
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
    const tableNames = await new Promise((resolve, reject) => {
      db.all(
        'SELECT name FROM sqlite_master WHERE type="table"',
        (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
    });
    let isNameExist = false;
    tableNames.forEach((row) => {
      if (row.name === tableName) {
        isNameExist = true;
      }
    });
    if (isNameExist) {
      return res
        .status(400)
        .json({ error: "A table with the same name already exists" });
    }

    await new Promise((resolve, reject) => {
      db.run(
        `CREATE TABLE ${tableName} (
            id INTEGER,
            name TEXT,
            admission DATE,
            dob DATE,
            age INTEGER,
            education TEXT,
            profession TEXT,
            father TEXT,
            mother TEXT,
            spouse TEXT,
            address TEXT,
            contact1 INTEGER,
            contact2 INTEGER,
            years INTEGER,
            maritial TEXT,
            substances TEXT,
            admittedBy TEXT,
            health TEXT,
            diseases TEXT,
            weight INTEGER,
            medication TEXT
            clientImage TEXT DEFAULT "public/images/clients/${tableName}.jpg"
        )`,
        (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });

    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO ${tableName} (id, name, admission, age, education, profession, father, mother, spouse, address, contact1, contact2, years, maritial, substances, admittedBy, health, diseases, weight, medication) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
        	formData.id,
          formData.name,
          formData.admission,
          formData.age,
          formData.education,
          formData.profession,
          formData.father,
          formData.mother,
          formData.spouse,
          formData.address,
          formData.contact1,
          formData.contact2,
          formData.years,
          formData.maritial,
          formData.substances,
          formData.admittedBy,
          formData.health,
          formData.diseases,
          formData.weight,
          formData.medication,
          clientImageDefault
        ],
        function (err) {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
   await fs.promises.appendFile("./database/form-data.json", JSON.stringify(formData, null, 2) + "\n\n", "utf8")
.then(() => {
res.json({ message: 'Form data saved to ./database/form-data.json' });
}).catch((err) => {
console.error(err);
next(err);
});
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occured while inserting data" });
  } finally {
    db.close();
  }
});



whats wrong?
app.get('/table-names', (req, res) => {
  db.all(`SELECT name FROM sqlite_master WHERE type='table'`, (err, rows) => {
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
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json({ data: results });
    }
  });
});

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
            data.forEach(row => {
              const rowDiv = document.createElement('div');
              rowDiv.textContent = JSON.stringify(row);
              clientS.appendChild(rowDiv);
            });
          });
          
        divB.appendChild(clientS);
      });
    })
    .catch(error => {
      console.error(error);
    });
};









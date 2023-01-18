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

// get all the table names from the database table-namesPOST
app.get('/table-names', (req, res) => {
  db.all(`SELECT name FROM sqlite_master WHERE type='table'`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    let tableNames = rows.map(row => row.name);
    res.json(tableNames);
  });
});

//sending the tableName rows data to the dataDivResults queryPOST
app.post('/query', (req, res) => {
  const queryType = req.body.queryType;
  const tableName = req.body.tableName;
  const keyword = req.body.keyword;
  switch (queryType) {
      case 'select':
          db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
              if (err) {
                  return res.status(500).json({ error: err.message });
              }
              res.json({ data: rows });
            });
            break;
      case 'search':
          db.all(`SELECT * FROM all_tables WHERE column_name LIKE '%${keyword}%'`, (err, rows) => {
              if (err) {
                  return res.status(500).json({ error: err.message });
              }
              // Render the results page and pass the results to it
              res.json({ results: rows });
            });
            break;
        default:
            res.status(400).json({ error: 'Invalid query type' });
  }
});



// All The Routes
app.get('/', async (req, res) => {
    res.render('pages/index', {
    });
});
app.get('/About', async (req, res) => {
    res.render('pages/About', {
    });
});
app.get('/Team', async (req, res) => {
    res.render('pages/Team', {
    });
});
app.get('/Faq', async (req, res) => {
    res.render('pages/Faq', {
    });
});
app.get('/Gallery', async (req, res) => {
    res.render('pages/Gallery', {
    });
});
app.get('/Treatment', async (req, res) => {
    res.render('pages/Treatment', {
    });
});
app.get('/InitialAssessmenT', async (req, res) => {
    res.render('pages/InitialAssessment', {
    });
});
app.get('/Detox', async (req, res) => {
    res.render('pages/Detox', {
    });
});
app.get('/TreatmentPrograms', async (req, res) => {
    res.render('pages/TreatmentPrograms', {
    });
});
app.get('/FamilyMeetings', async (req, res) => {
    res.render('pages/FamilyMeetings', {
    });
});
app.get('/Testimonials', async (req, res) => {
    res.render('pages/Testimonials', {
    });
});
app.get('/Contact', async (req, res) => {
    res.render('pages/Contact', {
    });
});


app.get('/Login', async (req, res) => {
    res.render('pages/Login', {
    });
});
app.get('/Database', async (req, res) => {
    res.render('pages/Database', {
    });
});
app.get('/results', (req, res) => {
    console.log(req.body); // check the value of req.body here
   	res.render('results', { results: rows });
});

app.listen(PORT, () => {
    console.log(`Rehab App is now listening on: http://localhost:${PORT}`)
});
// export 'app'
module.exports = app;

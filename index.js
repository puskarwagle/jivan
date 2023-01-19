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
    // Get the form data
    const formData = req.body;
    let tableName = formData.name;
    tableName = tableName.replace(/ /g, "_");
    // Get the current date
    const currentDate = new Date();
    // Get the date of birth from the form data
    const dob = new Date(formData.dob);
    // Calculate the age of the client
    const age = currentDate.getFullYear() - dob.getFullYear();
    const clientImageDefault = `public/images/clients/${tableName}.jpg`;
    // Create the table with the added "clientImage" and "age" columns
    await new Promise((resolve, reject) => {
      db.run(
        `CREATE TABLE ${tableName} (
            id INTEGER,
            name TEXT,
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
            medication TEXT,
            clientImage TEXT DEFAULT ${clientImageDefault}

        )`,
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
        `INSERT INTO ${tableName} (id, name, dob, age, education, profession, father, mother, spouse, address, contact1, contact2, years, maritial, substances, admittedBy, health, diseases, weight, medication, clientImage) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          formData.id,
          formData.name,
          formData.dob,
          age,
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
clientImage
],
function (err) {
if (err) {
reject(err);
}
resolve();
}
);
});
res.json({ message: "Form data inserted successfully" });
} catch (err) {
console.error(err);
res.status(500).json({ error: "Error occured while inserting data" });
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

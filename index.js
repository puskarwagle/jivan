const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/formData.db');
const multer = require('multer');
const errorHandler = require('errorhandler');
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler());

// 1. Submitting the Main form

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/clients/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.name.replace(/ /g, "_")}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
});

const upload = multer({ storage });

app.post("/submit-form", upload.single('image'), async (req, res) => {
  try {
    const formData = req.body;
    const currentDate = new Date();
    const dob = new Date(formData.dob);
    formData.age = currentDate.getFullYear() - dob.getFullYear();
    formData.clientImageDefault = `/images/clients/${req.file.filename}`;
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        formData[key] = "null";
      }
    });
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Clients (id, name, dob, age, education, profession, father, mother, spouse, address, contact1, contact2, years, maritial, substances, admittedBy, health, diseases, weight, medication, clientImageDefault) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [formData.id, formData.name, formData.dob, formData.age, formData.education, formData.profession, formData.father, formData.mother, formData.spouse, formData.address, formData.contact1, formData.contact2, formData.years, formData.maritial, formData.substances, formData.admittedBy, formData.health, formData.diseases, formData.weight, formData.medication, formData.clientImageDefault],
        function(err) {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
    res.status(201).json({
       message: "Form data inserted successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occured while inserting data"
    });
  } finally {
   // db.close();
  }
});



// 2. get all the table names from the database table-namesPOST
app.get('/row-names', (req, res) => {
  db.all("SELECT name FROM Clients", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    let rowNames = rows.map(row => row.name);
    res.json(rowNames);
  });
});

// Delete the row
app.post('/delete-row', (req, res) => {
  const { name } = req.body;
  db.run(`DELETE FROM clients WHERE name = "${name}"`, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: `${name} deleted` });
  });
});


// 3. Get the data of selected row
app.get('/clients-rows', (req, res) => {
	const name = req.query.name;
	const query = `SELECT * FROM Clients WHERE name = '${name}'`;
	db.all(query, (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json({ data: rows });
	});
});


// 4. Modify form
app.post("/submit-form-data", async (req, res) => {
	try {
		const formData = req.body;
		const currentDate = new Date();
		const dob = new Date(formData.dob);
		const age = currentDate.getFullYear() - dob.getFullYear();
		Object.entries(formData).forEach(([key, value]) => {
			if (!value) {
				formData[key] = "null";
			}
		});
		let setString = "";
		Object.entries(formData).forEach(([key, value]) => {
			if (key !== "id") {
				setString += `${key} = '${value}', `;
			}
		});
		setString = setString.slice(0, -2);
		let query = `UPDATE Clients SET ${setString} WHERE id = '${formData.id}'`;
		await new Promise((resolve, reject) => {
			db.run(query, (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
		res.json({
			message: "Form data updated successfully"
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Error occured while updating data"
		});
	} finally {
		// db.close();
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

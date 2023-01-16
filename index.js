const express = require('express');
const ejs = require('ejs');
const PORT = process.env.PORT || 4000;
// const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('formdata.db');


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/submit-form', (req, res) => {
    try {
        // Access the form data
        const formData = req.body;
        let tableName = formData.name;
        // Replace spaces with underscores
        tableName = tableName.replace(/ /g, "_");
        // Create a table using the input name
        db.run(`CREATE TABLE ${tableName} (
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
        )`);

        // Insert form data into the table
        db.run(`INSERT INTO clients (id, name, admission, age, education, profession, father, mother, spouse, address, contact1, contact2, years, maritial, substances, admittedBy, health, diseases, weight, medication) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
                [formData.id, formData.name, formData.admission, formData.age, formData.education, formData.profession, formData.father, formData.mother, formData.spouse, formData.address, formData.contact1, formData.contact2, formData.years, formData.maritial, formData.substances, formData.admittedBy, formData.health, formData.diseases, formData.weight, formData.medication],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                    console.log(`A row has been inserted with rowid ${this.lastID}`);
                });
        res.json({ message: 'Form data saved to form-data.db' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error occured while inserting data" });
    }
});

app.post('/run-query', (req, res) => {
    try {
        // Get the query from the form
        const query = req.body.query;

        // Run the query on the database
        db.all(query, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error running query" });
            }

            // Render the results template and pass the rows to it
            res.render('results', { rows });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error occured while running query" });
    }
});

app.post('/run-query', (req, res) => {
    // Get the query type and query from the form data
    const queryType = req.body.queryType;
    const query = req.body.query;

    // Use a switch statement to handle the different query types
    switch (queryType) {
        case 'select':
            // Run the SELECT query and return the results
            db.all(query, (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                // Render the results page and pass the results to it
                res.render('results', { results: rows });
            });
            break;
        case 'insert':
            // Run the INSERT query and return a message
            db.run(query, (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Data inserted successfully' });
            });
            break;
        case 'update':
            // Run the UPDATE query and return a message
            db.run(query, (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Data updated successfully' });
            });
            break;
        case 'delete':
            // Run the DELETE query and return a message
            db.run(query, (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Data deleted successfully' });
            });
            break;
        default:
            // Return an error message if the query type is not recognized
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

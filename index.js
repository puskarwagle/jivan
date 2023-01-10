var express = require('express');
const ejs = require('ejs');
const PORT = process.env.PORT || 4000;
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Rehab App is now listening on: http://localhost:${PORT}`)
})
// Route Route
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

// export 'app'
module.exports = app;

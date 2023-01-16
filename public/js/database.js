document.querySelector('#queryForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.target);
    const queryType = formData.get('queryType');
    const tableName = formData.get('tableName');
    const query = formData.get('query');

    // Prepare the query based on the query type
    let url = '/query';
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ queryType, tableName, query })
    };

    // Execute the query
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

console.log("hi");

// date function
let dateNow = document.querySelector('#uniqueId');
dateNow.value = Date.now();

// upoad image function
function uploadImg(){
	let clientImg = document.querySelector('#clientImg');
	let clientName = document.querySelector('#name');
	clientImg.src = './images/clients/' + clientName.value;
}




//	fs.appendFile('clientForm1.json', myJSON, function (err) {
//  		if (err) throw err;
//  		console.log('Saved!');
//		});
//	}

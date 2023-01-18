// fetching data and creating a table to display the specified table queryPOST 
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
        body: JSON.stringify({ queryType, tableName, query })
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


    // Get the form data search
document.querySelector('#queryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const queryType = "search";
    const keyword = formData.get('query');

    // Prepare the query based on the query type
    let url = '/query';
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ queryType, keyword })
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


// Update the form with the table names table-namesPOST
window.onload = function() {
  fetch('/table-names')
    .then(response => response.json())
    .then(tableNames => {
      const select = document.querySelector('#tableName');
      tableNames.forEach(tableName => {
        const option = document.createElement('option');
        option.value = tableName;
        option.text = tableName;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

// date function
let dateNow = document.querySelector('#uniqueId');
dateNow.value = Date.now();

// upoad image function
function uploadImg(){
	let clientImg = document.querySelector('#clientImg');
	let clientName = document.querySelector('#name');
	clientImg.src = './images/clients/' + clientName.value;
}

console.log("hi");

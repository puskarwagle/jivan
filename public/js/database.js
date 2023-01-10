
// const fs = require('fs');
// import { fs } from 'fs';
let dateNow = document.querySelector('#uniqueId');
dateNow.value = Date.now();

function uploadImg(){
	let clientImg = document.querySelector('#clientImg');
	let clientName = document.querySelector('#name');
	clientImg.src = './images/clients/' + clientName.value;
}




function handleSubmit(e) {
  e.preventDefault();
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());

  value.Substances = data.getAll("Substances");
  value.AdmittedBy = data.getAll("AdmittedBy");
  value.Health = data.getAll("Health");
  	console.log('added' , { value });

	let pre = document.querySelector('#dataDiv pre');  
  pre.textContent = '\n' + JSON.stringify(value, '\t', 2);
  

//		fs.appendFile('clientForm1.json', myJSON, function (err) {
//  		if (err) throw err;
//  		console.log('Saved!');
//		});
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

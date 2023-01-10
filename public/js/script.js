console.log("hiii");

$('[lang="ne"]').hide();
$('#toggle').click(function() {
  $('[lang="ne"]').toggle();
  $('[lang="en"]').toggle();
});

//SkyBlue
const jasta1 = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
				//console.log(entry)
				if (entry.isIntersecting) {
						entry.target.classList.add("SkyBlueSh");
				}
		});
});
const jastas1 = document.querySelectorAll(".SkyBlueHi");
jastas1.forEach((el) => jasta1.observe(el));




// Dit is het array waarmee je de dropdown box moet opvullen (i.e. het <select> element)
const colors=["LightGrey","PaleGreen","LightBlue","Yellow"];

// NIET VERGETEN : roep de setup functie op zodra de browser klaar is met het inladen van de pagina.

const setup = () => {
	let cbxColor = document.getElementById("cbxColor");
	for (let i = 0; i < colors.length; i++){
		cbxColor.insertAdjacentHTML("beforeend", `<option>${colors[i]}</option>`);
	}

	let controls = document.getElementById("controls");
	controls.insertAdjacentHTML("beforeend", '<input id="btnClear" type="button" value="Remove all notes">');

	let btnAdd = document.getElementById("btnAdd");
	btnAdd.addEventListener("click", createNote);

	let btnClear = document.getElementById("btnClear");
	btnClear.addEventListener("click", removeAllNotes);
};

const createNote = () => {
	let notes = document.getElementById("notes");
	let txtDescription = document.getElementById("txtDescription");
	let cbxColor = document.getElementById("cbxColor");
	const iso=new Date().toISOString().substr(11,8);
	notes.insertAdjacentHTML("beforeend", `<div class="note" style="background-color: ${cbxColor.value};">
																																<h1>${txtDescription.value}</h1>
																																<p>${iso}</p>
																															</div>`);

	txtDescription.value = "";
	updateCountInfo();

	let note = document.getElementsByClassName("note");
	for (let j = 0; j < note.length; j++){
		note[j].addEventListener("click", removeNote);
	}
};

const updateCountInfo = () => {
	// deze functie past de teller aan
	// en (indien nodig) toont/verbergt ze ook de ganse informatie regel

	let countInfo = document.getElementById("countInfo");
	let txtCountNotes = document.getElementById("txtCountNotes");
	let note = document.getElementsByClassName("note");

	if (note.length === 0){
		countInfo.classList.add("hidden");
	} else {
		countInfo.classList.remove("hidden");
		txtCountNotes.innerText = note.length;
	}
};

const removeNote = (event) => {
    // voor deze functie mag je zelf kiezen welke parameter(s) je nodig hebt,
    // dit hangt nml. af van hoe je de event handling aanpakt
		let notes = document.getElementById("notes");
		let selectedNote = event.target;

		let parentOfSelectedNode = selectedNote.parentNode;

		let heeftKlasse = parentOfSelectedNode.classList.contains("note");
		if (heeftKlasse){
			notes.removeChild(parentOfSelectedNode)
		} else {
			notes.removeChild(selectedNote);
		}

		updateCountInfo();
};

const removeAllNotes = () => {
	// voor deze functie mag je zelf kiezen welke parameter(s) je nodig hebt,
	// dit hangt nml. af van hoe je de event handling aanpakt

	let note = document.getElementsByClassName("note");
	let notes = document.getElementById("notes");

	for (let i = note.length; i > 0; i--){
		notes.removeChild(note[0]);
		updateCountInfo();
	}
};

window.addEventListener("load", setup);
window.addEventListener("load", updateCountInfo);


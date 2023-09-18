const setup = () => {
	let controls = document.getElementById("controls");
	controls.insertAdjacentHTML("beforeend", '<button id="btnClear"><i class="fa-solid fa-trash"></i> Remove all notes</button>');

	let btnAdd = document.getElementById("btnAdd");
	btnAdd.addEventListener("click", createNote);

	let btnClear = document.getElementById("btnClear");
	btnClear.addEventListener("click", removeAllNotes);
};

const createNote = () => {
	let notes = document.getElementById("notes");
	let txtTitle = document.getElementById("txtTitle");
	let txtDescription = document.getElementById("txtDescription");
	let color;
	let Colors = document.querySelector('input[name="options"]:checked');
	if (Colors != null){
		color = Colors.value;
	};
	const iso=new Date().toISOString().substr(11,8);
	notes.insertAdjacentHTML("beforeend", `<div class="note" style="background-color: ${color};">
																																<h1>${txtTitle.value}</h1>
																																<p>${txtDescription.value}</p>
																																<p class="time">${iso}</p>
																															</div>`);

	Colors.checked = false;
	txtTitle.value = "";
	txtDescription.value = "";
	updateCountInfo();

	let note = document.getElementsByClassName("note");
	for (let j = 0; j < note.length; j++){
		note[j].addEventListener("click", removeNote);
	}
};

const updateCountInfo = () => {
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
	let note = document.getElementsByClassName("note");
	let notes = document.getElementById("notes");

	for (let i = note.length; i > 0; i--){
		notes.removeChild(note[0]);
		updateCountInfo();
	}
};

window.addEventListener("load", setup);
window.addEventListener("load", updateCountInfo);


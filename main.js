var tareas = [];


var Pendiente = function(tarea) {
	var fecha = new Date();
	this.texto = tarea;
	this.finalizada = false;
	this.creado = fecha;
	this.id = tareas.length;
	this.eliminar = () => {
		tareas.splice(this.id);
		renderPendientes();
	};
	this.completar = () => {
		tareas[this.id].finalizada = true;
		renderPendientes();
	}
}

function renderPendientes() {
	var contenedor = document.querySelector('div#tareas');
	contenedor.innerHTML = '';
	var pendientes = 0;
	var titulo = document.createElement('h2')
	if(tareas.length > 0) {
		contenedor.append(titulo)
		for(tarea of tareas) {
			var taskParagraph = document.createElement('p');
			taskParagraph.setAttribute('data-tareas', tarea.id);
			if(tarea.finalizada) {
				taskParagraph.innerHTML = `<del>${tarea.texto}</del>`;
			}
			else {
				pendientes += 1;
				taskParagraph.innerHTML = `${tarea.texto}`;
			}
			var completarTarea = document.createElement('span');
			completarTarea.innerHTML = '✅';
			completarTarea.setAttribute('data-tareas', tarea.id);
			function completar() {
				tareas[document.querySelector('[data-tareas="' + tarea.id + '"]').dataset.tareas].completar();
				document.querySelector('span[data-tareas="' + tarea.id +'"]').style.display = "none";
			}
			completarTarea.addEventListener('click', completar)
			contenedor.append(taskParagraph)
			taskParagraph.append(completarTarea)
			contenedor.append(document.createElement('br'))
		}
		titulo.innerHTML = `${pendientes} tareas pendientes: `
	}
	else {
		var vacio = document.createElement('p')
		vacio.innerHTML = 'No hay tareas pendientes 🤔'
		vacio.style.fontSize = '5vw';
		contenedor.append(vacio)
	}	
}

function renderDOM() {
	var app = document.querySelector('div#app');
	app.style = 'padding-top: 1rem; padding-left: 0.5rem; padding-right: 0.5rem;'
	var formulario = document.createElement('form');

	var bar = document.createElement('nav');
	formulario.setAttribute('class', 'fixed-bottom d-flex p-3')

	formulario.addEventListener('submit', (e) => e.preventDefault())
	var input = document.createElement('input');
	input.setAttribute('id', 'input');
	input.setAttribute('class', 'flex-fill shadow-lg bg-white rounded')

	var submitButton = document.createElement('button');
	submitButton.setAttribute('class', 'btn btn-success')
	//submitButton.innerHTML = 'Submit';
	submitButton.innerText = '✈'

	var resetButton = document.createElement('button');
	resetButton.setAttribute('class', 'btn btn-danger mx-1')
	resetButton.setAttribute('type', 'reset')
	resetButton.innerHTML = 'X';

	var tareasContenedor = document.createElement('div');
	tareasContenedor.setAttribute('class', 'container');
	tareasContenedor.setAttribute('id', 'tareas')



	submitButton.addEventListener('click', (event) => {
		addToList();
	})

	document.body.append(bar)
	app.appendChild(tareasContenedor)
	app.append(formulario)
	formulario.appendChild(input)
	formulario.append(resetButton)
	formulario.appendChild(submitButton)

}



function addToList() {
	if(input.value !== "") {
		tareas[tareas.length] = new Pendiente(input.value);
		input.value = ""
		//console.log(tareas)
		renderPendientes();
	}
	else {
		alert('El campo de texto esta vacio')
	}
}


renderDOM();
renderPendientes();
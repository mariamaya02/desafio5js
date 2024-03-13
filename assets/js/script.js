const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const cuentaTareasT = document.querySelector("#total");
const cuentaTareasR = document.querySelector("#realizadas");
const listaTareas = document.querySelector("#tableBody");
let id = 3;

const tareas = [
  {
    id: 1,
    name: "Hacer mercado",
    status: false,
  },
  {
    id: 2,
    name: "Estudiar para la prueba",
    status: false,
  },
  {
    id: 3,
    name: "Sacar a pasear a Tobby",
    status: false,
  },
];

function contarRealizadas() {
  let contador = 0;
  tareas.forEach((tarea) => {
    if (tarea.status === true) {
      contador += 1;
    }
  });
  cuentaTareasR.textContent = contador;
}

renderTareas();

function renderTareas() {
  let html = "";
  for (let tarea of tareas) {
    if (tarea.status === false) {
      html += `
<tr>
<td>${tarea.id}</td>
<td>${tarea.name}</td>
<td><button onclick="modificar(${tarea.id})"> ✓ </button></td>
<td><button onclick="borrar(${tarea.id})"> X </button></td>
</tr>`;
    } else {
      html += `
    <tr>
    <td>${tarea.id}</td>
    <td style="text-decoration: line-through">${tarea.name}</td>
    <td><button onclick="modificar(${tarea.id})"> Completado </button></td>
    <td><button onclick="borrar(${tarea.id})"> X </button></td>
    </tr>`;
    }
  }
  listaTareas.innerHTML = html;
  cuentaTareasT.textContent = `${tareas.length}`;
  contarRealizadas();
}

btnAgregar.addEventListener("click", () => {
  id += 1;
  const nuevaTarea = { id: id, name: tareaInput.value, status: false };
  tareas.push(nuevaTarea);
  tareaInput.value = "";
  renderTareas();
});

function borrar(id) {
  const index = tareas.findIndex((ele) => ele.id == id);
  tareas.splice(index, 1);
  renderTareas();
}

function modificar(id) {
  const index = tareas.findIndex((ele) => ele.id == id);
  if (tareas[index].status === false) {
    tareas.splice(index, 1, {
      id: tareas[index].id,
      name: tareas[index].name,
      status: true,
    });
  } else {
    tareas.splice(index, 1, {
      id: tareas[index].id,
      name: tareas[index].name,
      status: false,
    });
  }
  renderTareas();
}

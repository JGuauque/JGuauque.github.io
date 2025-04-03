// Variables globales
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Elementos del DOM
const tareaInput = document.getElementById('tareaInput');
const agregarBtn = document.getElementById('agregarBtn');
const listaTareas = document.getElementById('listaTareas');

// Función para renderizar tareas
function renderizarTareas() {
    listaTareas.innerHTML = '';
    tareas.forEach((tarea, index) => {
        const tareaDiv = document.createElement('div');
        tareaDiv.className = `tarea-item ${tarea.completada ? 'completada' : ''}`;
        tareaDiv.innerHTML = `
            <span>${tarea.texto}</span>
            <button onclick="eliminarTarea(${index})">🗑️</button>
            <button onclick="toggleCompletada(${index})">${tarea.completada ? '❌' : '✓'}</button>
        `;
        listaTareas.appendChild(tareaDiv);
    });
}
// Función para editar tareas
function habilitarEdicion() {
    listaTareas.addEventListener('dblclick', (e) => {
        if (e.target.tagName === 'SPAN') {
            const tareaDiv = e.target.parentElement;
            const index = Array.from(listaTareas.children).indexOf(tareaDiv);
            const nuevoTexto = prompt('Editar tarea:', tareas[index].texto);
            
            if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
                tareas[index].texto = nuevoTexto.trim();
                guardarEnLocalStorage();
                renderizarTareas();
            }
        }
    });
}
// Añadir tarea
agregarBtn.addEventListener('click', () => {
    const texto = tareaInput.value.trim();
    if (texto) {
        tareas.push({ texto, completada: false });
        tareaInput.value = '';
        guardarEnLocalStorage();
        renderizarTareas();
    }
});

// Eliminar tarea
window.eliminarTarea = (index) => {
    tareas.splice(index, 1);
    guardarEnLocalStorage();
    renderizarTareas();
};

// Marcar como completada
window.toggleCompletada = (index) => {
    tareas[index].completada = !tareas[index].completada;
    guardarEnLocalStorage();
    renderizarTareas();
};

// Guardar en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
// Inicializar
renderizarTareas();
//inicializar
habilitarEdicion();



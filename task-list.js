const readline = require('readline');

// Definición de la clase Task
class Task {
  constructor(indicator, description, completed = false) {
    this.indicator = indicator;
    this.description = description;
    this.completed = completed;
  }
}

// Array para almacenar las tareas
const taskList = [];

// Función para añadir una tarea a la lista
function addTask(indicator, description) {
  const newTask = new Task(indicator, description);
  taskList.push(newTask);
  console.log(`Tarea "${newTask.description}" añadida con el indicador "${newTask.indicator}".`);
}

// Función para eliminar una tarea de la lista
function deleteTask(indicator) {
  const taskIndex = taskList.findIndex(task => task.indicator === indicator);
  if (taskIndex !== -1) {
    const deletedTask = taskList.splice(taskIndex, 1)[0];
    console.log(`Tarea "${deletedTask.description}" eliminada.`);
  } else {
    console.log(`No se encontró ninguna tarea con el indicador "${indicator}".`);
  }
}

// Función para marcar una tarea como completada
function completeTask(indicator) {
  const task = taskList.find(task => task.indicator === indicator);
  if (task) {
    task.completed = true;
    console.log(`La tarea "${task.description}" ha sido completada.`);
  } else {
    console.log(`No se encontró ninguna tarea con el indicador "${indicator}".`);
  }
}

// Crear interfaz readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú y solicitar una opción
function showMenu() {
  console.log('\n-- Menú --');
  console.log('1. Añadir tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Completar tarea');
  console.log('4. Salir');
  console.log('----------');

  rl.question('Selecciona una opción: ', answer => {
    processOption(answer);
  });
}

// Función para procesar la opción seleccionada
function processOption(option) {
  switch (option) {
    case '1':
      rl.question('Indicador de la tarea: ', indicator => {
        rl.question('Descripción de la tarea: ', description => {
          addTask(indicator, description);
          showMenu();
        });
      });
      break;
    case '2':
      rl.question('Indicador de la tarea a eliminar: ', indicator => {
        deleteTask(indicator);
        showMenu();
      });
      break;
    case '3':
      rl.question('Indicador de la tarea a completar: ', indicator => {
        completeTask(indicator);
        showMenu();
      });
      break;
    case '4':
      rl.close();
      break;
    default:
      console.log('Opción no válida. Por favor, selecciona una opción válida.');
      showMenu();
      break;
  }
}

// Iniciar la aplicación mostrando el menú
showMenu();

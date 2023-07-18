const readline = require('readline');

class Task {
  constructor(indicator, description, completed = false) {
    this.indicator = indicator;
    this.description = description;
    this.completed = completed;
  }
}

const taskList = [];

function addTask(indicator, description) {
  return new Promise((resolve, reject) => {
    const newTask = new Task(indicator, description);
    taskList.push(newTask);
    resolve(`Tarea "${newTask.description}" añadida con el indicador "${newTask.indicator}".`);
  });
}

function deleteTask(indicator) {
  return new Promise((resolve, reject) => {
    const taskIndex = taskList.findIndex(task => task.indicator === indicator);
    if (taskIndex !== -1) {
      const deletedTask = taskList.splice(taskIndex, 1)[0];
      resolve(`Tarea "${deletedTask.description}" eliminada.`);
    } else {
      reject(`No se encontró ninguna tarea con el indicador "${indicator}".`);
    }
  });
}

function completeTask(indicator) {
  return new Promise((resolve, reject) => {
    const task = taskList.find(task => task.indicator === indicator);
    if (task) {
      task.completed = true;
      resolve(`La tarea "${task.description}" ha sido completada.`);
    } else {
      reject(`No se encontró ninguna tarea con el indicador "${indicator}".`);
    }
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function showMenu() {
  console.log('\n-- Menú --');
  console.log('1. Añadir tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Completar tarea');
  console.log('4. Salir');
  console.log('----------');

  const answer = await askQuestion('Selecciona una opción: ');
  await processOption(answer);
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function processOption(option) {
  switch (option) {
    case '1':
      const indicator = await askQuestion('Indicador de la tarea: ');
      const description = await askQuestion('Descripción de la tarea: ');
      try {
        const result = await addTask(indicator, description);
        console.log(result);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
      await showMenu();
      break;
    case '2':
      const indicatorToDelete = await askQuestion('Indicador de la tarea a eliminar: ');
      try {
        const result = await deleteTask(indicatorToDelete);
        console.log(result);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
      await showMenu();
      break;
    case '3':
      const indicatorToComplete = await askQuestion('Indicador de la tarea a completar: ');
      try {
        const result = await completeTask(indicatorToComplete);
        console.log(result);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
      await showMenu();
      break;
    case '4':
      rl.close();
      break;
    default:
      console.log('Opción no válida. Por favor, selecciona una opción válida.');
      await showMenu();
      break;
  }
}

showMenu();

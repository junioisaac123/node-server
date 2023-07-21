const express = require('express');
const app = express();

// Array de tareas
const tasks = [
  { id: 1, description: 'Hacer la compra', completed: false },
  { id: 2, description: 'Limpiar la casa', completed: true },
  { id: 3, description: 'Estudiar para el examen', completed: false }
];

// Ruta para obtener las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Iniciar el servidor
const port = 8000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

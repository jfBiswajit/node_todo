const fs = require('fs');
const chalk = require('chalk');

// Helper function
const loadNote = () => {
  try {
    const dataBuffer = fs.readFileSync('note.json');
    const dataStr = dataBuffer.toString();
    const data = JSON.parse(dataStr);
    return data;
  } catch {
    return [];
  }
}

const save = notes => {
  const data = JSON.stringify(notes);
  fs.writeFileSync('note.json', data);
}

// Main function
const addTask = (title, body) => {
  const notes = loadNote();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    save(notes);
    console.log(chalk.inverse.green('Task added!'));
  } else {
    console.log(chalk.yellow.inverse('Task exist!'));
  }
}

const removeTask = (title) => {

  const notes = loadNote();
  const noteToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > noteToKeep.length) {
    console.log(chalk.green.inverse('Task removed!'));
    save(noteToKeep)
  } else {
    console.log(chalk.red.inverse('Task not found!'));
  }
}

const showTaskList = () => {
  const notes = loadNote();
  console.log(chalk.inverse('Task List'));
  notes.forEach(note => {
    console.log(note);
  });
}

const readTask = function(title) {
  try {
    const notes = loadNote();
    const task = notes.find(note => note.title === title);
    console.log(chalk.inverse.magenta(task.title));
    console.log(task.body);
  } catch {
    console.log(chalk.inverse.red('Task not found!'));
  }
}

module.exports = {
  addTask: addTask,
  removeTask: removeTask,
  showTaskList: showTaskList,
  readTask: readTask
}
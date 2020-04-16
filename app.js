const yargs = require('yargs');
const utilities = require('./utilities');

yargs.command({
  command: 'add',
  describe: 'add new task',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    utilities.addTask(argv.title, argv.body);
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove an existing task',
  builder: {
    title: {
      describe: 'Remove a task',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    utilities.removeTask(argv.title);
  }
});

yargs.command({
  command: 'list',
  describe: 'Show all uncompleted task list',
  handler() {
    utilities.showTaskList();
  }
});

yargs.command({
  command: 'read',
  describe: 'Read a particular task',
  builder: {
    title: {
      describe: 'Read task',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    utilities.readTask(argv.title);
  }
});

yargs.parse();
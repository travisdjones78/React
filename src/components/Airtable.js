const Airtable = require('airtable');

const base = new Airtable({
  apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`
}).base(`${process.env.REACT_APP_AIRTABLE_BASE_ID}`);

const CreateTodo = (data) => {
  base('todos').create([data], function (err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log('new', record.getId());
    });
  });
}

const UpdateTodo = ({ data, todoId }) => {
  base('todos').update(todoId, data, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.get('DIfficulty'));
  });
}

const DeleteOneTodo = (data) => {
  base('todos').destroy(data, function (err, deletedRecord) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(deletedRecord.Title, 'was deleted');
  });
}

module.exports = {
  DeleteOneTodo,
  UpdateTodo,
  CreateTodo
}
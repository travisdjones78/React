const todoList = [
  {
    id: '1',
    title: 'Record Music'
  },
  {
    id: '2',
    title: 'Write Code'
  },
  {
    id: '3',
    title: 'Connect Wires'
  }
]

function App() {
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <ul>
        {todoList.map(item => {
          return <li key={item.id}>
            <span>{item.title}</span>
          </li>
        })}
      </ul>
    </div>
  );
}

export default App;

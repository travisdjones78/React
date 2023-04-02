import { React, useEffect, useState } from "react";
import ToDoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const localData = JSON.parse(localStorage.getItem('savedTodoList'))
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      }
    })
      .then(result => result.json())
      .then(result => {
        setTodoList(result.records)
        setIsLoading(false)
      })
  }, [])
  console.log(process.env)
  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    }
  }, [todoList])

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  const removeTodo = (id) => {
    const newList = todoList.filter(
      item => item.id !== id
    )
    setTodoList(newList)
  }

  return (
    <>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {(isLoading === true)
        ? <p>Loading....</p>
        : <ToDoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
        />
      }
    </>
  );
}

export default App;



const newLis = [
  {
    "Title": "get myself together",
    "id": 1678311154730
  },
  {
    "Title": "Rebuild Windows OS'",
    "id": 1678311188546
  },
  {
    "Title": "dig deeper",
    "id": 1678311429933
  },
  [
    {
      "Title": "get myself together",
      "id": 1678311154730
    },
    {
      "Title": "Rebuild Windows OS'",
      "id": 1678311188546
    },
    {
      "Title": "dig deeper",
      "id": 1678311429933
    }
  ],
  [
    {
      "Title": "get myself together",
      "id": 1678311154730
    },
    {
      "Title": "Rebuild Windows OS'",
      "id": 1678311188546
    },
    {
      "Title": "dig deeper",
      "id": 1678311429933
    }
  ],
  [
    {
      "id": "rec3V9Y8tQnJSXBXU",
      "createdTime": "2023-03-29T09:30:38.000Z",
      "fields": {
        "Title": "Write new code"
      }
    },
    {
      "id": "recFGJKr9kjplOucO",
      "createdTime": "2023-03-29T09:28:23.000Z",
      "fields": {
        "Title": "Get Path In Focus"
      }
    },
    {
      "id": "recQzYdUF65TaaJc0",
      "createdTime": "2023-03-29T09:31:17.000Z",
      "fields": {
        "Title": "Gain Knowledge"
      }
    }
  ],
  [
    {
      "id": "rec3V9Y8tQnJSXBXU",
      "createdTime": "2023-03-29T09:30:38.000Z",
      "fields": {
        "Title": "Write new code"
      }
    },
    {
      "id": "recFGJKr9kjplOucO",
      "createdTime": "2023-03-29T09:28:23.000Z",
      "fields": {
        "Title": "Get Path In Focus"
      }
    },
    {
      "id": "recQzYdUF65TaaJc0",
      "createdTime": "2023-03-29T09:31:17.000Z",
      "fields": {
        "Title": "Gain Knowledge"
      }
    }
  ],
  [
    {
      "id": "rec3V9Y8tQnJSXBXU",
      "createdTime": "2023-03-29T09:30:38.000Z",
      "fields": {
        "Title": "Write new code"
      }
    },
    {
      "id": "recFGJKr9kjplOucO",
      "createdTime": "2023-03-29T09:28:23.000Z",
      "fields": {
        "Title": "Get Path In Focus"
      }
    },
    {
      "id": "recQzYdUF65TaaJc0",
      "createdTime": "2023-03-29T09:31:17.000Z",
      "fields": {
        "Title": "Gain Knowledge"
      }
    }
  ],
  [
    {
      "id": "rec3V9Y8tQnJSXBXU",
      "createdTime": "2023-03-29T09:30:38.000Z",
      "fields": {
        "Title": "Write new code"
      }
    },
    {
      "id": "recFGJKr9kjplOucO",
      "createdTime": "2023-03-29T09:28:23.000Z",
      "fields": {
        "Title": "Get Path In Focus"
      }
    },
    {
      "id": "recQzYdUF65TaaJc0",
      "createdTime": "2023-03-29T09:31:17.000Z",
      "fields": {
        "Title": "Gain Knowledge"
      }
    }
  ]
]
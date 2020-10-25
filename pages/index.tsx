// @ts-nocheck
import Head from "next/head";
import { useState, useReducer } from "react";
import { todoReducer } from "../reducers/todoReducer";
import TaskForm from "../components/TaskForm";
import TaskList, { TaskType } from "../components/TaskList";
import { isIdExist, validateInput, useTodoAPI } from "../helpers/todo-helper";

export default function Home() {
  const [state, dispatch] = useReducer(todoReducer, {
    nextId: 1,
    todos: [],
  });

  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const toggleComplete = (id: number) => {
    if (isIdExist(id, state.todos)) {
      dispatch({
        type: "TOGGLE_COMPLETE",
        id,
      });
    }
  };

  const addTask = (task: string) => {
    if (validateInput(task)) {
      dispatch({
        type: "ADD_TASK",
        payload: {
          id: state.nextId,
          task,
          completed: false,
        },
      });
    }
  };

  const removeTask = (id: number) => {
    if (isIdExist(id, state.todos)) {
      dispatch({
        type: "REMOVE_TASK",
        id,
      });
    }
  };

  const onSave = (task: string) => {
    if (isIdExist(selectedTask?.id, state.todos) && validateInput(task)) {
      const payload = { ...selectedTask, task };
      dispatch({
        type: "EDIT_TASK",
        id: selectedTask.id,
        payload,
      });
      setSelectedTask(null);
    }
  };

  const onClickEdit = (taskObject: TaskType) => {
    setSelectedTask(taskObject);
  };

  const onSearch = (keyword: string) => {
    if (keyword && keyword.trim()) {
      dispatch({
        type: "FILTER_TASK",
        payload: keyword,
      });
    } else {
      dispatch({ type: "REFRESH_TODO" });
    }
  };

  return (
    <div className='container'>
      <Head>
        <title>Todo Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1 className='title'>Todo Next.js App</h1>
        <div className='task-section'>
          <TaskForm
            onSubmit={(text) => (selectedTask ? onSave(text) : addTask(text))}
            selectedTask={selectedTask}
          />
          <TaskList
            data={state.todos}
            onClickEdit={onClickEdit}
            removeTask={removeTask}
            toggleComplete={toggleComplete}
            selectedTask={selectedTask}
            onSearch={onSearch}
          />
        </div>
      </main>

      <style jsx>{`
        .container {
          padding: 0 0.5rem;
        }

        .title {
          text-align: center;
        }

        .task-section {
          margin: 50px auto;
          padding: 1.5rem;
          border: 1px solid #f0f0f0;
          border-radius: 4px;
          min-width: 480px;
          max-width: 720px;
          background-color: #fff;
          border-top-color: #00b894;
          border-top-width: 4px;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
          outline: none;
        }
      `}</style>
    </div>
  );
}

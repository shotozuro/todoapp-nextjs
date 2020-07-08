import Head from 'next/head';
import { useState, useReducer } from 'react';
import { todoReducer } from '../reducers/todoReducer';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState();
  const [state, dispatch] = useReducer(todoReducer, { nextId: 1, todos: [] });
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);

  const onChangeTask = (e) => {
    setTask(e.target.value);
  };

  const toggleComplete = (id) => {
    dispatch({
      type: 'TOGGLE_COMPLETE',
      id,
    });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (task) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          id: state.nextId,
          task,
          completed: false,
        },
      });
      setTask('');
    }
  };

  const removeTask = (id) => {
    dispatch({
      type: 'REMOVE_TASK',
      id,
    });
  };

  const onClickEdit = (id) => {
    const getTodo = state.todos.find((todo) => todo.id === id);
    setTask(getTodo.task);
    setEditId(id);
  };

  const onSave = (e) => {
    e.preventDefault();
    const payload = { id: editId, task };
    dispatch({
      type: 'EDIT_TASK',
      id: editId,
      payload,
    });
    setEditId(null);
    setTask('');
  };

  return (
    <div className='container'>
      <Head>
        <title>Todo Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='title'>Todo Next.js App</h1>

        <div className='grid'>
          <div className='card tasks'>
            <section className='new-task-form'>
              <h3>New Task</h3>
              <form onSubmit={editId ? onSave : addTask}>
                <input
                  type='text'
                  name='task'
                  value={task}
                  onChange={onChangeTask}
                />
                <button className='btn-submit' type='submit'>
                  {editId ? 'Save' : 'Add'}
                </button>
              </form>
            </section>
            <section className='task-list'>
              <ul>
                {state.todos.map((todo) => {
                  return (
                    <li key={todo.id}>
                      <span
                        className={`task${todo.completed && ' completed'}`}
                        onClick={() => toggleComplete(todo.id)}
                      >
                        {todo.task}
                      </span>
                      <button onClick={() => onClickEdit(todo.id)}>Edit</button>
                      <button onClick={() => removeTask(todo.id)}>
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        .tasks {
          min-width: 480px;
          background-color: #f5f5f5;
        }

        .completed {
          text-decoration-line: line-through;
        }

        .date-item {
          height: 40px;
          width: 40px;
          border: none;
        }

        .date-item :hover {
          background-color: red;
        }

        .btn-submit {
          background-color: #6ab04c;
          height: 36px;
          border-radius: 4px;
          min-width: 80px;
          border: 1px solid #badc58;
          color: #fff;
        }

        input {
          height: 36px;
          padding: 0 4px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
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
        }
      `}</style>
    </div>
  );
}

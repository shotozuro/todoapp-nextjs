import { todoReducer } from '../reducers/todoReducer';

describe('Add Todo', () => {
  const initialState = {
    nextId: 1,
    todos: [],
  };

  it('could add a new task to todo list', () => {
    const state = todoReducer(initialState, {
      type: 'ADD_TASK',
      payload: { id: 1, task: 'Meeting with supervisor', completed: false },
    });
    expect(state.nextId).toBe(2);
    expect(state.todos.length).toBe(1);
    expect(state.todos).toStrictEqual([
      { id: 1, task: 'Meeting with supervisor', completed: false },
    ]);
  });

  it('could remove a task with given id', () => {
    const currentState = {
      nextId: 3,
      todos: [
        {
          id: 1,
          task: 'Meeting with clients',
          completed: false,
        },
        {
          id: 2,
          task: 'Meeting with boss',
          completed: false,
        },
      ],
    };
    const state = todoReducer(currentState, {
      type: 'REMOVE_TASK',
      id: 1,
    });
    expect(state.todos.length).toBe(1);
    expect(state.todos).toStrictEqual([
      { id: 2, task: 'Meeting with boss', completed: false },
    ]);
  });
});

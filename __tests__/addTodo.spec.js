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

  it('could not add to the list if task only contains space character', () => {
    const state = todoReducer(initialState, {
      type: 'ADD_TASK',
      payload: { id: 1, task: '  ', completed: false },
    });
    expect(state.nextId).toBe(1);
    expect(state.todos.length).toBe(0);
    expect(state.todos).toStrictEqual([]);
  });

  it('could not add to the list if task is empty', () => {
    const state = todoReducer(initialState, {
      type: 'ADD_TASK',
      payload: { id: 1, task: '', completed: false },
    });
    expect(state.nextId).toBe(1);
    expect(state.todos.length).toBe(0);
    expect(state.todos).toStrictEqual([]);
  });
});

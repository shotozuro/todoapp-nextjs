import { todoReducer } from '../reducers/todoReducer';

describe('Edit Todo', () => {
  const initialState = {
    nextId: 4,
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
      {
        id: 3,
        task: 'Go to book store',
        completed: false,
      },
    ],
  };

  it('could edit task if the todo with given id exist', () => {
    const state = todoReducer(initialState, {
      type: 'EDIT_TASK',
      id: 2,
      payload: { id: 2, task: 'Take a rest', completed: false },
    });
    expect(state.nextId).toBe(4);
    expect(state.todos.length).toBe(3);
    expect(state.todos).toStrictEqual([
      {
        id: 1,
        task: 'Meeting with clients',
        completed: false,
      },
      {
        id: 2,
        task: 'Take a rest',
        completed: false,
      },
      {
        id: 3,
        task: 'Go to book store',
        completed: false,
      },
    ]);
  });

  // TODO: add new test case for edit using validation

  // it('could not edit task if it only contains space character', () => {
  //   const state = todoReducer(initialState, {
  //     type: 'EDIT_TASK',
  //     id: 3,
  //     payload: { id: 3, task: '  ', completed: false },
  //   });
  //   expect(state.nextId).toBe(4);
  //   expect(state.todos.length).toBe(3);
  //   expect(state.todos).toStrictEqual([...initialState.todos]);
  // });

  // it('could not add to the list if task is empty', () => {
  //   const state = todoReducer(initialState, {
  //     type: 'EDIT_TASK',
  //     id: 1,
  //     payload: { id: 1, task: '', completed: false },
  //   });
  //   expect(state.nextId).toBe(4);
  //   expect(state.todos.length).toBe(3);
  //   expect(state.todos).toStrictEqual([...initialState.todos]);
  // });
});

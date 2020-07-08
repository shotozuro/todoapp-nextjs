import { todoReducer } from '../reducers/todoReducer';

describe('toggle complete TODO', () => {
  const currentState = {
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

  it('could set complete status to be true', () => {
    const state = todoReducer(currentState, {
      type: 'TOGGLE_COMPLETE',
      id: 2,
    });
    expect(state.todos.length).toBe(3);
    expect(state.todos[1].completed).toBe(true);

    expect(state.todos).toStrictEqual([
      {
        id: 1,
        task: 'Meeting with clients',
        completed: false,
      },
      {
        id: 2,
        task: 'Meeting with boss',
        completed: true,
      },
      {
        id: 3,
        task: 'Go to book store',
        completed: false,
      },
    ]);
  });

  it('set completed status to be false if the task with given id has completed', () => {
    const todoWithCompleted = {
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
          completed: true,
        },
        {
          id: 3,
          task: 'Go to book store',
          completed: false,
        },
      ],
    };
    const state = todoReducer(todoWithCompleted, {
      type: 'TOGGLE_COMPLETE',
      id: 2,
    });
    expect(state.todos.length).toBe(3);
    expect(state.todos[1].completed).toBe(false);
    expect(state.todos).toStrictEqual([
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
    ]);
  });

  it('would not set completed status if the given id does not exist in the list', () => {
    const state = todoReducer(currentState, {
      type: 'TOGGLE_COMPLETE',
      id: 4,
    });
    expect(state.todos.length).toBe(3);
    expect(state.todos).toStrictEqual(currentState.todos);
  });
});

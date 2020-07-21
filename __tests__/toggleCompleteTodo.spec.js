import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../pages/index';

import { todoReducer } from '../reducers/todoReducer';

describe('UNIT TEST TOGGLE TODO', () => {
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

  it('could set complete status of given id todo from false to true', () => {
    const state = todoReducer(currentState, {
      type: 'TOGGLE_COMPLETE',
      id: 2,
    });
    // ensuring total todo in the list remains same
    expect(state.todos.length).toBe(3);

    // the complete status changed to true
    expect(state.todos[1].completed).toBe(true);

    // the todo list returns as expected
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

  it('could not set completed status if the given id does not exist in the list', () => {
    const state = todoReducer(currentState, {
      type: 'TOGGLE_COMPLETE',
      id: 4,
    });
    expect(state.todos.length).toBe(3);
    expect(state.todos).toStrictEqual(currentState.todos);
  });
});

describe('INTEGRATION TEST - TOGGLE TODO', () => {
  it('could set task to be completed', () => {
    const home = render(<Home />);
    const taskInput = home.getByPlaceholderText('Type your todo');
    const buttonAdd = home.getByText('Add');

    fireEvent.change(taskInput, { target: { value: 'Eat some fruits' } });
    fireEvent.click(buttonAdd);
    fireEvent.change(taskInput, { target: { value: 'Post an article' } });
    fireEvent.click(buttonAdd);

    const listItem = home.getByText('Post an article');
    fireEvent.click(listItem);
    expect(home.queryAllByRole('listitem').length).toBe(2);
    expect(home.container.querySelectorAll('.completed').length).toBe(1);
  });
});

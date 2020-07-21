import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../pages/index';

import { todoReducer } from '../reducers/todoReducer';

describe('Remove TODO', () => {
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

  it('could remove a task with given id', () => {
    const state = todoReducer(currentState, {
      type: 'REMOVE_TASK',
      id: 1,
    });
    expect(state.todos.length).toBe(1);
    expect(state.todos).toStrictEqual([
      { id: 2, task: 'Meeting with boss', completed: false },
    ]);
  });

  it('would not remove a task if the given id does not exist in the list', () => {
    const state = todoReducer(currentState, {
      type: 'REMOVE_TASK',
      id: 3,
    });

    expect(state.todos.length).toBe(2);
    expect(state.todos).toStrictEqual(currentState.todos);
  });
});

describe('Integration test remove todo', () => {
  it('could remove a task from the list', () => {
    const home = render(<Home />);
    const taskInput = home.getByPlaceholderText('Type your todo');
    const buttonAdd = home.getByText('Add');

    fireEvent.change(taskInput, { target: { value: 'Eat some fruits' } });
    fireEvent.click(buttonAdd);
    fireEvent.change(taskInput, { target: { value: 'Post an article' } });
    fireEvent.click(buttonAdd);

    const buttonRemove = home.getByTestId('remove-1');
    fireEvent.click(buttonRemove);
    expect(home.queryAllByRole('listitem').length).toBe(1);
  });
});

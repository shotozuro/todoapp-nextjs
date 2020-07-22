import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../pages/index';

import { todoReducer } from '../reducers/todoReducer';

describe('UNIT TEST: Add Todo', () => {
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
});

describe('INTEGRATION TEST: add todo', () => {
  it('should add a task to the list', () => {
    const home = render(<Home />);
    const taskInput = home.getByPlaceholderText('Type your todo');
    const buttonAdd = home.getByText('Add');

    fireEvent.change(taskInput, { target: { value: 'Eat some fruits' } });
    fireEvent.click(buttonAdd);

    expect(taskInput.value).toBe('');
    expect(home.queryAllByRole('listitem').length).toBe(1);
  });

  it('could not add empty task', () => {
    const home = render(<Home />);
    const taskInput = home.getByPlaceholderText('Type your todo');
    const buttonAdd = home.getByText('Add');

    fireEvent.change(taskInput, { target: { value: '' } });
    fireEvent.click(buttonAdd);

    expect(taskInput.value).toBe('');
    expect(home.queryAllByRole('listitem').length).toBe(0);
  });

  it('could not add to the list if task only contains space character', () => {
    const home = render(<Home />);
    const taskInput = home.getByPlaceholderText('Type your todo');
    const buttonAdd = home.getByText('Add');

    fireEvent.change(taskInput, { target: { value: '       ' } });
    fireEvent.click(buttonAdd);

    expect(taskInput.value).toBe('');
    expect(home.queryAllByRole('listitem').length).toBe(0);
  });
});

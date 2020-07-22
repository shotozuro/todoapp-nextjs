import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';

const numberOfTasks = [1, 20, 50, 100, 500, 1000];

describe.each(numberOfTasks)('Add & Remove Task - %i tasks', (numberOfTask) => {
  let home;

  beforeAll(() => {
    home = render(<Home />);
  });

  it(`could add and remove task`, async () => {
    let number = 0;

    while (number < numberOfTask) {
      number++;

      const buttonAdd = home.getByText('Add');
      const taskInput = home.getByPlaceholderText('Type your todo');

      fireEvent.change(taskInput, { target: { value: 'Eat some fruits' } });
      fireEvent.click(buttonAdd);

      await waitFor(() => {
        // waiting the todo list element to be exist
        expect(home.queryAllByRole('listitem')).toHaveLength(1);

        // check if the remove button for certain task exist
        expect(home.queryByTestId(`remove-${number}`)).toBeInTheDocument();
      });

      // run the action for remove task
      fireEvent.click(home.getByTestId(`remove-${number}`));

      // check if the todo list has been removed
      expect(home.queryByTestId(`remove-${number}`)).toBeNull();
      expect(home.queryAllByRole('listitem').length).toBe(0);
    }
  }, 60000);
});

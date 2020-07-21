// @ts-nocheck

import { TaskType } from '../components/TaskList';

export const validateInput = (text: string) => {
  return text.trim() !== '';
};

export const isIdExist = (id: number, todos: TaskType[]) => {
  return todos.findIndex((todo) => todo.id === id) > -1;
};

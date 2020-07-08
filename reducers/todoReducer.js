export default function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        nextId: state.nextId + 1,
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };

    case 'EDIT_TASK':
      const index = state.todos.findIndex((todo) => todo.id === action.id);
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index),
          action.payload,
          ...state.todos.slice(index + 1, state.todos.length),
        ],
      };

    case 'TOGGLE_COMPLETE':
      const nextindex = state.todos.findIndex((todo) => todo.id === action.id);

      const selectedTodo = { ...state.todos[nextindex] };
      const changedStatusTodo = {
        ...selectedTodo,
        completed: !selectedTodo.completed,
      };
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, nextindex),
          changedStatusTodo,
          ...state.todos.slice(nextindex + 1, state.todos.length),
        ],
      };

    default:
      break;
  }
}

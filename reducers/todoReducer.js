export const todoReducer = (state, action) => {
  switch (action?.type) {
    case "ADD_TASK": {
      // const trimTask = action.payload.task?.trim();
      // if (trimTask) {
      return {
        ...state,
        todos: [...state.todos, action.payload],
        allTodos: [...state.todos, action.payload],
        nextId: state.nextId + 1,
        // };
      };
      return state;
    }
    case "REMOVE_TASK":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
        allTodos: state.todos.filter((todo) => todo.id !== action.id),
      };

    case "EDIT_TASK": {
      const index = state.todos.findIndex((todo) => todo.id === action.id);
      // if (index > -1) {
      //   const trimTask = action.payload.task?.trim();
      //   if (trimTask) {
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index),
          action.payload,
          ...state.todos.slice(index + 1, state.todos.length),
        ],
        allTodos: [
          ...state.todos.slice(0, index),
          action.payload,
          ...state.todos.slice(index + 1, state.todos.length),
        ],
      };
      //   }
      //   return state;
      // }
      // return state;
    }

    case "TOGGLE_COMPLETE": {
      const index = state.todos.findIndex((todo) => todo.id === action.id);
      // if (index > -1) {
      const selectedTodo = { ...state.todos[index] };
      const changedStatusTodo = {
        ...selectedTodo,
        completed: !selectedTodo.completed,
      };
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index),
          changedStatusTodo,
          ...state.todos.slice(index + 1, state.todos.length),
        ],
        allTodos: [
          ...state.todos.slice(0, index),
          changedStatusTodo,
          ...state.todos.slice(index + 1, state.todos.length),
        ],
      };
      // }
      // return state;
    }

    case "FILTER_TASK":
      return {
        ...state,
        todos: state.allTodos.filter((todo) =>
          todo.task.replace(" ", "").includes(action.payload)
        ),
      };

    case "REFRESH_TODO":
      return {
        ...state,
        todos: state.allTodos,
      };

    default:
      return state;
  }
};

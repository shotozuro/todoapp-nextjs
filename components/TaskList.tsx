import React from 'react';

export type TaskType = {
  id: number;
  task: string;
  completed: boolean;
};

type Props = {
  data: Array<TaskType>;
  toggleComplete: (id: number) => void;
  onClickEdit: (todo: TaskType) => void;
  removeTask: (id: number) => void;
};

export default function TaskList(props: Props) {
  return (
    <section className='task-list'>
      <ul>
        {props.data.map((todo) => (
          <TaskItem key={todo.id} {...props} todo={todo} />
        ))}
      </ul>
    </section>
  );
}

const TaskItem = (props) => {
  return (
    <>
      <li>
        <span
          className={`task${props.todo.completed && ' completed'}`}
          onClick={() => props.toggleComplete(props.todo.id)}
        >
          {props.todo.task}
        </span>
        <button onClick={() => props.onClickEdit(props.todo)}>Edit</button>
        <button onClick={() => props.removeTask(props.todo.id)}>Remove</button>
      </li>
      <style jsx>{`
        .completed {
          text-decoration-line: line-through;
        }
      `}</style>
    </>
  );
};

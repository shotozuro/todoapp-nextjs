import React from 'react';
import { FaSquare, FaCheckSquare } from 'react-icons/fa';
import Button from './Button';

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
  selectedTask: TaskType;
};

export default function TaskList(props: Props) {
  return (
    <section className='task-list'>
      <ul style={{ padding: 0 }}>
        {props.data.map((todo) => (
          <TaskItem
            key={todo.id}
            {...props}
            todo={todo}
            isSelected={props.selectedTask && todo.id === props.selectedTask.id}
          />
        ))}
      </ul>
    </section>
  );
}

const TaskItem = (props) => {
  return (
    <>
      <li className={props.isSelected ? 'selected' : ''}>
        {props.todo.completed ? (
          <FaCheckSquare color={'green'} size={30} />
        ) : (
          <FaSquare color={'rgba(0,0,0,0.5)'} size={30} />
        )}
        <span
          className={`task${props.todo.completed ? ' completed' : ''}`}
          onClick={() => props.toggleComplete(props.todo.id)}
        >
          {props.todo.task}
        </span>
        <div style={{ display: 'flex' }}>
          <Button onClick={() => props.onClickEdit(props.todo)}>Edit</Button>
          <Button onClick={() => props.removeTask(props.todo.id)}>
            Remove
          </Button>
        </div>
      </li>
      <style jsx>{`
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          list-style: none;
          min-height: 48px;
          border-bottom: 1px solid #cacaca;
          padding: 10px;
        }

        li > span {
          padding: 12px 10px;
          width: 100%;
        }

        li :hover {
          background-color: rgba(0, 0, 0, 0.2);
        }

        .selected {
          background-color: rgba(0, 0, 0, 0.2);
        }

        .completed {
          text-decoration: line-through;
          color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

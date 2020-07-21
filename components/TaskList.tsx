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
        <a
          className={`task${props.todo.completed ? ' completed' : ''}`}
          onClick={() => props.toggleComplete(props.todo.id)}
        >
          <span className='checkbox'>
            {props.todo.completed ? (
              <FaCheckSquare color={'#00b894'} size={30} />
            ) : (
              <FaSquare color={'rgba(0,0,0,0.5)'} size={30} />
            )}
          </span>
          <span className='taskName'>{props.todo.task}</span>
        </a>
        <div style={{ display: 'flex' }}>
          <Button
            data-testid={'edit-' + props.todo.id}
            onClick={() => props.onClickEdit(props.todo)}
          >
            Edit
          </Button>
          <Button
            data-testid={'remove-' + props.todo.id}
            onClick={() => props.removeTask(props.todo.id)}
          >
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
          padding: 4px 8px;
          margin: 0px -8px;
        }

        li > a {
          width: 100%;
          display: flex;
          align-items: center;
        }

        li :hover {
          background-color: #5decd140;
        }

        .checkbox {
          width: 30px;
          height: 30px;
        }

        .taskName {
          padding: 0 8px;
          word-wrap: normal;
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

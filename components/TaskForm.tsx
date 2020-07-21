import React, { useState, useEffect } from 'react';
import { TaskType } from './TaskList';
import Button from './Button';

type Props = {
  selectedTask: TaskType | null;
  onSubmit: (text: string) => void;
};

export default function TaskForm(props: Props) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (props.selectedTask) {
      setText(props.selectedTask.task);
    }
  }, [props.selectedTask]);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmitText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.onSubmit(text);
    setText('');
  };

  return (
    <section className='new-task-form'>
      <h3>New Task</h3>
      <form className='addTaskForm' onSubmit={(e) => onSubmitText(e)}>
        <input
          placeholder={'Type your todo'}
          className='inputText'
          type='text'
          name='task'
          value={text}
          onChange={onChangeText}
        />
        <Button className='btn-submit' type='submit'>
          {props.selectedTask ? 'Save' : 'Add'}
        </Button>
      </form>
      <style jsx>{`
        .btn-submit {
          background-color: #6ab04c;
          height: 36px;
          border-radius: 4px;
          min-width: 80px;
          border: 1px solid #badc58;
          color: #fff;
        }

        .addTaskForm {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        .inputText {
          font-size: 0.9em;
          width: 100%;
          height: 36px;
          padding: 0 4px;
          margin-right: 8px;
          border-radius: 4px;
          border-width: 1px;
          border-color: #f0f0f0;
          background-color: #f5f5f5;
        }
      `}</style>
    </section>
  );
}

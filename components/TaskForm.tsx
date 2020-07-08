import React, { useState, useEffect } from 'react';
import { TaskType } from './TaskList';

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

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSubmitText = (e) => {
    e.preventDefault();
    props.onSubmit(text);
    setText('');
  };

  return (
    <>
      <section className='new-task-form'>
        <h3>New Task</h3>
        <form onSubmit={onSubmitText}>
          <input type='text' name='task' value={text} onChange={onChangeText} />
          <button className='btn-submit' type='submit'>
            {props.selectedTask ? 'Save' : 'Add'}
          </button>
        </form>
      </section>

      <style jsx>{`
        .btn-submit {
          background-color: #6ab04c;
          height: 36px;
          border-radius: 4px;
          min-width: 80px;
          border: 1px solid #badc58;
          color: #fff;
        }

        input {
          height: 36px;
          padding: 0 4px;
        }
      `}</style>
    </>
  );
}

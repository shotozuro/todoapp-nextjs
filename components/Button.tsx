import React from 'react';

export default function Button(props) {
  return (
    <>
      <button {...props}>{props.children}</button>
      <style jsx>
        {`
          button {
            display: flex;
            height: 36px;
            border-radius: 4px;
            align-items: center;
            justify-content: center;
            // border: 1px solid transparent;
            min-width: 80px;
            background-color: #fff;
          }
          button:hover {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}

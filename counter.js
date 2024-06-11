import { load } from 'emmy-dom';
import { html, useClick } from "./emmy-canary";

export function counter ({ el }) {
  el.className = 'flex flex-col justify-center items-center space-y-3';
  const [counter, setCounter] = el.useState(0);

  const increment = () => setCounter(counter() + 1);
  const decrement = () => setCounter(counter() - 1);
  useClick(el, [increment, decrement]);

  return () => html`
    <h2 class='text-2xl font-bold'>Counter</h2>
    <p id="counter">${ counter() }</p>
    <div class='flex flex-row justify-center items-center space-x-2'>
      <button @click=${increment} class='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
        +
      </button>
      <button @click=${decrement} class='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
        -
      </button>
    </div>
  `;
}

load(counter, 'Counter');

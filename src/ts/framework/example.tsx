import * as React from 'react';
import { AbsoluteSGComponent } from './component';
import { fromEvent, combine } from 'most'
import { ReactNode } from 'react';

const add = (x: number, y: number) => x + y;

const toNumber = (e: Event) => Number((e.currentTarget as HTMLInputElement).value);

export const main = () => {
  const inputX = new AbsoluteSGComponent('div input.x');
  const inputY = new AbsoluteSGComponent('div input.y');
  const inputResult = new AbsoluteSGComponent('div.main', {
    append: (): ReactNode => <input className="z"/>
  });





  // x represents the current value of xInput
  const x = fromEvent('input', document.querySelector(inputX.anchor)).map(toNumber);

  // y represents the current value of yInput
  const y = fromEvent('input', document.querySelector(inputY.anchor)).map(toNumber);

  // result is the live current value of adding x and y
  const result = combine(add, x, y);

  // Observe the result value by rendering it to the resultNode
  result.observe((result: number) => {
    const resultNode = document.querySelector(inputResult.anchor);
    if (resultNode) {
      (resultNode as HTMLInputElement).value = result.toString();
    }
  });
}

main();

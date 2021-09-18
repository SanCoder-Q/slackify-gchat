import * as React from 'react';
import { Optional } from '../types';
import { MenuFromThreadLocator } from '../locaters';
import { createPortal } from 'react-dom';
import { MenuButton } from './MenuButton';
import { ReactElement } from 'react';

export class ThreadMenuVM {
  public portals: ReactElement[] = [];

  constructor(private container: HTMLElement) {
  }

  public show() {
    if (!this.isMarked()) {
      this.container.style.display = 'block';
      (this.container.firstChild!.firstChild as HTMLElement).style.opacity = '100';
      const btn = document.createElement('div');
      btn.style.display = 'inline-block'
      this.container.append(btn);
      this.portals.push(createPortal(<MenuButton/>, btn));
      this.mark();
    }
  };

  private mark() {
    this.container.setAttribute('data-sg-detected', 'true');
  }
  private isMarked(): boolean {
    return this.container.getAttribute('data-sg-detected') === 'true';
  }
}

export const createThreadMenuVM = (container: HTMLElement): Optional<ThreadMenuVM> => {
  const menu = MenuFromThreadLocator(container);
  if (!menu) {
    return null;
  }

  return new ThreadMenuVM(menu);
};

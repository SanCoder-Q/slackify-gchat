import { Optional } from '../types';
import { createHeadingVM, HeadingVM } from './Heading';
import { createThreadMenuVM, ThreadMenuVM } from './ThreadMenu';
import { ThreadsFromRoomLocator } from '../locaters';
import { ReactElement } from 'react';

export class ThreadVM {
  public portals: ReactElement[] = [];
  constructor(private container: HTMLElement, private heading: HeadingVM, private menu: ThreadMenuVM) {
  }

  public show() {
    if (!this.isMarked()) {
      this.heading.show();
      this.menu.show();
      this.portals.push(...this.menu.portals);
      this.mark();
    }
  }

  private mark() {
    this.container.setAttribute('data-sg-detected', 'true');
  }
  private isMarked(): boolean {
    return this.container.getAttribute('data-sg-detected') === 'true';
  }
}

const createThreadVM = (container: HTMLElement): Optional<ThreadVM> => {
  const headingVM = createHeadingVM(container);
  const menuVM = createThreadMenuVM(container);
  if (!headingVM || !menuVM) {
    return null;
  }

  return new ThreadVM(container, headingVM, menuVM);
};

export const createThreadVMs = (container: HTMLElement): ThreadVM[] => {
  return ThreadsFromRoomLocator(container)
    .map(createThreadVM)
    .filter<ThreadVM>((ot): ot is ThreadVM => !!ot);
};

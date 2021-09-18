import { ActiveRoomLocator } from '../locaters';
import { Optional } from '../types';
import { createThreadVMs, ThreadVM } from './Thread';
import { ReactElement } from 'react';

export class RoomVM {
  public portals: ReactElement[] = [];
  constructor(private container: HTMLElement, private threads: ThreadVM[]) {
  }

  public show() {
    this.threads.forEach(t => {
      t.show();
      this.portals.push(...t.portals);
    });
  }
}

export const createRoomVM = (document: Document): Optional<RoomVM> => {
  const container = ActiveRoomLocator(document);
  if (!container) {
    return null;
  }
  const threads = createThreadVMs(container);
  return new RoomVM(container, threads);
};

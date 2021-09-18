import { Optional } from '../types';
import { HeadingFromThreadLocator } from '../locaters';

export class HeadingVM {
  constructor(private container: HTMLElement) {
  }

  public show() {
    if (!this.isMarked()) {
      this.container.style.display = 'block';
      this.container.style.position = 'static';
      this.container.style.width = 'auto';
      this.container.style.height = '30px';
      this.container.style.margin = 'margin: 0 20px';
      this.container.style.fontWeight = '700';
      this.container.style.fontSize = '0.9em';
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

export const createHeadingVM = (container: Element): Optional<HeadingVM> => {
  const heading = HeadingFromThreadLocator(container);
  if (!heading) {
    return null;
  }
  return new HeadingVM(heading);
};

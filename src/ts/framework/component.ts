import { ReactNode } from 'react';

export type SGComponent = RelativeSGComponent | AbsoluteSGComponent;

export interface Rendering {
  readonly prepend?: () => ReactNode;
  readonly append?: () => ReactNode;
  readonly manipulate?: () => SGComponent;
}

export interface SGComponentBase {
  readonly anchor: string;
  readonly rendering: Rendering;
}

export class AbsoluteSGComponent implements SGComponentBase {
  readonly relative: false = false;
  constructor(
    public readonly anchor: string,
    public readonly rendering: Rendering = {}
  ) {}
}

export class RelativeSGComponent implements SGComponentBase {
  readonly relative: true = true;
  constructor(
    public readonly anchor: string,
    public readonly rendering: Rendering = {}
  ) {}
}

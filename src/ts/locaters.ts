import { Optional } from './types';

export interface Locator<E extends HTMLElement = HTMLElement> {
  (parent: ParentNode): Optional<E>;
}

export interface MLocator<E extends HTMLElement = HTMLElement> {
  (parent: ParentNode): E[];
}

export const ActiveRoomLocator: Locator = () => document.querySelector<HTMLElement>('c-wiz[data-group-id][data-is-client-side] > div:nth-child(3)');
export const ThreadsFromRoomLocator: MLocator = (parent: ParentNode) => Array.from(parent.querySelectorAll('c-wiz[data-topic-id][data-local-topic-id]'));
export const HeadingFromThreadLocator: Locator = (parent: ParentNode) => parent.querySelector<HTMLElement>('div:first-child');
export const MenuFromThreadLocator: Locator = (parent: ParentNode) => parent.querySelector<HTMLElement>('div:nth-child(2) > div:first-child');

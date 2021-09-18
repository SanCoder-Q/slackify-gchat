import * as React from 'react';
import { ReactElement } from 'react';
import * as ReactDOM from 'react-dom';
import { createRoomVM } from './view-models/Room';
import { debounce } from './helpers/debounce';
import { Optional } from './types';

const initReact = (portals: ReactElement[]) => {
  if (!document.getElementById('sg-root')) {
    const reactRoot = document.createElement('div');
    reactRoot.id = 'sg-root';
    document.querySelector('body')!.append(reactRoot);
    ReactDOM.render(portals, reactRoot);
  }
};

const app = () => {
  const doc = findCorrectFrameDoc();
  const room = createRoomVM(doc!);
  if (room) {
    room.show();
    initReact(room.portals);
  }
};

const findCorrectFrameDoc = (): Optional<Document> => {
  const frameList = window.top.frames;
  for (let i=0; i< frameList.length; i++) {
    try {
      const mainSpace = frameList[i].document.querySelector('body > c-wiz');
      const docElement = frameList[i].document.documentElement;
      if (
        window.innerHeight > 0 && window.innerHeight === docElement.clientHeight ||
        mainSpace && docElement.clientHeight > 0 && mainSpace.clientHeight === docElement.clientHeight
      ) {
        console.log(i);
        return frameList[i].document;
      }
    } catch (e) {}
  }
  return null;
};

const doc = findCorrectFrameDoc();
if (doc && doc.documentElement.getAttribute('data-sg-detected') !== 'true') {
  const observer = new MutationObserver(debounce(2000, app));
  observer.observe(doc.documentElement, { subtree: true, childList: true, attributes: true });
  doc.documentElement.setAttribute('data-sg-detected', 'true');
}

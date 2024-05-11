import { CLUSTER_CHANGE_EVENT } from './const.ts';

let changesCount = 0;
export const clusterChange = new Event(CLUSTER_CHANGE_EVENT);

export const listenClusterEvents = (handleChange: () => void) => {
  const callback = () => {
    changesCount++;
    handleChange();
  };

  window.addEventListener(CLUSTER_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener(CLUSTER_CHANGE_EVENT, callback);
  };
};

export const getChangesCount = () => changesCount;

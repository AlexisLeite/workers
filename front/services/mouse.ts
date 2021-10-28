export type MouseProps = {
  x: number;
  y: number;
};

export type MouseEventCallback = (mouseprops: MouseProps) => any;

let onMoveSuscriptions: MouseEventCallback[] = [];

if (typeof document !== 'undefined')
  document.addEventListener('mousemove', (ev: MouseEvent) => {
    const mouseProps: MouseProps = (({ clientX: x, clientY: y }) => ({ x, y }))(ev);
    onMoveSuscriptions.forEach((cb) => cb(mouseProps));
  });

const Mouse = {
  onMove: (cb: MouseEventCallback) => {
    onMoveSuscriptions.push(cb);
  },
  offMove: (cb: MouseEventCallback) => {
    onMoveSuscriptions = onMoveSuscriptions.filter((current) => current !== cb);
  },
};

export default Mouse;

export type ScreenProperties = {
  width: number;
  height: number;
};

let [width, height] = [0, 0];

const Screen = {
  get dimensions(): ScreenProperties {
    if (typeof window !== 'undefined')
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    return {
      width: 0,
      height: 0,
    };
  },
};

export default Screen;

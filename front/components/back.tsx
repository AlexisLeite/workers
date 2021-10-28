import React, { ReactElement, useEffect, useState } from 'react';
import { MouseProps } from '../services/mouse';
import Screen from '../services/screen';
import Mouse from './../services/mouse';

interface BackProps {
  children: ReactElement | ReactElement[];
}

export default function Back({ children }: BackProps): ReactElement {
  const { width, height } = Screen.dimensions;

  const [mousePos, setMousePos] = useState<MouseProps>({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouse = (ev: MouseProps) => {
      setMousePos(ev);
    };

    Mouse.onMove(handleMouse);

    return () => Mouse.offMove(handleMouse);
  }, []);

  const side = width > height ? width : height;
  const x = mousePos.x - side;
  const y = mousePos.y - side;

  const onLight = 900;
  const [lights, turnLights] = useState<number>(onLight);

  return (
    <div id="AnimatedBack">
      <div id="MovingBack"></div>
      <div id="AnimatedFront">{children}</div>
      <button
        onClick={() => {
          turnLights(lights > 500 ? 12 : onLight);
        }}
      >
        Lights
      </button>
      <style jsx>{`
        button {
          position: fixed;
          bottom: 10px;
          right: 10px;
          padding: 10px;
        }
        #AnimatedBack {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        #AnimatedFront {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        #MovingBack {
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          width: ${side * 2}px;
          height: ${side * 2}px;
          background: radial-gradient(circle, #fff 0%, #333 ${lights}%);
        }
      `}</style>
    </div>
  );
}

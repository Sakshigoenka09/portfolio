import React, { useRef, useEffect } from 'react';
import { CameraControls } from '@react-three/drei';

export const CameraRig = ({ view }) => {
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      // Configuration for each view: 
      // setLookAt( camX, camY, camZ, targetX, targetY, targetZ, animate )
      switch (view) {
        case 'home':
          // Overview of the room
          controlsRef.current.setLookAt(0, 6, 12, 0, 0, 0, true);
          break;
        case 'about':
          // Zoom into the "Whiteboard" on the right
          controlsRef.current.setLookAt(2, 2, 6, 5, 2, 0, true);
          break;
        case 'projects':
          // Zoom into the "Desk/Monitors" on the left
          controlsRef.current.setLookAt(-2, 2, 6, -5, 1.5, 0, true);
          break;
        case 'contact':
          // Zoom into the "Arcade Machine" at the back
          controlsRef.current.setLookAt(0, 2, 1, 0, 1.5, -5, true);
          break;
        default:
          controlsRef.current.setLookAt(0, 6, 12, 0, 0, 0, true);
      }
    }
  }, [view]);

  return (
    <CameraControls 
      ref={controlsRef} 
      makeDefault 
      minDistance={2} 
      maxDistance={25}
      mouseButtons={{
        left: 1, // 1 = ACTION.ROTATE
        middle: 8, // 8 = ACTION.DOLLY
        right: 0, // 0 = ACTION.NONE (disable right click pan)
        wheel: 8 // Dolly
      }}
      touches={{
        one: 32, // 32 = ACTION.TOUCH_ROTATE
        two: 512, // 512 = ACTION.TOUCH_DOLLY_TRUCK
        three: 0
      }}
    />
  );
};

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const SpinningCube = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw', position: 'absolute', zIndex: '-1' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box
        args={[1, 1, 1]}
        position={[0, 0, 0]}
        rotation={[45, 45, 45]}
        
      >
        <meshStandardMaterial attach="material" color="#6a1b9a" />
      </Box>
    </Canvas>
  );
};

export default SpinningCube;

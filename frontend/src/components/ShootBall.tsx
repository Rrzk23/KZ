import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button, Modal, Box } from '@mui/material';

// Three.js ball component
const Ball = ({ position }: { position: [number, number, number] }) => (
  <Sphere args={[0.5, 32, 32]} position={position}>
    <meshStandardMaterial color="orange" />
  </Sphere>
);

// Main shooting ball component
const ShootBall = () => {
  const [ballPosition, setBallPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [isBallShot, setIsBallShot] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleShoot = () => {
    setIsBallShot(true);
    // Animate the ball along the z-axis (shooting it forward)
    setTimeout(() => {
      setBallPosition([0, 0, 10]); // Shoot ball forward
      setIsBallShot(false);
    }, 1000); // Reset position after animation
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Shoot the Ball</h1>

      {/* Button to shoot the ball */}
      <Button variant="contained" color="primary" onClick={handleShoot}>
        Shoot Ball
      </Button>

      {/* Button to open the modal */}
      <Button variant="outlined" color="secondary" onClick={handleModalOpen} style={{ marginLeft: '20px' }}>
        Open Modal
      </Button>

      {/* Framer Motion for shooting animation */}
      <motion.div
        animate={{ x: 0, y: 0, z: ballPosition[2] }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        {/* Three.js scene */}
        <Canvas style={{ height: 300, marginTop: 20 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <OrbitControls />
          <Ball position={ballPosition} />
        </Canvas>
      </motion.div>

      {/* Modal using Material UI */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Modal Content</h2>
          <p>This modal was opened after you clicked the button!</p>
          <Button variant="contained" color="secondary" onClick={handleModalClose}>
            Close Modal
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ShootBall;

import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';


const HeroSection = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexWrapper: 'flex-wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        pl: '10%',
        zIndex: '2'
      }}
    >
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" sx={{ color: 'white', mb: 2 }}>
          Hi, I'm [Your Name]
        </Typography>
        <Typography variant="h5" sx={{ color: 'white', mb: 4 }}>
          Full-Stack Developer | Passionate about Web & AI
        </Typography>
        <Box sx={{
          
          display: 'flex',
          
          flexDirection: 'row',
          alignItems: 'space-around',
          gap: '2%',
          
          
      }}>
          <motion.div
          initial={{ opacity: 0, x: -1000 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          >
          <Button
          variant="contained" size="large" sx={{ backgroundColor: '#6a1b9a' }}>
            Contact Me
          </Button>
          </motion.div>

          <motion.div
          initial={{ opacity: 0, x: 1000}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          >
          <Button variant="contained" size="large" sx={{ backgroundColor: '#6a1b9a' }}>
            Download CV
          </Button>
          </motion.div>
          </Box>
      </motion.div>
    </Box>
  );
};

export default HeroSection;

import { Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Code, Storage, Web } from '@mui/icons-material'; // Example icons

const skills = [
  { icon: <Code />, title: 'Backend', description: '1+ years experience with NodeJS + ExpressJS using Typescript' },
  { icon: <Storage />, title: 'Databases', description: 'Proficient in MongoDB' },
  { icon: <Web />, title: 'Frontend', description: 'Experience with React, Material UI' },
  { icon: <Web />, title: 'Testing', description: 'Experience with React, Material UI' },
];

const Skills = () => {
  const theme = useTheme();


  return (
    <Box sx={{ 
      padding: '4rem 2rem', 
      backgroundColor: theme.palette.background.paper,
      display: 'flex', 
      flexWrap: 'wrap',
      justifyContent: 'center',
      mx: -1
    }}>
      {skills.map((skill, index) => (
        <Box key={index} sx={{ 
          width: { xs: '100%', sm: '50%', md: '33.333%' }, 
          px: 1, 
          mb: 3 
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              {skill.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>{skill.title}</Typography>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                {skill.description}
              </Typography>
            </Box>
          </motion.div>
        </Box>
      ))}
    </Box>

  );
};
export default Skills;

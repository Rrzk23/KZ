import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Code, Storage, Web } from '@mui/icons-material'; // Example icons

const skills = [
  { icon: <Code />, title: 'Backend', description: '1+ years experience with NodeJS + ExpressJS using Typescript' },
  { icon: <Storage />, title: 'Databases', description: 'Proficient in MongoDB' },
  { icon: <Web />, title: 'Frontend', description: 'Experience with React, Material UI' },
  { icon: <Web />, title: 'Testing', description: 'Experience with React, Material UI' },
];

const Skills = () => (
  <Box sx={{ padding: '4rem 2rem', backgroundColor: '#f3f4f6' }}>
    <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>Skills</Typography>
    <Grid container spacing={4} justifyContent="center">
      {skills.map((skill, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              {skill.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>{skill.title}</Typography>
              <Typography>{skill.description}</Typography>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Skills;

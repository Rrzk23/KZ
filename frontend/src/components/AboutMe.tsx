import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';

const AboutMe = () => {
  const [open, setOpen] = useState(false);

  
  const aboutData = {
    name: 'Ke Zhu (Wilson)',
    title: 'Full-Stack Developer',
    image: 'https://ik.imagekit.io/8rwehsppf/myPicture2.jpg?updatedAt=1760360677474',
    email: 'wilsonzhu2003@gmail.com',
    phone: '+61 0420202405',
    github: '',
    linkedIn: '',
    bio: 'I am a passionate full-stack developer with over 2 year of experience in web development and AI research. I love creating innovative solutions and learning new technologies.',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AI/ML', 'MongoDB', 'ROS'],
    education: '2025 Computer Science Graduate of UNSW',
    interests: ['Web Development', 'Artificial Intelligence','LeetCode', 'AI aimbot', 'FPS', 'Bouldering'],
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Floating Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 8,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleOpen}
          >
            About Me
          </Button>
        </motion.div>
      </Box>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: 'background.paper',
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold">
            About Me
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ py: 2 }}>
            {/* Profile Section */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Avatar
                  src={aboutData.image}
                  alt={aboutData.name}
                  sx={{
                    width: 150,
                    height: 150,
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                  }}
                />
              </motion.div>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {aboutData.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {aboutData.title}
              </Typography>
            </Box>

            {/* Bio Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'center', px: 2 }}>
                {aboutData.bio}
              </Typography>
            </Box>

            {/* Skills Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Skills
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {aboutData.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Chip
                      label={skill}
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Education Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Education
                </Typography>
              </Box>
              <Typography variant="body1">{aboutData.education}</Typography>
            </Box>

            {/* Interests Section */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FavoriteIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Interests
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {aboutData.interests.map((interest, index) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Chip label={interest} sx={{ fontWeight: 500 }} />
                  </motion.div>
                ))}
              </Box>
            </Box>
            {/*conteact info */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Contact
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    📧 Email: <a href={`mailto:${aboutData.email}`} style={{ color: 'inherit' }}>{aboutData.email}</a>
                </Typography>
                <Typography variant="body1">
                    📱 Phone: {aboutData.phone}
                </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutMe
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const theme = useTheme();

  const messages = React.useMemo(
    () => [
      "Full-Stack Developer | Passionate about Web & AI",
      "1+ years experience developing web applications & AI research project",
    ],
    []
  );

  const [displayedText, setDisplayedText] = useState<string>('');
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (charIndex < messages[messageIndex].length) {
        if (displayedText.endsWith('|')) {
          setDisplayedText(displayedText.slice(0, -1));
        }

        setDisplayedText((prev) => prev + messages[messageIndex][charIndex] + '|');
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          const nextMessageIndex = (messageIndex + 1) % messages.length;
          setDisplayedText(messages[nextMessageIndex][0] + '|');
          setCharIndex(1);
          setMessageIndex(nextMessageIndex);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [charIndex, messageIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setDisplayedText((prev) =>
        prev.endsWith('|') ? prev.slice(0, -1) : `${prev}|`
      );
    }, 300);

    return () => clearInterval(cursorInterval);
  }, [displayedText]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Column for small screens, row for larger
        justifyContent: 'center',
        alignItems: 'center',
        pl: '10%',
        pr: '10%',
        gap: 4,
        zIndex: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ flex: 1 }}
      >
        <Typography variant="h2" sx={{ mb: 2, color: theme.palette.text.primary }}>
          Hi, I'm Ke Zhu (Wilson)
        </Typography>
        <Typography variant="h5" sx={{ mb: 2, color: theme.palette.text.primary }}>
          {displayedText}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => (window.location.href = 'https://contact-url.com')}
            >
              <Typography variant="subtitle1">Contact Me</Typography>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Button
              variant="contained"
              size="large"
              color="primary"
              href={'https://ik.imagekit.io/8rwehsppf/KZIO/CV.docx.pdf?updatedAt=1737971358838'}
            >
              <Typography variant="subtitle1">My CV</Typography>
            </Button>
          </motion.div>
        </Box>
      </motion.div>

      {/* Image Section */}
      <Box
        component="img"
        src="https://ik.imagekit.io/8rwehsppf/KZIO/cartoon.webp?updatedAt=1732895607730" // Replace with your image URL
        alt="Hero Section Image"
        sx={{
          flex: 1,
          maxWidth: { xs: '80%', md: '40%' }, // Smaller on desktop, full width on mobile
          height: 'auto',
          objectFit: 'contain',
          alignSelf: { xs: 'center', md: 'center' }, // Center for mobile, align to flex-start for desktop
        }}
      />
    </Box>
  );
};

export default HeroSection;

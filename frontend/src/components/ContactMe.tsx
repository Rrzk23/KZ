import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const ContactMe = () => (
  <Box sx={{ padding: '4rem 2rem', backgroundColor: '#f3f4f6' }}>
    <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>Contact Me</Typography>
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TextField fullWidth label="Name" sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" sx={{ mb: 2 }} />
          <TextField fullWidth multiline rows={4} label="Message" sx={{ mb: 2 }} />
          <Button fullWidth variant="contained" sx={{ backgroundColor: '#6a1b9a' }}>Send Message</Button>
        </motion.div>
      </Grid>
    </Grid>
  </Box>
);

export default ContactMe;

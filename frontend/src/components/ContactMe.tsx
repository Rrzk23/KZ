import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, useTheme, Snackbar, Alert, AlertColor } from '@mui/material';
import { motion } from 'framer-motion';
import { ContantMeInput, sendContactEmail } from '../network/email';
import { Controller, useForm } from 'react-hook-form';

const ContactMe = () => {
  const theme = useTheme();
  const { handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<ContantMeInput>();
  
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor; // Use AlertColor type for the severity
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const onSubmit = async (input: ContantMeInput) => {
    try {
      const response = await sendContactEmail(input);
  
      // Check if the backend returned a JSON response with a `message`
      setNotification({
        open: true,
        message: response.message || 'Email sent successfully!',
        severity: 'success',
      });
      reset();
    } catch (error) {
      console.error('Error sending contact email:', error);
  
      setNotification({
        open: true,
        message: 'Failed to send email. Please try again.',
        severity: 'error',
      });
    }
  };
  

  return (
    <Box
      sx={{
        padding: '4rem 2rem',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Contact Me
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />

              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: 'Invalid email format',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />

              {/* Message Field */}
              <Controller
                name="text"
                control={control}
                defaultValue=""
                rules={{ required: 'Message is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.text}
                    helperText={errors.text?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </Grid>
      </Grid>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactMe;

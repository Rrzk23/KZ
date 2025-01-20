import React, { useState } from "react";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { ProjectInput } from "../network/projects_api";
import * as Projects_api from "../network/projects_api";
import { Project } from '../models/Project';
import { Modal, Box, Typography, TextField, Button, Stack, IconButton } from "@mui/material";
import { ImageKitContext } from "./Imagekit/ImageKitContext";
import ImageKitUpload from "./Imagekit/ImageKitUpload";
import DeleteIcon from '@mui/icons-material/Delete';


interface AddEditProjectModalProps {
  show: boolean;
  onHide: () => void;
  onSaved: (project: Project) => void;
  projectToEdit?: Project;
}

const AddEditProjectModal: React.FC<AddEditProjectModalProps> = ({
  show,
  onHide,
  onSaved,
  projectToEdit
}) => {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProjectInput>({
    defaultValues: projectToEdit || {
      title: '',
      image: '',
      text: '',
      demoUrl: '',
      video: '',
    }
  });

  const [images, setImages] = useState<string[]>(
    typeof projectToEdit?.image === "string" && projectToEdit?.image
      ? projectToEdit.image.split(",")
      : []
  );
  
  

  const handleAddImage = (fileUrl: string) => {
    setImages((prevImages) => [...prevImages, fileUrl]);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  async function onSubmit(input: ProjectInput) {
    try {
      input.image = images.join(","); // Compress images into a single string
      let projectResponse: Project;
      if (projectToEdit) {
        projectResponse = await Projects_api.updateProject(projectToEdit._id, input);
      } else {
        projectResponse = await Projects_api.createProject(input);
      }
      onSaved(projectResponse);
      alert('Project saved successfully');
      reset();
      onHide();
    } catch (error) {
      console.error('Error adding/editing project:', error);
      alert(error);
    }
  }

  const onError = (errors: FieldErrors<ProjectInput>) => {
    console.log("Form errors:", errors);
    alert(JSON.stringify(errors));
  };

  return (
    <Modal
      open={show}
      onClose={onHide}
      aria-labelledby="modal-title"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height:'80%',
        overflow: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {projectToEdit ? "Edit Project" : "Add Project"}
        </Typography>
        <Box component="form"
          
           onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name="text"
            control={control}
            rules={{ required: 'Text is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="text"
                label="Text"
                multiline
                rows={5}
                error={!!errors.text}
                helperText={errors.text?.message}
              />
            )}
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Images</Typography>
          {images.map((url, index) => (
            <Stack direction="row" spacing={1} alignItems="center" key={index} sx={{ mb: 1 }}>
              <TextField
                value={url}
                disabled
                fullWidth
              />
              <IconButton onClick={() => handleDeleteImage(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
          <ImageKitContext>
            <Typography variant="body2" sx={{ mt: 1 }}>Upload an image</Typography>
            <ImageKitUpload
              onUploadSuccess={(fileUrl) => handleAddImage(fileUrl)}
              onUploadError={(error) => alert(`Upload error: ${error.message}`)}
            />
          </ImageKitContext>
          <Controller
            name="demoUrl"
            control={control}
            
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                id="demoUrl"
                label="Demo URL"
                error={!!errors.demoUrl}
                helperText={errors.demoUrl?.message}
              />
            )}
          />
          <Controller
            name="video"
            control={control}
            
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                id="video"
                label="Video Link"
                error={!!errors.video}
                helperText={errors.video?.message}
              />
            )}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button onClick={onHide}>Close</Button>
            <Button onClick={() => reset()}>Reset</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddEditProjectModal;

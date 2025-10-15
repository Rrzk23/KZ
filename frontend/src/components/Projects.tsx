import React from 'react';
import { Project } from '../models/Project';
import * as projects_api from '../network/projects_api';
import { Spinner } from "react-bootstrap";
import { Alert, Box, Button, Typography, useTheme } from "@mui/material";
import ProjectCard from './ProjectCard';
import AddEditProjectModal from './AddEditProjectModal';
import { useAppContext } from '../context/Context';
import { defaultProjects } from '../utils/defaultProjects';




const Projects = () => {
  const [projects, setProjects] = React.useState<Project[] | null>(defaultProjects);
  const [isProjectsloading, ] = React.useState(true);
  const [showProjectsLoadingError, ] = React.useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = React.useState<Project | null>(null);
  const [showAddProjectModal, setShowAddProjectModal] = React.useState<boolean>(false);
  const [showEditProjectModal, setShowEditProjectModal] = React.useState<boolean>(false);
  const theme = useTheme();

  const { isLoggedIn } = useAppContext();

  const onEditProjectClicked = (project: Project) => {
    setProjectToEdit(project);
    setShowEditProjectModal(true);
  };

  const onDeleteProjectClicked = async (projectToDelete: Project) => {
    if (!projects) return;
    try {
      await projects_api.deleteProject(projectToDelete._id);
      setProjects(projects.filter((project) => project._id !== projectToDelete._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const onNoteClicked = () => {};


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Projects
      </Typography>
      {isProjectsloading && (
        <Spinner animation="border" variant="primary" role="status" aria-hidden="true" />
      )}
      {showProjectsLoadingError && (
        <Alert variant="outlined" severity="error">
          Error fetching projects, please try again later!
        </Alert>
      )}
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}>
        {projects?.map((project) => (
          <Box key={project._id} sx={{ width: { xs: '100%', s: '50%', md: '33.333%' }, px: 1, mb: 2 }}>
            <ProjectCard
              project={project}
              onEditNoteClicked={onEditProjectClicked}
              onNoteClicked={onNoteClicked}
              onDeleteNoteClicked={onDeleteProjectClicked}
            />
          </Box>
        ))}
      </Box>
    </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddProjectModal(true)}
        disabled={!isLoggedIn}
      >
        Add New Project
      </Button>

      <AddEditProjectModal
        show={showAddProjectModal}
        onHide={() => setShowAddProjectModal(false)}
        onSaved={(newProject) => {
          if (projects) {
            setProjects([...projects, newProject]);
            setShowAddProjectModal(false);
          }
        }}
      />
      {projectToEdit && showEditProjectModal && projects && (
        <AddEditProjectModal
          show={showEditProjectModal}
          onHide={() => setShowEditProjectModal(false)}
          onSaved={(updatedProject) => {
            const updatedProjects = projects.map((existingProject) =>
              existingProject._id === updatedProject._id ? updatedProject : existingProject
            );
            setProjects(updatedProjects);
            setShowEditProjectModal(false);
          }}
          projectToEdit={projectToEdit}
        />
      )}
    </Box>
  );
};

export default Projects;


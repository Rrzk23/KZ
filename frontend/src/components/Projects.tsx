import React, { useEffect } from 'react';
import { Project } from '../models/Project';
import * as projects_api from '../network/projects_api';
import { Spinner } from "react-bootstrap";
import { Alert, Box, Button, Typography, useTheme, Grid } from "@mui/material";
import ProjectCard from './ProjectCard';
import AddEditProjectModal from './AddEditProjectModal';
import { useAppContext } from '../context/Context';

const Projects = () => {
  const [projects, setProjects] = React.useState<Project[] | null>(null);
  const [isProjectsloading, setIsProjectsloading] = React.useState(true);
  const [showProjectsLoadingError, setShowProjectsLoadingError] = React.useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = React.useState<Project | null>(null);
  const [showAddProjectModal, setShowAddProjectModal] = React.useState<boolean>(false);
  const [showEditProjectModal, setShowEditProjectModal] = React.useState<boolean>(false);
  const theme = useTheme();

  const { isLoggedIn} = useAppContext();
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await projects_api.getAllProjects();
        console.log(fetchedProjects)
        setProjects(fetchedProjects);
        setShowProjectsLoadingError(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setShowProjectsLoadingError(true);
      } finally {
        setIsProjectsloading(false);
      }
    };
    fetchProjects();
  }, []);

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
      {projects && !isProjectsloading && !showProjectsLoadingError && (
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={project._id}>
              <ProjectCard
                project={project}
                onEditNoteClicked={onEditProjectClicked}
                onNoteClicked={onNoteClicked}
                onDeleteNoteClicked={onDeleteProjectClicked}
              />
            </Grid>
          ))}
        </Grid>
      )}
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

import React, { useEffect } from 'react'
import { Project } from '../models/Project'
import * as projects_api from '../network/projects_api';
import { Col, Row, Spinner } from "react-bootstrap";
import { Alert, Button } from "@mui/material";
import ProjectCard from './ProjectCard';
import styles from '../styles/Projects.module.css';
import AddEditProjectModal from './AddEditProjectModal';

const Projects = () => {
  // Fetch projects from API or local storage and display them in a grid or list view.
  const [projects, setProjects] = React.useState<Project[]|null>(null);
  const [isProjectsloading, setIsProjectsloading] = React.useState(true);
  const [showProjectsLoadingError, setShowProjectsLoadingError] = React.useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = React.useState<Project|null>(null);
  const [showAddProjectModal, setShowAddProjectModal] = React.useState<boolean>(false);
  const [showEditProjectModal, setShowEditProjectModal] = React.useState<boolean>(false);


  const onEditProjectClicked = (project: Project) => {
    try {
      setProjectToEdit(project);
      setShowEditProjectModal(true);
      
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  const onDeleteProjectClicked = async (projectToDelete: Project) => {
    if (!projects) {
      throw new Error('Projects are not available');
    }
    try {
      await projects_api.deleteProject(projectToDelete._id);
      setProjects(projects.filter((project: Project) => project._id!== projectToDelete._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  const onNoteClicked = () => {
  };
  useEffect(() => {
    async function fetchProjects() : Promise<void> {
      try {
        const fetchedProjects = await projects_api.getAllProjects();
        setProjects(fetchedProjects);
        setShowProjectsLoadingError(false);
      }
      catch (error) {
        console.error('Error fetching projects:', error);
        setShowProjectsLoadingError(true);
      }  // Fetch projects on component mount and on every update of projects state.
      finally{
        setIsProjectsloading(false);
      }
    }
    void fetchProjects();
  }, []);
  
  return (
    <div>
      {isProjectsloading &&
        <Spinner 
        animation="border" 
        variant='primary'
        role="status"
        aria-hidden="true"/>
      }
      {showProjectsLoadingError && 
        <Alert variant="outlined" severity="error" >
          Error fetching prices, please try again later!
        </Alert>
      }
      { projects &&!isProjectsloading &&!showProjectsLoadingError &&
        <Row xs={1} md={2} lg={3} className={`g-4 ${styles.projectsBox}`}>
          {projects.map((project: Project) => (
            <Col className={`${styles.projectCard}`} key={project._id} >
              <ProjectCard
                project={project} 
                key ={project._id} 
                //className={styles.priceNote}
                onEditNoteClicked={onEditProjectClicked}
                onNoteClicked={onNoteClicked}
                onDeleteNoteClicked={onDeleteProjectClicked}/>
            </Col>
          
        ))}
        </Row>
      }
      <Button variant="contained" color="primary" onClick={() => {
        setShowAddProjectModal(true);
      }}>Add New Project</Button>

      <AddEditProjectModal
        show={showAddProjectModal}
        onHide={() => setShowAddProjectModal(false)}
        onSaved={(newProject) => {
          if (projects){
          setProjects([...projects, newProject]);
          setShowAddProjectModal(false);
          }
        }}
      />


    </div>
  )
}

export default Projects
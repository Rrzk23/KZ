import { Project } from "../models/Project";
import { fetchData } from "./fetchData";

export async function getAllProjects(): Promise<Project[]> {
    const response = await fetchData('api/projects/getAll', { method: 'GET' });
    const rawData = await response.json();
  
    
    const projectsWithImages: Project[] = rawData.map((project: any) => ({
      ...project,
      images: project.image ? project.image.split(',') : [], // Convert image string to images array
    }));
    console.log(projectsWithImages)
    return projectsWithImages;
  }
export interface ProjectInput {
    title: string;
    text: string;
    image: string;
    demoUrl: string;
    video: string;
}

export async function createProject(project: ProjectInput): Promise<Project> {
    const response = await fetchData('api/projects/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(project),
    });
    const data = await response.json() as Project;
    return data;
}

export async function deleteProject(projectId: string): Promise<void> {
    await fetchData(`api/projects/delete/${projectId}`, {method: 'DELETE'});
}

export async function updateProject(projectId: string, project: ProjectInput): Promise<Project> {
    const response = await fetchData(`api/projects/update/${projectId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(project),
    });
    const data = await response.json() as Project;
    return data;
}

export async function getProjectById(projectId: string): Promise<Project> {
    const response = await fetchData(`api/projects/get/${projectId}`, {method: 'GET'});
    const data = await response.json() as Project;
    return data;
}
export interface Project {
    [x: string]: unknown;
    _id: string;
    title: string;
    text: string;
    images: string[];
    demoUrl: string;
    video: string;
    createdAt: string;
    updatedAt: string;
  }
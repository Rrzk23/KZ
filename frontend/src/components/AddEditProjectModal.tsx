
import React from "react";
import {FieldErrors, useForm}  from "react-hook-form";
import { ProjectInput } from "../network/projects_api";
import * as Projects_api from "../network/projects_api";
import { Form, Modal} from "react-bootstrap";
import {Button} from "@mui/material";
import { Project } from '../models/Project';
interface AddEditProjectModalProp {
    show: boolean;
    onHide: () => void;
    onSaved: (price : Project) => void;
    projectToEdit?: Project;
}
const AddEditProjectModal = (prop : AddEditProjectModalProp) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<ProjectInput>( {
        defaultValues: prop.projectToEdit || {
            title: '',
            image: '',
            text: '',
            demoUrl: '',
        }
    });

    async function onSubmit(input : ProjectInput) {
        console.log("prop.priceToEdit");
        console.log(prop.projectToEdit);
        try {
            let noteResponse : Project;
            console.log("prop.priceToEdit");
            console.log(prop.projectToEdit);
            if (prop.projectToEdit) {
                console.log("reday to update price")
                noteResponse = await Projects_api.updateProject(prop.projectToEdit._id, input);
            } else {
                console.log("reday to create price")
                noteResponse =await Projects_api.createProject(input);
            }
            
            prop.onSaved(noteResponse);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            reset();
        } catch (error) {
            console.error('Error adding and edit price note:', error);
            alert(error);
        }
    }
    const onError = (error: FieldErrors<ProjectInput>) => {
        console.log("prop.priceToEdit");
        console.log(prop.projectToEdit?._id);
        
        console.log("Form errors: " + error);
        // TODO: handle specific error messages for each field
    } ;
    return (
        <Modal show = {prop.show} onHide={prop.onHide} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {prop.projectToEdit ? "Edit Project Note" : "Add Project Note"}
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form id = "addEditPriceNoteForm" onSubmit={handleSubmit(onSubmit, onError)}>
                        <Form.Group className = "mb-3">
                            <Form.Label>title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter title" 
                                isInvalid={!!errors.title}
                                {...register("title", {required : true})}
                            />
                            <Form.Control.Feedback type = "invalid">
                                {errors.title?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className = "mb-3">
                            <Form.Label>text</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={5} 
                                placeholder="Enter text" 
                                {...register("text", {required : true})} 
                            />
                        </Form.Group>
                        <Form.Group className = "mb-3">
                            <Form.Label>demo Url</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter demo url"  
                                {...register("demoUrl", {required : true})} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={prop.onHide}>Close</Button>
                    <Button onClick={() => reset()}>Reset</Button>
                    <Button disabled={true}>Save</Button>
                    <Button 
                        type = "submit" 
                        form = "addEditPriceNoteForm"
                        disabled = {isSubmitting}
                    >
                        Submit
                    </Button>
                    <Form.Control.Feedback type = "invalid">
                                {errors.title?.message}
                            </Form.Control.Feedback>
                </Modal.Footer>
            
        </Modal>
    );
}

export default AddEditProjectModal;
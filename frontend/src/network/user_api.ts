
import {Admin} from '../models/Admin';
import { fetchData } from './fetchData';



export async function getLoggedInUser (): Promise<Admin> {
    const response = await fetchData('api/auth/', { method : 'GET' , credentials: 'include'});
    return response.json();
};

export interface LoginCredentials {
    adminName: string;
    password: string;
};

export async function loginUser (userLogIn: LoginCredentials): Promise<Admin> {
    const response = await fetchData('api/auth/login', { method : 'POST' ,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogIn),
    });
    return response.json();

}

export async function logoutUser (): Promise<void> {
    await fetchData('api/auth/logout', { method : 'POST', credentials: 'include',});
}
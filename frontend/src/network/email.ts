
import { fetchData } from "./fetchData";


export interface ContantMeInput {
    name: string;
    email: string;
    text: string;
}

export async function sendContactEmail(input: ContantMeInput) {
    const response = await fetchData('api/util/sendContactEmail', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(input),
    });
    const data = await response.json();
    return data;

}

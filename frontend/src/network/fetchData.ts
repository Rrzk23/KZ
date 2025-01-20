import { BadRequestHttpError, ConflicHttptError, NotFoundHttpError, UnautorizedHttpError } from "../errors/http-errors";

export async function fetchData(input: RequestInfo, init?: RequestInit){
    const baseUrl = process.env.NODE_ENV === 'production' ? "https://kz-lwp4.onrender.com" : ""
    console.log(`Fetching data from ${baseUrl}`);
  // Combine base URL with the input
  const url = 
    `${baseUrl}/${input}` // Prepend base URL if input is a relative path



    try {
        console.log(`Fetching data from ${url}`);
        const response = await fetch(url, {
            ...init,
            credentials: 'include', 
        });
      
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if(response.status < 400) {
        return response;
    }
    else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        switch(response.status) {
            case 401:
                throw new UnautorizedHttpError(errorMessage);
            case 404:
                throw new NotFoundHttpError(errorMessage);
            case 409:
                throw new ConflicHttptError(errorMessage);
            case 400:
                throw new BadRequestHttpError(errorMessage);
            default:
                throw new Error('Request failed with status ' + response.status + ': ' + errorMessage);
        }  
    }
    
    } catch (error) {
        throw new Error('Failed fetching data');
    }

}
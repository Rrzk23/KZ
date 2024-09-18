export async function fetchData(input: RequestInfo, init?: RequestInit){
 
    try {
        const response = await fetch(input,init);
        return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error('Failed fetching data');
    }
    
    /*if(response.ok) {
        return response;
    }
    else {
        //const errorBody = await response.json();
        //const errorMessage = errorBody.error;
        /*switch(response.status) {
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
    } */

}

export interface InterceptResponse {

    body: any;

    headers: any;

}


export default interface InterceptConfig {

    url: string;

    type: 'success' | 'error';

    errorCode?: number;

    response: InterceptResponse;

}


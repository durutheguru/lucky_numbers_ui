import axios from 'axios';

export default class Web {

    public static get(url: string, successCallback: (response: any) => any, errorCallback: (error: any) => any) {
        axios
        .get(url)
        .then(successCallback)
        .catch(errorCallback);
    }


    public static navigate(url: string) {
        window.location.href = url;
    }

}

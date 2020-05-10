
export default class Constants {

    public static authExcludeApiPaths: string[] = [
        '/login',
        '/oauth/login',
    ];


    public static regexps: any = {
        AUTH_TOKEN: /^Bearer .+\.(.*)(\..+)+$/,
    };


    public static defaultPagination: any = {
        page: 0,
        size: 10
    };

}


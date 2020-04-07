
export default class Constants {

    public static excludeApiPaths: string[] = [
        '/login',
        '/oauth/login',
    ];


    public static regexps: any = {
        AUTH_TOKEN: /^Bearer .+\.(.*)(\..+)+$/,
    };

}


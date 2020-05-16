
export default class Constants {

    // Event Related Constants
    public static dialogClosedEvent: string = 'close-dialog';

    public static routeUpdateEvent: string = 'route-updated';

    public static routeClearedEvent: string = 'route-cleared';

    public static defaultEventTriggerTimeout: number = 400;

    public static authExcludeApiPaths: string[] = [
        '/login',
        '/oauth/login',
    ];


    public static regexps: any = {
        AUTH_TOKEN: /^Bearer .+\.(.*)(\..+)+$/,
        EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    };


    public static defaultPagination: any = {
        page: 0,
        size: 10
    };

}


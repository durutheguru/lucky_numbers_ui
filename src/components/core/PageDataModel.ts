import { Constants, Log } from '../util';


const defaultPageData = {

    next: {},

    previous: {},

    number: Constants.defaultPagination.page,

    size: Constants.defaultPagination.size,

    totalElements: 0,

    totalPages: 0,

};


export default class PageDataModel {

    public loading: boolean = false;

    public error: string = '';
    
    public list: any = [];

    public pageData: any = defaultPageData;

    public searchResults: boolean = false;

    public searchQuery: string = '';


    constructor(
        private entityKeyName: string, // string value used to extract entity from page response
        private loadEntityFunction: (url?: string) => void, // function to invoke to load entity
        private searchEntityFunction?: (query: string, url?: string) => void // function to invoke when searching entity
    ) { }


    public initialize() {
        this.loadEntityFunction();
    }


    public clearPageData() {
        this.pageData = defaultPageData;
    }


    public setLoading(loading: boolean) {
        if (loading) {
            this.error = '';
            Log.info('Loading ' + this.entityKeyName);
        }

        this.loading = loading;
    }


    public assignResponse(response: any, isSearchResult: boolean = false) {
        this.searchResults = isSearchResult;
        this.list = response.data._embedded[this.entityKeyName];
        this.pageData = response.data.page;
        this.pageData.next = response.data._links.next || {};
        this.pageData.previous = response.data._links.prev || {};
    }


    public next() {
        if (!this.searchResults) {
            Log.info('Loading Next ' + this.entityKeyName + ' ...');
            this.loadEntityFunction(
                this.pageData.next.href
            );
        } else {
            Log.info('Searching Next ' + this.entityKeyName + ' ...');
            if (!!this.searchEntityFunction) {
                this.searchEntityFunction(
                    this.searchQuery, this.pageData.next.href
                );
            }
        }
    }


    public previous() {
        if (!this.searchResults) {
            Log.info('Loading Previous ' + this.entityKeyName + ' ...');
            this.loadEntityFunction(
                this.pageData.previous.href
            );
        } else {
            Log.info('Searching Previous ' + this.entityKeyName + ' ...');
            if (!!this.searchEntityFunction) {
                this.searchEntityFunction(
                    this.searchQuery, this.pageData.previous.href
                );
            }
        }
    }


    public hasElements(): boolean {
        Log.info('Total Elements: ' + this.pageData.totalElements);
        return !!this.pageData.totalElements;
    }


    public canNext(): boolean {
        return !!this.pageData.next.href;
    }


    public canPrevious(): boolean {
        return !!this.pageData.previous.href;
    }


}



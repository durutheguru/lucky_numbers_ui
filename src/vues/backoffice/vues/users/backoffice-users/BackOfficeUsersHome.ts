import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import BackOfficeUserService from '@/services/users/BackOfficeUserService';

import WithRender from './backoffice-users.html';
import { Log, Constants } from '@/components/util';
import PageRequest from '@/components/core/PageRequest';

import BackOfficeUserDetailsDialog from './dialog/user-details/BackOfficeUserDetailsDialog';
import SearchField from '@/components/search-field/SearchField';


@WithRender
@Component({
    components: {
        SearchField,
        BackOfficeUserDetailsDialog,
    },
})
export default class BackOfficeUsersHome extends BaseVue {

    private loading: boolean = false;

    private error: string = '';

    private query: any = Constants.defaultPagination;

    private selectedUserDetails: any = {};

    private userDetailsDialogShowing: boolean = false;

    private users: any = {
        list: [],
        pageData: {
            next: {}, previous: {},
        }, 
        searchResults: false,
        searchQuery: '',
    };


    public mounted() {
        this.loadBackOfficeUsers();
    }


    public loadBackOfficeUsers(url?: string) {
        this.setLoading(true);
        BackOfficeUserService.getBackOfficeUsers(
            new PageRequest(this.query.page, this.query.size, url), 

            (response: any) => {
                this.setLoading(false);
                this.assignUsersResponse(response);
            },

            (error: any) => {
                this.setLoading(false);
            }
        );
    }


    public setLoading(loading: boolean) {
        if (loading) {
            this.error = '';
            Log.info('Loading BackOffice Users');
        }

        this.loading = loading;
    }


    public get hasUsers(): boolean {
        return !!this.users.pageData.totalElements;
    }


    public get canPrevious(): boolean {
        return !!this.users.pageData.previous.href;
    }


    public get canNext(): boolean {
        return !!this.users.pageData.next.href;
    }


    public next() {
        if (!this.users.searchResults) {
            Log.info('Loading Next BackOffice Users...');
            this.loadBackOfficeUsers(
                this.users.pageData.next.href
            );
        } else {
            Log.info('Searching Next BackOffice Users...');
            this.searchBackOfficeUsers(
                this.users.searchQuery, this.users.pageData.next.href
            );
        }
    }


    public previous() {
        if (!this.users.searchResults) {
            Log.info('Loading Previous BackOffice Users...');
            this.loadBackOfficeUsers(
                this.users.pageData.previous.href
            );
        } else {
            Log.info('Searching Previous BackOffice Users...');
            this.searchBackOfficeUsers(
                this.users.searchQuery, this.users.pageData.previous.href
            );
        }
    }


    public searchBackOfficeUsers(
        query: string, url?: string
    ) {
        this.users.searchQuery = query;

        this.clearPageData();
        this.setLoading(true);

        BackOfficeUserService.searchBackOfficeUsers(
            query, 

            new PageRequest(this.query.page, this.query.size, url),

            (response: any) => {
                this.setLoading(false);
                this.assignUsersResponse(response, true);
            },

            (error: any) => {
                this.setLoading(false);
            }
        );
    }


    public showBackOfficeUserDetails(user: any) {
        this.selectedUserDetails = user;
        this.userDetailsDialogShowing = true;
    }


    public hideBackOfficeUserDetails() {
        this.userDetailsDialogShowing = false; 
    }


    public searchCleared() {
        this.clearPageData();
        this.loadBackOfficeUsers();
    }


    private clearPageData() {
        this.users.pageData = {};
        this.query = Constants.defaultPagination;
    }


    private assignUsersResponse(response: any, isSearchResult: boolean = false) {
        this.users.searchResults = isSearchResult;
        this.users.list = response.data._embedded.backOfficeUsers;
        this.users.pageData = response.data.page;
        this.users.pageData.next = response.data._links.next || {};
        this.users.pageData.previous = response.data._links.prev || {};
    }


}


import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import BackOfficeUserService from '@/services/users/BackOfficeUserService';

import WithRender from './backoffice-users.html';
import { Log, Constants } from '@/components/util';
import PageRequest from '@/components/core/PageRequest';
import { EventTrigger } from '@/components/core/Event';

import BackOfficeUserDetailsDialog from './dialog/user-details/BackOfficeUserDetailsDialog';
import CreateBackOfficeUserDialog from './dialog/new-user/CreateBackOfficeUserDialog';
import SearchField from '@/components/search-field/SearchField';
import UserAction from '@/components/core/UserAction';


@WithRender
@Component({
    components: {
        SearchField,
        BackOfficeUserDetailsDialog,
        CreateBackOfficeUserDialog,
    },
})
export default class BackOfficeUsersHome extends BaseVue {

    private loading: boolean = false;

    private error: string = '';

    private query: any = Constants.defaultPagination;

    private dialogOpts: any = {
        userDetails: {
            visible: false,
            selectedUser: {},
        },

        createUser: {
            visible: false,
        },
    };

    private users: any = {
        list: [],
        pageData: {
            next: {}, previous: {},
        }, 
        searchResults: false,
        searchQuery: '',
    };


    public mounted() {
        EventTrigger.trigger(
            Constants.routeUpdateEvent, 

            {
                actions: [
                    new UserAction(
                        'Add BackOffice User',
                        'fa-plus',
                        () => {
                            this.showCreateBackOfficeUser();
                        }
                    ),

                    new UserAction(
                        'Upload Users',
                        'fa-cloud-upload',
                        () => {
                            this.uploadBackOfficeUsers();
                        }
                    )
                ],
            }
        );

        this.loadBackOfficeUsers();
    }


    public showCreateBackOfficeUser() {
        Log.info('Creating BackOffice User');
        this.dialogOpts.createUser.visible = true;
    }


    public hideCreateBackOfficeUser() {
        this.dialogOpts.createUser.visible = false;
        this.loadBackOfficeUsers();
    }


    public uploadBackOfficeUsers() {
        Log.info('Uploading BackOffice User');
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
        this.dialogOpts.userDetails.selectedUser = user;
        this.dialogOpts.userDetails.visible = true;
    }


    public hideBackOfficeUserDetails() {
        this.dialogOpts.userDetails.visible = false; 
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


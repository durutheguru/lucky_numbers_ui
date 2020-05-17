import { Component, Mixins } from 'vue-property-decorator';

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
import PageDataModel from '@/components/core/PageDataModel';


@WithRender
@Component({
    components: {
        SearchField,
        BackOfficeUserDetailsDialog,
        CreateBackOfficeUserDialog,
    },
})
export default class BackOfficeUsersHome extends BaseVue {


    private dialogOpts: any = {
        userDetails: {
            visible: false,
            selectedUser: {},
        },

        createUser: {
            visible: false,
        },
    };


    private elements: PageDataModel = new PageDataModel(
        'backOfficeUsers', 
        this.loadBackOfficeUsers.bind(this),
        this.searchBackOfficeUsers.bind(this)
    );


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

        this.elements.initialize();
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
        this.elements.setLoading(true);

        BackOfficeUserService.getBackOfficeUsers(
            new PageRequest(
                this.elements.pageData.number, 
                this.elements.pageData.size, 
                url
            ), 

            (response: any) => this.handleSuccessResponse(response),

            (error: any) => {
                this.elements.setLoading(false);
            }
        );
    }


    public get hasElements(): boolean {
        return this.elements && this.elements.hasElements();
    }


    public get canPrevious(): boolean {
        return this.elements.canPrevious();
    }


    public get canNext(): boolean {
        return this.elements.canNext();
    }


    public next() {
        this.elements.next();
    }


    public previous() {
        this.elements.previous();
    }


    public searchCleared() {
        this.elements.clearPageData();
        this.elements.initialize();
    }


    public searchBackOfficeUsers(
        query: string, url?: string
    ) {
        this.elements.searchQuery = query;

        this.elements.clearPageData();
        this.elements.setLoading(true);

        BackOfficeUserService.searchBackOfficeUsers(
            this.elements.searchQuery, 

            new PageRequest(
                this.elements.pageData.number, 
                this.elements.pageData.size, 
                url
            ),

            (response: any) => this.handleSuccessResponse(response, true),

            (error: any) => {
                this.elements.setLoading(false);
            }
        );
    }


    private handleSuccessResponse(response: any, searchResults: boolean = false) {
        this.elements.setLoading(false);
        this.elements.assignResponse(response, searchResults);
    }


    public showBackOfficeUserDetails(user: any) {
        this.dialogOpts.userDetails.selectedUser = user;
        this.dialogOpts.userDetails.visible = true;
    }


    public hideBackOfficeUserDetails() {
        this.dialogOpts.userDetails.visible = false; 
    }


}



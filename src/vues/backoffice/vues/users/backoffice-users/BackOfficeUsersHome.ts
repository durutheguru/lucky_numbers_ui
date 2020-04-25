import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import UserService from '@/services/users/UserService';

import WithRender from './backoffice-users.html';
import { Log } from '@/components/util';


@WithRender
@Component
export default class BackOfficeUsersHome extends BaseVue {

    private loading: boolean = false;

    private error: string = '';

    private query: any = {
        page: 0,
        size: 10
    };

    private users: any = {
        list: [],
        pageData: {}
    };


    public mounted() {
        this.loadBackOfficeUsers(this.query.page, this.query.size);
    }


    public loadBackOfficeUsers(page: number, size: number) {
        this.setLoading(true);
        UserService.getBackOfficeUsers(
            page, size, 
            (response: any) => {
                this.setLoading(false);
                this.users.list = response.data._embedded.backOfficeUserDTOList;
                this.users.pageData = response.data.page;
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
        return this.users.pageData.number > 0;
    }


    public get canNext(): boolean {
        return this.users.pageData.number < this.users.pageData.totalPages - 1; 
    }


    public next() {
        this.loadBackOfficeUsers(this.query.page += 1, this.query.size);
    }


    public previous() {
        this.loadBackOfficeUsers(this.query.page -= 1, this.query.size);
    }


}


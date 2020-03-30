import { Component } from 'vue-property-decorator';

import BaseVue from '../../components/BaseVue';
import { Log } from '../../components/util';
import '../../components/util/Validation';
import UserAuthContext from '@/components/auth/UserAuthContext';

import LoginService from '../../services/login/LoginService';

import WithRender from './login.html';
import store from '@/store';


@WithRender
@Component
export default class LoginComponent extends BaseVue {

    private loading: boolean = false;

    private username: string = '';

    private password: string = '';

    private loginError: string = '';


    private doLogin() {
        this.loading = true;
        this.loginError = '';

        LoginService.initiate(
            {
                username: this.username,
                password: this.password,
            },

            (response: any) => {
                this.loading = false;
                store.commit('authToken/apiToken', response.headers.authorization);
                this.$router.push({path: UserAuthContext.getInstance().homeUrl()});
                Log.info('Logged In: ' + JSON.stringify(response));
            },

            (error: any) => {
                this.loading = false;
                this.extractError(error);
                Log.error('Logged Error: ' + JSON.stringify(error));
            },
        );
    }


    private extractError(error: any) {
        if (error.response) {
            if (error.response.status === 401) {
                this.loginError = 'Invalid Username / Password';
                return;
            } else if (error.response.status === 0) {
                this.loginError = 'Cannot Reach Server';
                return;
            }
        }

        this.loginError = 'Unknown Error Occurred';
    }


}

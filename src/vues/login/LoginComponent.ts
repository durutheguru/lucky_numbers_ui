import { Component } from 'vue-property-decorator';
import { required } from 'vuelidate/lib/validators';

import BaseVue from '../../components/BaseVue';
import { Log } from '../../components/util';


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


    public validations() {
        return {
            username: {
                required,
            },

            password: {
                required,
            },
        };
    }


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
                this.$router.push({path: '/back-office'});
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
            } else if (error.response.status === 0) {
                this.loginError = 'Cannot Reach Server';
            }
        } else {
            this.loginError = 'Unknown Error Occurred';
        }
    }


}

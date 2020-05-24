
import { Component, Prop } from 'vue-property-decorator';
import BaseVue from '@/components/BaseVue';
import Modal from '@/components/modal/Modal';

import UserValidatorService from '../../../service/UserValidatorService';
import PartnerUserService from '@/vues/backoffice/vues/users/partner-users/service/PartnerUserService';
import { Constants } from '@/components/util';

import WithRender from './create-lottery-user-dialog.html';


@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class CreatePartnerUserDialog extends BaseVue {

    @Prop({default: false})
    private visible!: boolean;


    private error: string = '';


    private loading: boolean = false;

    
    private user!: any;


    public mounted() {
        this.user = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        };
    }


    public createUser() {
        this.error = '';

        if (!this.validUserModel()) {
            return;
        }

        this.loading = true;

        PartnerUserService.createPartnerUser(
            this.user,

            (response: any) => {
                this.close();
            },

            (error: any) => {
                this.loading = false;
                this.error = this.extractError(error);
            }
        );
    }


    public validUserModel() {
        return UserValidatorService.validate(this.user, this);
    }


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}


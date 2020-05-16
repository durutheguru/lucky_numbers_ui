
import WithRender from './back-office-user-details-dialog.html';
import { Component, Prop } from 'vue-property-decorator';

import Modal from '@/components/modal/Modal';
import BaseVue from '@/components/BaseVue';
import { Log, Constants } from '@/components/util';


@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class BackOfficeUserDetailsDialog extends BaseVue {


    @Prop({default: false})
    private visible!: boolean;

    @Prop()
    private user: any;


    public mounted() {
        Log.info('Showing User Details: ' + JSON.stringify(this.user));
    }

    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}


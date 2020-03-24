import { Component } from 'vue-property-decorator';

import BaseVue from '../../components/BaseVue';
import TopNav from '../../components/backoffice/topnav/TopNav';

import WithRender from './back-office-home.html';


@WithRender
@Component({
    components: {
        TopNav,
    },
})
export default class BackOfficeHome extends BaseVue {





}

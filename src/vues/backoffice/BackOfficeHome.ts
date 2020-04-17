import { Component } from 'vue-property-decorator';

import BaseVue from '../../components/BaseVue';
import SideMenu from '@/components/side-menu/SideMenu';

import WithRender from './back-office-home.html';


@WithRender
@Component({
    components: {
        SideMenu,
    },
})
export default class BackOfficeHome extends BaseVue {





}

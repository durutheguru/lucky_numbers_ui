import { Component } from 'vue-property-decorator';

import BaseVue from '../../components/BaseVue';

import WithRender from './login.html';


@WithRender
@Component
export default class LoginComponent extends BaseVue {

}

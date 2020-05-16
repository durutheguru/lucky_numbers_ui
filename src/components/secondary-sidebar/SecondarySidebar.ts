import $ from 'jquery';
import { Component } from 'vue-property-decorator';
import WithRender from './secondary-sidebar.html';
import BaseVue from '../BaseVue';

import { Log, Constants } from '@/components/util';
import { EventBus } from '@/components/core/Event';
import UserAction from '@/components/core/UserAction';


@Component
@WithRender
export default class SecondarySidebar extends BaseVue {


    private actions: UserAction[] = [];


    public mounted() {
        Log.info('Setting up Secondary Sidebar Event Handlers');

        EventBus.$on(Constants.routeUpdateEvent, (data: any) => {
            Log.info('Route Updated: ' + JSON.stringify(data));

            this.setUserActions(data.actions);
        });

        EventBus.$on(Constants.routeClearedEvent, (data: any) => {
            Log.info('Route Cleared.');

            this.clearUserActions();
        });
    }


    private setUserActions(newActions: UserAction[]) {
        this.actions = newActions;
    }


    private execute(action: UserAction) {
        action.executable();
        $('.sb-toggle-right').click();
    }


    private clearUserActions() {
        this.actions = [];
    }


}


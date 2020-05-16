import Vue from 'vue';
import { Util } from '@/components/util';
import { ValidationObserver } from 'vee-validate';


export default class BaseVue extends Vue {

    
    public quantity = Util.quantity;


    public isValidString = Util.isValidString;


    public extractError = Util.extractError;


}


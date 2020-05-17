
import Vue from 'vue';
import PageDataModel from './core/PageDataModel';
import { Component } from 'vue-property-decorator';
import BaseVue from './BaseVue';


@Component
export default class PaginatedContainerVue extends BaseVue {


    public elements!: PageDataModel;


    public get hasElements(): boolean {
        return this.elements && this.elements.hasElements();
    }


    public get canPrevious(): boolean {
        return this.elements.canPrevious();
    }


    public get canNext(): boolean {
        return this.elements.canNext();
    }


    public next() {
        this.elements.next();
    }


    public previous() {
        this.elements.previous();
    }


    public searchCleared() {
        this.elements.clearPageData();
        this.elements.initialize();
    }


}



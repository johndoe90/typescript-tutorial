/**
 * Created by johndoe on 25.05.15.
 */

'use strict';

import {IGreeterService} from './../../components/greeter/greeterService';

export interface IStateOneController {
    name: string;
    greet(): string;
}

export class StateOneController implements IStateOneController {

    public name;

    static $inject = ['greeterService'];
    constructor(private greeterService: IGreeterService) {
    }

    greet(): string {
        return this.greeterService.greet(this.name);
    }
}

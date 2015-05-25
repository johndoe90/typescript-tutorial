/**
 * Created by johndoe on 25.05.15.
 */

'use strict';

export interface IGreeterService {
    greet(name: string): string;
}

export class GreeterService implements IGreeterService {
    greet(name: string): string {
        var greeting = 'Hello, ' + name + '!';
        console.log(greeting);

        return greeting;
    }
}
import { extend, validate } from 'vee-validate';


extend('required', {
    validate(value: string): any {
        return {
            required: true,
            valid: ['', null, undefined].indexOf(value) === -1,
        };
    },

    computesRequired: true,

    message: 'The {_field_} field is required',
});


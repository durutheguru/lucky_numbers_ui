
export default class Util {


    public static isValidString(str: string, empty: boolean = false) {
        return (typeof str === 'string') && ((!empty) ? (!!str && !!str.length) : true);
    }


    public static isValidNumber(num: any) {
        return typeof num === 'number';
    }


    public static isValidObject(obj: any) {
        return obj != null && typeof obj === 'object';
    }


    public static isValidArray(arr: any, empty: boolean) {
        return ((!empty) ? arr && !!arr.length : true);
    }


    public static isValidFunction(f: any) {
        return typeof f === 'function';
    }


    public static isUndefined(obj: any) {
        return typeof obj === 'undefined';
    }


    public static managedString(str: string, maxlength: number) {
        if (typeof str !== 'string') {
            return str;
        }

        if (str.length <= maxlength) {
            return str;
        } else {
            return str.substring(0, maxlength) + '...';
        }
    }


    public static deepGet(parent: any, path: string) {
        const paths = path.split('.');

        for (let k = 0, kLen = paths.length; k < kLen; k++) {
            if (parent != null && Object.prototype.hasOwnProperty.call(parent, paths[k])) {
                parent = parent[paths[k]];
            } else {
                return null;
            }
        }

        return parent;
    }


    public static errorSanitize(msg: string) {
        if (msg.indexOf('java.') > -1) {
            return 'Unknown Error';
        }

        return msg;
    }


    public static extractError(errorResponse: any) {
        const errorMsg = Util.deepGet(errorResponse, 'response.data.message');
        return Util.isValidString(errorMsg, false) ? Util.errorSanitize(errorMsg) : 'Unknown Error';
    }


    public static quantity(num: number, item: string, fullString: boolean) {
        if (num < 0) {
            return item;
        }

        return (fullString ? (num > 0 ? num : 'No') + ' ' : '') + item + ((num <= 1) ? '' : 's');
    }


    public static merge(src: any, dest: any) {
        if (typeof src !== 'object') {
            throw new Error('Source must be Javascript objects');
        }

        if (typeof dest !== 'object') {
            dest = {};
        }

        for (const i in src) {
            if (src.hasOwnProperty(i)) {
                dest[i] = src[i];
            }
        }

        return dest;
    }


}
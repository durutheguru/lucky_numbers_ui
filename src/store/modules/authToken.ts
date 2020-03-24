import Web from '@/components/util/Web';


const state = {
    loggedIn: false,
    authToken: null,
};


const getters = {

    apiToken(context: any) {
        return context.authToken;
    },

    loggedIn(context: any) {
        return context.loggedIn;
    },

};


const mutations = {

    apiToken(context: any, token: string) {
        context.authToken = token;
        context.loggedIn = true;
    },

};


const actions = {

    async authenticate(context: any) {
        return new Promise((resolve, reject) => {
            Web.get(
                '/api/v1/auth',

                (response: any) => {
                    resolve(true);
                },

                (error: any) => {
                    resolve(false);
                },
            );
        });
    },

};


export default {
    namespaced : true,
    state,
    getters,
    actions,
    mutations,
};


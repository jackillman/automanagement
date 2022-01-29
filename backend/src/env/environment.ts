export const ENV = {
    RELEASE_VERSION: 'v0.0.1',

    PORT: process.env.PORT || 4300,

    production: {
        name: 'prod',
        targetOrigin: `https://localhost:4300`,

    },

    local: {
        name: 'local',
        targetOrigin: `https://localhost:4300`,

    },

};

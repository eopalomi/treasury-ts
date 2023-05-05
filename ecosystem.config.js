module.exports = {
    apps: [
        {
            name: 'treasuryApp',
            script: 'build/server.js',
            instances: 1,
            autorestart: false,
            watch: false,
            env_development: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            env_local: {
                NODE_ENV: 'local'
            }
        },
    ],
};

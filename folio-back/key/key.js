if (process.env.NODE_ENV === 'production') {
    module.export = require('./production');
} else {
    module.exports = require('./development');
}
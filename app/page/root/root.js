if (process.env.NODE_ENV === 'production') {
    module.exports = require('./root.prod');
} else {
    module.exports = require('./root.dev');
}
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

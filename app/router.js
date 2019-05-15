'use strict';

module.exports = app => {
    require('./router/index')(app);
    require('./router/other')(app);
    require('./router/news')(app);
};

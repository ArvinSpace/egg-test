'use strict';

module.exports = app => {
    app.router.prefix('/egg-test');
    
    require('./router/index')(app);
    require('./router/other')(app);
    require('./router/news')(app);
    require('./router/Ad_ForbiddenRouter')(app);
    require('./router/Jd_Config')(app);
    require('./router/HttpClient')(app);
    
};

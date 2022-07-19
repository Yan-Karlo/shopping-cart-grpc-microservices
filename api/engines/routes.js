const indexRoutes =  require('../app/routes/index.routes');

module.exports = (app) =>{

    app.use(`/`,indexRoutes);
}
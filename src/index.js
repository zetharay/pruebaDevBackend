const app = require('./app');

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
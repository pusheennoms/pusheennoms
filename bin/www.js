var app = require('../server');

app.listen(process.env.PORT || 8001, () => {
    console.log('Server is up on the port 8001');
});
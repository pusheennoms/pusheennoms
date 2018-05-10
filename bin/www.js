var app = require('../app');

app.listen(process.env.PORT || 8008, () => {
    console.log('Server is up on the port 8008');
});
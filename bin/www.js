var app = require('../app');

app.listen(process.env.PORT || 8010, () => {
    console.log('Server is up on the port 8010');
});
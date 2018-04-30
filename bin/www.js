var app = require('../app');

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is up on the port 8000');
});
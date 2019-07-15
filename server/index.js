import express from 'express';

import serverRenderer from './middleware/renderer';

const PORT = 8000;
const path = require('path');

const app = express();

app.get('/', serverRenderer);
app.use(express.static(path.resolve('dist')));

app.listen(PORT, error => {
    if (error) {
        return console.log('Could not start the app', error);
    }

    console.log('Listening on ' + PORT + '...');
});

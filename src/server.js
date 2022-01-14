import 'dotenv/config';

import app from './app';
app.listen(process.env.APP_PORT || 3001, function() {
    console.log('Server running on port:', this.address().port, app.settings.env)
});
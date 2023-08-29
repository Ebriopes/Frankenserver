const { app, PORT } = require('./server/server');

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));

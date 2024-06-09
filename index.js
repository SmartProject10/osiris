const app = require('./src/app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

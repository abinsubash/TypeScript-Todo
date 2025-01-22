import express from 'express';
import path from 'path';
import router from './router/router'
const app = express();
const PORT: number = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
import express from 'express'
import axios from 'axios'


const app=express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/style'))

let API_KEY='AIzaSyDaWYaUHE-OG1X0hXWA0-a9yril73NLr6o';

app.get('/', (req, res) => {
    res.render('index') // Pass an empty array as the initial value for books
});

app.post('/get-books', async (req, res) => {
    const query = req.body.query;
    console.log(query);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`;
    try {
        const response = await axios.get(url);
        const books = response.data.items;
        console.log(books);
        res.render('detail', { books: books , error:null,bookdetails:null});
    } catch (error) {
        console.error(error);
        res.render('detail', { books: [], error: 'An error occurred while fetching data.',bookdetails:null });
    }
});

app.get('/detail/:id',async(req,res)=>{
    let volumeId=req.params.id;
    try{
    let response=await axios.get(`https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${API_KEY}`)
    let bookdetails=response.data;
    console.log(bookdetails)
    res.render('fulldetails',{bookdetails:bookdetails,books:[],error:null})

    }
    catch(error){
        console.log(error)
        res.render('error',{error:'an error occured while fetching data' })
        
    }
    
})


app.listen(3000,()=>{
    console.log('the server is running')
})

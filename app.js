
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

let myMoviesList = [];

let movieInfo

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use('/css', express.static('css'));

// index page
app.get('/', (req, res) => {


    res.render('index');
});




app.get('/my-movies', (req, res) => {    

    res.render('my-movies', {myMoviesList : myMoviesList});
});


// add movie
app.post('/add-movie', (req, res) => {

    let title = req.body.movieTitle;
    let genre = req.body.movieGenre;
    let description = req.body.movieDescription;
    let poster = req.body.moviePoster;

    let movieItem = {
        title : title,
        genre : genre,
        description : description,
        poster : poster
    };
    
    myMoviesList.push(movieItem);

    res.redirect('/my-movies');

});

app.get('/movies/:title/description', (req, res) => {


    myMovie = myMoviesList.filter(movie => {
        return movie.title == req.params.title
    })[0]

    console.log(myMovie)
    description = myMovie.description
    console.log(description)
    res.render('movie-description', {description: description})
})


app.post('/movie-description', (req, res) => {
    
    let movieDescription = req.body.movieDescription
    console.log(movieDescription)

    myMoviesList = myMoviesList.filter(movie => {
        return movie.description === description
    })


    res.redirect('/movie-description')
})



// remove movie
app.post('/remove-movie', (req, res) => {
    let title = req.body.removeMovieTitle;
    
    myMoviesList = myMoviesList.filter(movie => {
        return movie.title != title;
    });

    res.redirect('/my-movies');
});

app.post('/filter', (req, res) => {
    let genre = req.body.movieGenre;


    myMoviesList = myMoviesList.filter(movie => {
        return movie.genre === genre
    }) 


    res.redirect('/my-movies')
})





















// starts server
app.listen(port, () => console.log(`Port ${port} running!`))
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const exec = require("child_process").exec;
const fs = require('fs');

/*** play with addon ***/
// const addon = require('../build/Release/mergesort_addon.node');
// console.log('addon', addon);
/***********************/

const app = express()

const PORT = process.env.PORT || 3000
// express config paths
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)  // Only if want to change default views path
hbs.registerPartials(partialsPath)

// Setup static derectory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Parallel Mergesort',
        name: 'Kunal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Enter different number of threads and see the magic of parallelism',
        name: 'Kunal'
    })
})

app.get('/sort', (req, res) => {
    const query = req.query;
    finalinput = query.a + '\r\n' + query.b + '\r\n' + query.c;

    console.log("Final input: ", finalinput);
    fs.writeFile('./cpp/inp', finalinput, (err) => {
        if (err) {
            throw err;
        }

        console.log('input file saved...');
        exec("make < ./cpp/inp", (err, stdout) => {
            if(err) {
                console.log(err);
                return res.send({
                    hlo: err
                })
            }

            const output = stdout;
            // console.log(stdout);
            res.send({ output });


        });
    });
    
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMsg: 'Help not found',
        name: 'Kunal'
    })
})

app.get('*', (req, res) => {
    
    res.render('404',{
        title: '404',
        errorMsg: 'Page not found',
        name: 'Kunal'
    })
})


app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})

// module.exports = addon;
//134217728
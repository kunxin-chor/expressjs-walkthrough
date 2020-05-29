const express = require('express');
const app = express();
const port = 3000

// Setup express to consume JSON
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        message:"hello world!"
    })
})

app.post('/process_form', (req,res)=>{
    console.log(req.body);
    res.send(req.body)
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
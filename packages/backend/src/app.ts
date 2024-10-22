import express from 'express';
import {createClient} from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path'

const app = express();
app.use(cors( ))
const envFound = dotenv.config()

if (envFound.error) {
    // This error should crash whole process
    console.log('⚠️ Couldn\'t find .env file')
}

app.use(express.static('../frontend/dist'))

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.json({
    inflate: true,
    limit: '100kb',
    reviver: undefined,
    strict: true,
    type: 'application/json',
    verify: undefined
}))

const supabaseUrl = 'https://rvffpwbcwfdwyqigrelt.supabase.co'
console.log(process.env.SUPABASE_KEY)
const supabaseKey = process.env.SUPABASE_KEY?process.env.SUPABASE_KEY:""
const supabase = createClient(supabaseUrl, supabaseKey)

//const supabase =  createClient({ apiKey: '<API_KEY>',  project: '<PROJECT_ID>' });

app.get('/api/image', async (req, res) => {
    const {data, error} = await supabase
        .from('image')
        .select(`* , 
            user!image_userid_fkey ( id, username ), 
            userimagevoted!id!userid ( imageid, userid )`)
    
    if (error) 
          res.send(error);

    else
          res.send(data);

    
});

app.get('/api/image/:imageId', async (req, res) => {
    const {imageId} = req.params
    const {data, error} = await supabase
        .from('image')
        .select(`* , 
            user!image_userid_fkey ( id, username ), 
            userimagevoted!id!userid ( imageid, userid )`)
        .eq('id', imageId)
        .single()

    if (error) 
          res.send(error);

    else
          res.send(data);

    
});

app.get('/api/user', async (req, res) => {
    const {data, error} = await supabase
        .from('user')
        .select( )
    res.send(data);
});

app.post('/api/signin', async (req, res) => {
    const {name, username, password} = req.body
    
    if(!username || !password)
        res.status(401)

    const {data, error} = await supabase
        .from('user')
        .select(`*`)
        .eq('username', username)
        .eq('password',password)
        .limit(1)
        .single()
    if (error) 
          res.send(error);

    else
          res.send(data);

});

app.post('/api/user', async (req, res) => {
    const {name, username, password} = req.body
    
    if(!username || !password)
        res.status(401)

    const {data, error} = await supabase
    .from('user')
    .insert({
        name:  name,
        username:  username,
        password:  password,
    })
    .select()
    .single()

    if (error) {
        res.send(error);
    }

    console.log("retruning " , data)
    res.send(data);

});


app.get('/api/topimages', async (req, res) => {
    const {data, error} = await supabase
        .from('image')
        .select()
        .limit(5)
    res.send(data);
});

app.get('/api/products/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('products')
        .select()
        .is('id', req.params.id)
    res.send(data);
});

app.post('/api/products', async(req, res) => {
    const {error} = await supabase
        .from('products')
        .insert({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        })
    if (error) {
        res.send(error);
    }
    res.send("created!!");
});

app.put('/api/products/:id', async (req, res) => {
    const {error} = await supabase
        .from('products')
        .update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/api/products/:id', async (req, res) => {
    const {error} = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")

});

 

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'../../../../frontend/dist/index.html'))
})

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});
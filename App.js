//define experess
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./module/blog_module');
// define app
const app = express();
//define mongoose
const url = "mongodb+srv://netninja:rahul12345@cluster0.t7gzdss.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(url)
.then((result)=>{
//port listen
app.listen(3000);
console.log("database is connected");
})
.catch((err)=>{
console.log(err);
})
//setup EJS
app.set('view engine','ejs');
//set middleware for adding data
app.use(express.urlencoded({extended: true}))

//req for pages
// add new blog
app.post('/index',(req,resp)=>{
    const blog = new Blog(req.body);
    console.log(blog);
    blog.save()
    .then((result)=>{
        resp.redirect('/index');
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    })
});

//display single blog details
app.get('/details/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
        .then(result => {
            res.render('details', { data: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error retrieving blog post');
        });
});


// //display all blogs
app.get('/index',(req,resp)=>{
    Blog.find()
    .then((result)=>{
        resp.render('index',{data1:result})
    }).catch((err)=>{
        console.log(err);
    })
})
// display all blogs only success type
app.get('/success',(req,resp)=>{
    Blog.find()
    .then((result)=>{
        resp.render('success_stories',{data1:result})
    }).catch((err)=>{
        console.log(err);
    })
})
// display all blogs only failure type
app.get('/failure',(req,resp)=>{
    Blog.find()
    .then((result)=>{
        resp.render('failure_stories',{data1:result})
    }).catch((err)=>{
        console.log(err);
    })
})
// // display all the blogs for edit
 app.get('/edit_blog',(req,resp)=>{
    const id = req.params.id;
     Blog.find()
     .then((result)=>{
         resp.render('edit_blog',{data1:result})
     }).catch((err)=>{
         console.log(err);
     })
 });
// //delete the blogs
app.delete('/blog/:id',(req,resp)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        resp.json({redirect:'/index'});
        console.log(json());
    }).catch((err)=>{
        console.log(err);
    });
});

app.get('/',(req,resp)=>{
    resp.redirect('index');
});

app.get('/home', (req, resp) => {
    resp.redirect('index');
});
app.get('/add_blog',(req,resp)=>{
    resp.render('add_blog');
});
app.get('/success',(req,resp)=>{
    resp.render('success_stories');
});
app.get('/failure',(req,resp)=>{
    resp.render('failure_stories');
});
app.get('/about',(req,resp)=>{
    resp.render('about');
});
app.get('/edit_blog',(req,resp)=>{
    resp.render('edit_blog');
});
app.get('/startup',(req,resp)=>{
    resp.render('startup');
});


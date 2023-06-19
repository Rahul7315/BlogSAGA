const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./module/blog_module');
const multer = require('multer');

const app = express();
const url = "mongodb+srv://netninja:rahul12345@cluster0.t7gzdss.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(url)
  .then((result) => {
    app.listen(3000);
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
}).single('testImg');

app.post('/index', upload, (req, resp) => {
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
    blog_type: req.body.blog_type,
    name: req.body.name,
    testImg: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  });

  blog.save()
    .then((result) => {
      resp.redirect('/index');
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/details/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { data: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error retrieving blog post');
    });
});

app.get('/index', (req, resp) => {
  Blog.find()
    .then((result) => {
      resp.render('index', { data1: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/success', (req, resp) => {
  Blog.find()
    .then((result) => {
      resp.render('success_stories', { data1: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/failure', (req, resp) => {
  Blog.find()
    .then((result) => {
      resp.render('failure_stories', { data1: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/edit_blog', (req, resp) => {
  Blog.find()
    .then((result) => {
      resp.render('edit_blog', { data1: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/blog/:id', (req, resp) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      resp.json({ redirect: '/index' });
      console.log(json());
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/', (req, resp) => {
  resp.redirect('index');
});

app.get('/home', (req, resp) => {
  resp.redirect('index');
});

app.get('/add_blog', (req, resp) => {
  resp.render('add_blog');
});

app.get('/success', (req, resp) => {
  resp.render('success_stories');
});

app.get('/failure', (req, resp) => {
  resp.render('failure_stories');
});

app.get('/about', (req, resp) => {
  resp.render('about');
});

app.get('/edit_blog', (req, resp) => {
  resp.render('edit_blog');
});

app.get('/startup', (req, resp) => {
  resp.render('startup');
});

app.get('/uploadImg', (req, resp) => {
  resp.render('test_img');
});

// Rest of your code...


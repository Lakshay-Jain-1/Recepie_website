var express = require("express");
const usermodel = require("./model/user");
const { urlencoded } = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const fs =require("fs");
const cookieParser = require("cookie-parser");
const app = express();

// for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // for file name

    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// middlewares
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // this middleware  is used so that client side can access the data
app.use(cookieParser())
app.set("view engine", "ejs");



//read
app.get("/api", async (req, res) => {
  try {
    const data = await usermodel.find({});
    res.json(data);
  } catch (error) {
    console.log("error");
  }
});
//just rendering the form
app.get("/api/newrecepie", (req, res) => {
  res.render("form",{user:null});
});

//create
app.post("/api/newrecepie", upload.single("image"),async (req, res) => {
    const { name } = req.body;
    console.log(req.file.originalname)
    try {
      const document = await usermodel.create({ name,imageurl:`uploads/${req.file.originalname}`
      });
      console.log("document created");
     
      res.cookie("name_recepie", name,{path:"/api/newrecepie/ingredients"}).render("form",{user:true});
     
    } catch (error) {
      console.log("error");
    }
}
);
app.post("/api/newrecepie/ingredients",upload.single("ingre"), async (req, res) => {
    try {
      console.log(req.cookies.name_recepie)
      const update = await usermodel.findOne({ name: req.cookies.name_recepie });
         
         const fileContent = fs.readFileSync(`uploads/${req.file.originalname}`, 'utf8');
           const data = fileContent.split(',')
            update.ingredients=data;
          
      const updateddata = await usermodel.findOneAndReplace(
        { name: req.cookies.name_recepie },
        update
      );
      console.log("document created");
    } catch (error) {
      console.log("error",error);
    }
  }
);
//update
app.put("/api/image/:id", async (req, res) => {
  const { id } = req.params;
  const data_need_update = await usermodel.findById({ id });

  console.log(id);
});

app.put("/api/name/:id", async (req, res) => {
  const { id } = req.params;
  const data_need_update = await usermodel.findById({ id });

  console.log(id);
});

//delete
app.delete("/api/:id", async (req, res) => {
  const { id } = req.params;
  const data_need_delete = await usermodel.findById({ id });

  console.log(id);
});

app.listen(4000, () => {
  console.log("server is working ");
});

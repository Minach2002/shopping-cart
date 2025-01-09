var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  let products=[
    {
    name:"IPHONE 11",
    category:"Mobile",
    decription:"This is a good phone",
    image:"https://th.bing.com/th/id/OIP.tIwbx1U9tqg-w0jPpfEnFgHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      name:"One Plus 7T",
      category:"Mobile",
      decription:"This is a good phone",
      image:"https://www.gizmochina.com/wp-content/uploads/2019/08/OnePlus-7T-c.jpg"
    },
    {
      name:"OPPO 10x",
      category:"Mobile",
      decription:"This is a good phone",
      image:"https://tse1.mm.bing.net/th?id=OIP.8pYAtgdR04LF2udm1iW_-AHaFj&rs=1&pid=ImgDetMain"
    },
    {
      name:"MI Note 9 pro",
      category:"Mobile",
      decription:"This is a good phone",
      image:"https://th.bing.com/th/id/OIP.L2onoIneQ2SwariDBkmplAHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    }
  ]

  res.render('admin/view-products',{admin:true,products})
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body)
  console.log(req.files.Image)
})

module.exports = router;

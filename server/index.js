import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import FoodItem from './models/Fooditem.js';
import Table from './models/Table.js';

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('connected to mongodb')
})


//api routes start here

app.post('/signup', async (req, res) => {

    const { name, email, phone, password, role } = req.body;


    // if (!name) {
    //     return res.json({
    //         success: false,
    //         message: "name is required"

    //     })
    // }
    // if (!phone) {
    //     return res.json({
    //         success: false,
    //         message: "phone is required"

    //     })
    // }

    // if (!email) {
    //     return res.json({
    //         success: false,
    //         message: "email is required"

    //     })
    // }
    // if (!phone) {
    //     return res.json({
    //         success: false,
    //         message: "name is required"

    //     })
    // }
    // if (!password) {
    //     return res.json({
    //         success: false,
    //         message: "password is required"

    //     })
    // }
    // if (!role) {
    //     return res.json({
    //         success: false,
    //         message: "role is required"

    //     })
    // }OR


    // validation to check if all fields are filled starts here

    const emptyFields = [];
    if (!name) emptyFields.push('name');
    if (!email) emptyFields.push('email');
    if (!phone) emptyFields.push('phone');
    if (!password) emptyFields.push('password');
    if (!role) emptyFields.push('role');

    if (emptyFields.length > 0) {
        return res.json({
            success: false,
            message: `${emptyFields.join(',')} are required`
        })
    }
    // validation to check if all fields are filled ends here

    // validation to check if email already exists start here
    const existingUser = await new User.findOne({ email: email });
    if (existingUser) {
        return res.json({
            success: false,
            message: "email already exists"
        })
    }
    // validation to check if email already exists ends here

    // validation to check if phone already exists satrt here
    const existingUserPhone = await new User.findOne({ phone: phone });
    if (existingUserPhone) {
        res.json({
            success: false,
            message: "phone is already exists"
        })
    }

    // validation to check if phone already exists ends here


    const user = new User({
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: role
    })

    const savedUser = await user.save();
    res.json({
        success: true,
        message: "user created successfully",
        data: savedUser
    })

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Email and password are required"
        })
    }
    const existingUser = await User.findOne({ email: email, password: password });
    if (existingUser) {
        return res.json({
            success: true,
            message: "Login Successfully",
            data: existingUser
        })
    }
    else {
        return res.json({
            success: false,
            message: "Invalid email or password"
        })
    }
})

app.post('/createFoodItem', async (req, res) => {
    const { title, price, description, imgurl, category } = req.body;

    const foodItem = new FoodItem({
        title: title,
        description: description,
        price: price,
        imgurl: imgurl,
        category: category
    })
    const savedFoodItem = await foodItem.save();

    res.json({
        success: true,
        message: "Food item created successfully",
        data: savedFoodItem
    })
})
// http:localhost:5000/foodItemByCategory?category=pizza
app.get('/foodItemByCategory', async (req, res) => {
    const { category } = req.query;

    const foodItems = await FoodItem.find({
        category: { $regex: category, $options: 'i' }
    })

    res.json({
        success: true,
        message: "Food item fetch successfully",
        data: foodItems
    })
})

app.get('/foodItems', async (req, res) => {
    const { title } = req.query;

    const foodItems = await FoodItem.find({
        title: { $regex: title, $options: 'i' }
    })

    res.json({
        success: true,
        message: "Food item fetch successfully",
        data: foodItems
    })
})

// create table
app.post('/createTable', async(req, res) => {
    const { tablNumber} = req.body;

    const existingTable = await Table.findOne({ tableNumber: tablNumber });
    if (existingTable) {
        return res.json({
            success: false,
            message: "Table aiready exists"
        })
    }

    const table = new Table({
        tablNumber: tablNumber,
        occupied: false

    })
    const savedTable = await table.save();
    res.json({
        success: true,
        message: "Table created successfully",
        data: savedTable
    })

})
app.post('/bookTable',async(req, res) => {
    const { tableNumber, userId } = req.body;

    const existingTable = await Table.findOne({ tableNumber: tableNumber });
    if (existingTable && existingTable.occupied) {
        return res.json({
            success: false,
            message: "Table already occupied"
        })

    }
    if (existingTable) {
        existingTable.occupied = true;
        existingTable.userId = userId;
        await existingTable.save();
    }
    res.json({
        success: true,
        message: "Table Booked successfully",
        data:existingTable
    })
})

app.post('/unbookTable', async (req, res) => {
   const {tableNumber} =req.body;

   const existingTable = awaitTable.findOne({tableNumber:tableNumber});

   if(existingTable){
    existingTable.occupied = false;
    existingTable.userId = null;
    await existingTable.save();
   }
   res.json({
    success: true,
    message: "Table unbooked successfully",
    data:existingTable
})
})

app.get('/availableTables',async(req,res)=>{
    const { tableNumber, userId } = req.body;

    const availableTables = await Table.find({ occupied:false});
    
         res.json({
            success:true,
            message: "Available yable fetch successfully",
            data:availableTables
        })
})


app.post("/orderFoodItems", async(req, res) => {
    const {userId, tableNumber, items} = req.body

    const totalOrders = await Order.countDocuments();
    const orderId = totalOrders + 1;

    const order = new Order({
        orderId: orderId,
        userId: userId,
        tableNumber: tableNumber,
        items: items
        })

    const savedOrder = await order.save();

    res.json({
        success: true,
        message: "Order placed successfully",
        data: savedOrder
    })
})

app.get("/order", async(req, res)=>{
    const {orderId} = req.query;
  
    const order = await Order.findOne({orderId: orderId});
  
      res.json({
          success: true,
          message: "Order fetched successfully",
          data: order
      })
  })
  
  app.get("/ordersByUserId", async(req, res)=>{
      const {userId} = req.query;
  
      const orders = await Order.find({userId: userId});
  
      res.json({
          success: true,
          message: "Orders fetched successfully",
          data: orders
      })
  });

  
//api routes ends here




app.listen(PORT, () => {
    console.log("server is running on port 5000")
})
require('dotenv').config();
const path = require('path')
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const foods = require('../data.js')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/foods', (req, res) => {
    try {
        const foodList = foods
        if(res.statusCode == 200) {
            res.send(foodList)
        }else{
            res.statusCode = 404
        }
        // res.send(foodList)
    } catch (error) {
        
    }
});

app.post('/api/create-checkout-session', async (req, res) => {
    console.log("checkout session", req.body)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items.map(item=>({
            price_data: {
                currency: 'php',
                product_data: {
                    name: item.name,
                },
                unit_amount: parseInt(item.price) * 100,
            },
            quantity: 1,
        })),
        mode: 'payment',
        success_url: `${process.env.PUBLIC_URL}/#!/success`,
        cancel_url: `${process.env.PUBLIC_URL}/#!/cancel`,
    });

    res.json({ id: session.id });
});
// app.post('/create-checkout-session', async (req, res) => {
//     console.log("checkout session", req.body)
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [{
//             price_data: {
//                 currency: 'php',
//                 product_data: {
//                     name: 'T-shirt',
//                 },
//                 unit_amount: 222000,
//             },
//             quantity: 1,
//         }],
//         mode: 'payment',
//         success_url: 'http://localhost:3000/#!/success',
//         cancel_url: 'http://localhost:3000/#!/cancel',
//     });

//     res.json({ id: session.id });
// });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
const request = require('supertest')

// server main file (index.js)
const app = require('../index')
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('../models/productModel'); // Your product model


// Making test collections
describe('Api Test Collection', () => {

    // Test case 1 (/test)
    it('GET /test | Response text', async () => {
        
        // Making api request to /test
        const response = await request(app).get('/test');

        // our response should have 200 status code
        expect(response.statusCode).toBe(200)

        // expect text
        expect(response.text).toEqual('Test Api is Working ...!')

    })


    // Register api (post)
    it('POST /api/user/create | Response with message', async () => {
        const response = await request(app).post('/api/user/create').send({
            "firstName" : "anshu",
            "lastName" : "s",
            "email" : "ansh91rock@gmail.com",
            "password":"123456"
        })

        console.log(response.body)

        // if already exists
        if(!response.body.success){
            expect(response.body.message).toEqual('User Already Exists!')
        } else{
            expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('User Created Successfully!')
        }

        

        
    })

    // test login function
    it('POST /api/user/login | Response with message', async () => {
        
    })
  
})
  // Test case for creating a contact
  it('POST /api/contacts/create | Should create a new contact', async () => {
    const response = await request(app).post('/api/contacts/create').send({
      name: "John Doe",
      email: "john.doe@example.com",
      message: "This is a test message"
    });

    if (response.body.success) {
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toEqual("Contact created!");
      expect(response.body.data).toHaveProperty("name", "John Doe");
      expect(response.body.data).toHaveProperty("email", "john.doe@example.com");
      expect(response.body.data).toHaveProperty("message", "This is a test message");
    } else {
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual("All fields are required");
    }
  });

  // Test case for getting all contacts
  it('GET /api/contacts/all | Should fetch all contacts', async () => {
    const response = await request(app).get('/api/contacts/all_contacts');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toEqual("All contacts fetched successfully");
    expect(response.body.data).toBeInstanceOf(Array);
  });
  
describe('Product API Test Collection', () => {
  let productId; // To store the created product ID for further tests
  const mockImagePath = path.join(__dirname, 'mockProductImage.jpg');

  beforeAll(async () => {
    // Optionally, you could set up your database connection here
    fs.writeFileSync(mockImagePath, ''); // Create an empty file
  });

  afterAll(async () => {
    // Clean up: remove the mock file and close the DB connection
    fs.unlinkSync(mockImagePath);
    await mongoose.connection.close();
  });

  // Test case for creating a product
  it('POST /api/product/create | Should create a new product', async () => {
    const response = await request(app)
      .post('/api/product/create')
      .field('productName', 'Test Product')
      .field('productPrice', '100')
      .field('productCategory', 'Test Category')
      .field('productDescription', 'Test Description')
      .field('productType', 'Test Type')
      .field('productRating', '5')
      .field('productMph', '120')
      .field('productTransmission', 'Automatic')
      .attach('productImage', mockImagePath);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual('Product Created!');
    expect(response.body.data).toHaveProperty('productName', 'Test Product');

    productId = response.body.data._id; // Save the product ID
  });

  // Test case for fetching all products
  it('GET /api/product/get_all_products | Should fetch all products', async () => {
    const response = await request(app).get('/api/product/get_all_products');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toEqual('Products fetched successfully!');
    expect(response.body.products).toBeInstanceOf(Array);
  });

  // Test case for fetching a single product
  it('GET /api/product/get_single_product/:id | Should fetch a single product', async () => {
    const response = await request(app).get(`/api/product/get_single_product/${productId}`); // Use the saved product ID

    if (response.statusCode === 200) {
      expect(response.body.message).toEqual('Product Fetched!');
      expect(response.body.product).toHaveProperty('_id', productId);
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toEqual('Product not found');
    }
  });

  // Test case for deleting a product
  it('DELETE /api/product/delete_product/:id | Should delete a product', async () => {
    const response = await request(app).delete(`/api/product/delete_product/${productId}`); // Use the saved product ID

    if (response.statusCode === 200) {
      expect(response.body.message).toEqual('Product Deleted!');
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toEqual('Product not found');
    }
  });

  

  // Test case for searching products
  it('GET /api/product/search?q=swift | Should search products by name', async () => {
    const response = await request(app).get('/api/product/search?q=swift');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Search results fetched successfully!');
    expect(response.body.products).toBeInstanceOf(Array);
  });
});
  
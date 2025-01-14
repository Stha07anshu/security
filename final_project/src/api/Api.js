import axios from "axios";
const config = {
    headers : {
        'authorization' : `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data"
    }
}
const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    ...config
});
// creating authorization config
// const config = {
//     headers : {
//         'authorization' : `Bearer ${localStorage.getItem('token')}`
//     }
// }

// Creating test API
export const testApi = () => api.get('/test');

// Register user API
export const registerUserApi = (data) => api.post('/api/user/create', data);

// Login user API
export const loginUserApi = (data) => api.post('/api/user/login', data);

// Function to send OTP to the user's email
export const sendOtpApi = (email) => api.post('/api/user/send-otp', { email });

// Function to verify the OTP entered by the user
export const verifyOtpApi = (email, otp) => api.post('/api/user/verify-otp', { email, otp });

// Function to reset the user's password
export const resetPasswordApi = (email, newPassword) => api.post('/api/user/reset-password', { email, newPassword });

// create product create api
export const createProductApi = (data) => api.post('/api/product/create', data)

// fetch all products
export const getAllProducts = () => api.get('/api/product/get_all_products', config)

//fetch single product
export const getSingleProduct = (id) => api.get(`/api/product/get_single_product/${id}`, config)

// delete product (Task)
export const deleteProduct = (id) => api.delete(`/api/product/delete_product/${id}`)

// update product
export const updateProduct = (id, data) => api.put(`/api/product/update_product/${id}`, data, config)

export const searchProducts = (searchQuery) => api.get(`/api/product/search?q=${searchQuery}`, config);


//find car
export const bookCar = (data) => api.post('/api/car/book', data, config);

// Get all car bookings API
export const getAllBookings = () => api.get('/api/car/all_bookings', config);

// Get single car booking API
export const getSingleBooking = (id) => api.get(`/api/car/single_bookings`, config);

// Update car booking API
export const updateBooking = (id, data) => api.put(`/api/car/update_bookings/${id}`, data, config);

// Delete car booking API
export const deleteBooking = (id) => api.delete(`/api/car/delete_bookings/${id}`, config);

// Reservation APIs
export const createReservationApi = (data) => api.post('/api/reservations/create', data, config);
export const getAllReservations = () => api.get('/api/reservations/all_reservations', config);
export const getReservation = (id) => api.get(`/api/reservations/single_reservations`, config);
export const updateReservation = (id, data) => api.put(`/api/reservations/update_reservations/${id}`, data, config);
export const deleteReservation = (id) => api.delete(`/api/reservations/delete_reservations/${id}`, config);

// Contact APIs
export const createContactApi = (data) => api.post('/api/contacts/create', data, config);
export const getAllContacts = () => api.get('/api/contacts/all_contacts', config);


// Create a new mobile booking
export const createMobileBooking = (data) => api.post('/mobile/create', data, config);

// Fetch all mobile bookings
export const getAllMobileBookings = () => api.get('/mobile/all_bookings', config);

// Fetch a single mobile booking by ID
export const getMobileBooking = (id) => api.get(`/mobile/single_booking/${id}`, config);

// Update a mobile booking by ID
export const updateMobileBooking = (id, data) => api.put(`/mobile/update_booking/${id}`, data, config);

// Delete a mobile booking by ID
export const deleteMobileBooking = (id) => api.delete(`/mobile/delete_booking/${id}`, config);
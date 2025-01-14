import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleProduct, updateProduct } from '../../api/Api';
import { toast } from 'react-toastify';
import '../admin_css/AdminUpdate.css';
import { Navbar } from 'reactstrap';

const AdminUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productType, setProductType] = useState('');
    const [productRating, setProductRating] = useState('');
    const [productMph, setProductMph] = useState('');
    const [productTransmission, setProductTransmission] = useState(''); // New state for transmission
    const [productNewImage, setProductNewImage] = useState(null);
    const [previewNewImage, setPreviewNewImage] = useState(null);
    const [oldImage, setOldImage] = useState('');

    useEffect(() => {
        getSingleProduct(id).then((res) => {
            const product = res.data.product;
            setProductName(product.productName);
            setProductPrice(product.productPrice);
            setProductDescription(product.productDescription);
            setProductCategory(product.productCategory);
            setProductType(product.productType);
            setProductRating(product.productRating);
            setProductMph(product.productMph);
            setProductTransmission(product.productTransmission); // Fetch transmission data
            setOldImage(product.productImage);
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to fetch product details.");
        });
    }, [id]);

    const handleImage = (event) => {
        const file = event.target.files[0];
        setProductNewImage(file);
        setPreviewNewImage(URL.createObjectURL(file));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productCategory', productCategory);
        formData.append('productDescription', productDescription);
        formData.append('productType', productType);
        formData.append('productRating', productRating);
        formData.append('productMph', productMph);
        formData.append('productTransmission', productTransmission); // Include transmission

        if (productNewImage) {
            formData.append('productImage', productNewImage);
        }

        updateProduct(id, formData).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
                navigate('/admin');
            } else {
                toast.error("Failed to update product.");
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                    toast.error(error.response.data.message || "Internal server error.");
                } else if (error.response.status === 400) {
                    toast.warning(error.response.data.message || "Bad request.");
                }
            } else {
                toast.error("Something went wrong!");
            }
        });
    };

    return (
        <div className='container mt-3'>
            <Navbar/>
            <h2>Update Product: <span className='text-danger'>{productName}</span></h2>
            <div className='d-flex gap-3'>
                <form onSubmit={handleUpdate} className='w-50'>
                    <label htmlFor="productName">Product Name</label>
                    <input
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className='form-control'
                        type="text"
                        placeholder='Enter product name'
                        id="productName"
                        required
                    />

                    <label className='mt-2' htmlFor="productPrice">Product Price</label>
                    <input
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className='form-control'
                        type="number"
                        placeholder='Enter product price'
                        id="productPrice"
                        required
                    />

                    <label className='mt-2' htmlFor="productCategory">Choose Category</label>
                    <select
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className='form-control'
                        id="productCategory"
                        required
                    >
                        <option value="" disabled>--Select--</option>
                        <option value="SUV">SUV</option>
                        <option value="PickUpTruck">Pick Up Truck</option>
                        <option value="4wd">4WD</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Sedan">Sedan</option>
                    </select>

                    <label className='mt-2' htmlFor="productDescription">Description</label>
                    <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className='form-control'
                        id="productDescription"
                        required
                    ></textarea>

                    <label className='mt-2' htmlFor="productType">Product Type</label>
                    <select
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        className='form-control'
                        id="productType"
                        required
                    >
                        <option value="" disabled>--Select Type--</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                    </select>

                    <label className='mt-2' htmlFor="productRating">Product Rating</label>
                    <select
                        value={productRating}
                        onChange={(e) => setProductRating(e.target.value)}
                        className='form-control'
                        id="productRating"
                        required
                    >
                        <option value="" disabled>--Select Rating--</option>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>{rating}</option>
                        ))}
                    </select>

                    <label className='mt-2' htmlFor="productMph">Product MPH</label>
                    <input
                        value={productMph}
                        onChange={(e) => setProductMph(e.target.value)}
                        className='form-control'
                        type="number"
                        placeholder='Enter product MPH'
                        id="productMph"
                        required
                    />

                    <label className='mt-2' htmlFor="productTransmission">Transmission</label>
                    <select
                        value={productTransmission}
                        onChange={(e) => setProductTransmission(e.target.value)}
                        className='form-control'
                        id="productTransmission"
                        required
                    >
                        <option value="" disabled>--Select Transmission--</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                    </select>

                    <label className='mt-2' htmlFor="productImage">Choose Product Image</label>
                    <input
                        onChange={handleImage}
                        type="file"
                        className='form-control'
                        id="productImage"
                    />

                    <button type="submit" className='btn btn-danger w-100 mt-2'>Update Product</button>
                </form>
                <div className='image-section'>
                    <h6>Old Image Preview</h6>
                    {oldImage && (
                        <img
                            className='img-fluid object-fit-cover rounded-4'
                            height={'200px'}
                            width={'200px'}
                            src={`http://localhost:5000/products/${oldImage}`}
                            alt="Old Product"
                        />
                    )}
                    {previewNewImage && (
                        <div>
                            <h6>New Image Preview</h6>
                            <img
                                className='img-fluid object-fit-cover rounded-4'
                                height={'200px'}
                                width={'200px'}
                                src={previewNewImage}
                                alt="New Product"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUpdate;

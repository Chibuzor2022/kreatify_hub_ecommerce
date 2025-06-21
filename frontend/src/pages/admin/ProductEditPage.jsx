
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '../../slices/productApiSlice';
import ImageUploader from '../../components/ImageUploader'; // Component for handling image uploads

const ProductEditPage = () => {
  const { id: productId } = useParams(); // Extract product ID from URL
  const navigate = useNavigate();

  // Local state for form fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  // Fetch product details by ID
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId);

  // Mutation hook for updating product
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Log product data for debugging
    console.log("📤 Sending Product Data:", {
      id: productId,
      name,
      price,
      images,
      brand,
      category,
      description,
      countInStock,
    });

    try {
      // Send update request to server
      await updateProduct({
        id: productId,
        name,
        price,
        images,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();

      toast.success('Product updated');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Populate form fields when product is loaded
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setImages(product.images || []);
    }
  }, [product]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      {isLoading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">Failed to load product</div>
      ) : (
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium">Images</label>
            <ImageUploader images={images} setImages={setImages} />
          </div>

          {/* Stock Count */}
          <div>
            <label className="block text-sm font-medium">Count in Stock</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium">Brand</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loadingUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingUpdate ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditPage;

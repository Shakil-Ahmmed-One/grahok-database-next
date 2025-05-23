"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaBullseye,
  FaDollarSign,
  FaHashtag,
  FaPencil,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import { fetchProducts, deleteProduct } from "./actions";
import ConfirmDialog from "@/app/(routes)/entries/customer/add/components/ConfirmDialog";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState("");
  const confirmDialogRef = useRef();

  useEffect(() => {
    (async () => {
      const response = await fetchProducts();
      try {
        const { products } = await response.json();
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        setError(error);
      }
    })();
  }, []);

  function openConfirmDialog(productId) {
    setSelectedProductId(productId); // Store the selected product ID
    confirmDialogRef.current.open(); // Open the confirmation dialog
  }

  async function handleDelete() {
    try {
      const response = await deleteProduct(selectedProductId);
      const { deletedProduct } = await response.json();
      setProducts((prev) =>
        prev.filter((product) => product._id !== selectedProductId)
      );
      console.log("Product deleted successfully", deletedProduct);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-3xl font-bold">All Products:</h1>
      <table className="table-auto [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center">
        <thead>
          <tr>
            <th>
              <div className="flex gap-1 items-center">
                <FaHashtag />
                <span>ID</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaUser />
                <span>Name</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Purchase Price</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>In Stock</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Sell Price</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaBullseye />
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          )}
          {!loading && !products.length && (
            <tr>
              <td colSpan={6}>No Product Found</td>
            </tr>
          )}
          {products.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.purchasePrice}</td>
              <td>{product.inStock}</td>
              <td>{product.sellPrice}</td>
              <td>
                <div className="flex gap-1">
                  <a
                    href={`/products/edit/${product._id}`}
                    className="p-2 bg-green-600 text-white rounded-md"
                  >
                    <FaPencil />
                  </a>
                  <button
                    className="p-2 bg-red-600 text-white rounded-md cursor-pointer"
                    onClick={() => openConfirmDialog(product._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}

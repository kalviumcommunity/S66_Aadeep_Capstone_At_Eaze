import React from "react";
import SellerSidebar from "@/components/seller/SellerSidebar";
import ProductForm from "@/components/ProductForm";

const AddProduct = () => {
  return (
    <div className="flex min-h-screen bg-ateaze-cream">
      <SellerSidebar />
      <div className="flex-1">
        <ProductForm mode="create" />
      </div>
    </div>
  );
};

export default AddProduct;

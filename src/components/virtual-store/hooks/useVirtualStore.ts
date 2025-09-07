"use client";

import { useState } from "react";
import { Product, ShelfData } from "../types";

interface UseVirtualStoreProps {
  initialProducts?: Product[];
  initialShelves?: ShelfData[];
}

export const useVirtualStore = ({}: UseVirtualStoreProps = {}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return {
    selectedProduct,
    isModalOpen,
    openModal,
    closeModal,
  };
};

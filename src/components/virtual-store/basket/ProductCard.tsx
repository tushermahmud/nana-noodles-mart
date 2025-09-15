'use client';

import { Product } from '@/types/products';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  position: 'first' | 'second' | 'third';
  onProductClick: (product: Product) => void;
}

const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
  return (
    <div
      className="relative w-1/3 h-full flex items-center justify-center group cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="relative h-full w-[80px] md:w-[120px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="object-cover image-anime shadow-2xl mb-[30px] scale-100 group-hover:translate-y-[-50px] transition-transform duration-300"
          fill
          sizes="(max-width: 768px) 33vw, 33vw"
        />
      </div>

      {/* Product info overlay */}
      <div className="absolute -bottom-[25px] gap-2 left-0 right-0 bg-[#BB8654] to-transparent p-1 h-[100px] border-3 border-[#CC9865] flex flex-col justify-center">
        <h4 className="text-xs font-bold text-white truncate bg-[#BC935E] py-2 text-center">{product.name}</h4>
        <hr className="border-[#9A7443] border-2" />
        <div className="flex items-center justify-center py-2 bg-[#BC935E]">
          <span className="text-xs font-bold text-yellow-300">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

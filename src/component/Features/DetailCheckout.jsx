import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DetailCheckout = ({ selectedColor, selectedRam, selectedRom, activeimage, stock }) => {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const increaseQuantity= () => {
    if( quantity < stock ) {
      setQuantity (quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1 ) {
      setQuantity (quantity - 1);
    }
  };

  return (
    <div className="border-2 border-gray-400 bg-gray-100 flex flex-col rounded-3xl min-h-110 w-80 shadow-2xl">
      <div className="p-7">
        <h2 className="text-lg font-bold text-left mb-2">Atur Jumlah dan catatan </h2>
        <div className="flex h-25 gap-5 ">
        <img 
        src={activeimage}
        className="h-16 w-12 mt-2"/>
        <div className="inline-block mt-0">
          <p>{selectedColor || "Warna"}</p>
          <div className="flex gap-1">
            <p className="mt-2">{selectedRam || "Ram"}</p>
            <p className="mt-2">/</p>
            <p className="mt-2">{selectedRom || "Rom"}</p>
          </div>
        </div>
        </div>
        <div>
        <div className="flex items-center justify-between">
        {/* Tombol Kurang */}
        <button 
          onClick={decreaseQuantity} 
          className="border border-gray-500 px-3 py-1 rounded-md text-lg font-bold"
          disabled={quantity === 1}
        >
          -
        </button>

        {/* Jumlah Produk */}
        <span className="text-lg font-semibold px-4">{quantity}</span>

        {/* Tombol Tambah */}
        <button 
          onClick={increaseQuantity} 
          className="border border-gray-500 px-3 py-1 rounded-md text-lg font-bold"
          disabled={quantity >= stock}
        >
          +
        </button>

        {/* Stok Produk */}
        <p className="ml-3 text-lg font-medium">
          Stok: <span className="font-bold">{stock}</span>
        </p>
      </div>
        </div>
      </div>
      <div className="justify-items-center pt-5 inline-grid gap-2 ">
        {/* Beli Sekarang */}
        <div>
          <button 
          className="border-2 w-70 bg-blue-600 font-bold h-fit py-1 rounded-xl border-gray-400 "  
          onClick={() => navigate("/contact")}
          >
            <p className="text-white">Beli Sekarang</p>
          </button>
        </div>
        {/* Chat ke Admin */}
        <div>
          <button 
          className="border-2 w-70 font-bold h-fit py-1 rounded-xl border-neutral-400 "  
          onClick={() => navigate("/contact")}
          >
            <p className="text-neutral-800">Kirim Pesan ke Admin</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCheckout;
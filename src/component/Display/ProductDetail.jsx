import { useParams, useNavigate } from "react-router-dom";
import listcard from "../../util/ProductData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMapLocationDot, faTruck, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import DetailCheckout from "../Features/DetailCheckout";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = listcard.find((item) => String(item.id) === String(id));
  // Jika tidak ditemukan, tampilkan pesan
  if (!product) {
    return <p className="text-center text-red-500">Produk tidak ditemukan.</p>;
  }

  const handleBack = () => {
    if (window.innerWidth <= 768) {
      navigate("/product"); // Jika layar kecil (HP), langsung ke halaman /product
    } else {
      navigate(-1); // Jika layar besar (PC), gunakan navigate(-1)
    }
  };

  // State untuk gambar aktif dan warna dan ukuran terpilih
  const [activeImage, setActiveImage] = useState(product.photo);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedRom, setSelectedRom] = useState("");
  const [stock, setStock] = useState(product?.stock ? 0 : null);

  // Data warna dan gambar alternatif
  const colorOptions = product.hasMultipleColors
    ? [
        { name: "Biru Laut", image: product.photo }, //Gambar Default
        { name: "Pink", image: product.photo1 }, //Gambar Alternatif
        // Tambahkan warna lain sesuai kebutuhan
      ]
    : [{ name: product.color, image: product.photo }];

  const ramOptions = product.ram || []; // Data ukuran Ram (Contoh ukuran HP: 8GB, 12GB, 16GB)
  const romOptions = product.rom || []; // Data ukuran Rom (Contoh ukuran HP: 128GB, 256GB, 512GB)

  const updateStock = (color, ram, rom) => {
    if (!product.stock) {
      setStock(0);
      return;
    }
    const key = `${color}-${ram}-${rom}`;
    setStock(product.stock[key] || 0);
  };

  useEffect(() => {
    updateStock(selectedColor, selectedRam, selectedRom);
  }, [selectedColor, selectedRam, selectedRom]);

  // Fungsi untuk mengubah gambar saat warna dipilih
  const handleColorSelect = (color) => {
    setSelectedColor(color.name);
    setActiveImage(color.image);
  };

  // Fungsi pilih ukuran Rome
  const handleRamSelect = (size) => {
    setSelectedRam(size);
  };
  // Fungsi pilih ukuran Rome
  const handleRomSelect = (size) => {
    setSelectedRom(size);
  };

  return (
    <div className="py-10 h-200 bg-neutral-100 w-screen">
      <div
        className="bg-black flex text-neutral-200 w-screen h-fit gap-70
        max-sm:py-0 max-sm:gap-3 max-sm:text-xs"
      >
        <div
          className="flex text-xl items-center py-2 pl-15 gap-2 font-sans font-bold
          max-sm:pl-4"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="cursor-pointer"
            onClick={handleBack}
          />
          <h1> Kembali?</h1>
        </div>
        <div className="flex text-xl items-center py-2 gap-2">
          <FontAwesomeIcon icon={faTruckFast} />
          <h1>Free Delivery on Above IDR 10.000.000</h1>
        </div>
      </div>
      <div className="h-100 w-screen flex flex-row gap-0 text-neutral-800 py-5">
        {/* DetailProduct */}
        <div className="w-200 h-100 ">
          {/* Pemilihan Opsi Product */}
          <div className="flex">
            <img
              src={activeImage}
              className="w-77 mx-12 h-108 rounded-sm"
              id="productMainImage"
            />
            <div className="h-120 w-100">
              <div className="inline-block">
                <h1 className="font-bold text-3xl">{product.name}</h1>
                <div className="bg-blue-500 flex flex-wrap gap-2 text-sm items-center h-fit w-40 rounded-3xl px-3 my-2 text-white ">
                  <FontAwesomeIcon icon={product.tagimg} />
                  <h1>{product.tag}</h1>
                </div>
                <p className="font-bold">Terjual</p>
                <h2 className="font-extrabold text-4xl my-2">
                  {product.price}
                </h2>
                <hr className="w-100 text-gray-300"></hr>
              </div>
              <div className="inline-block">
                {/* Pilih Warna */}
                <div className="mt-5">
                  <div className="flex gap-1">
                    <h1 className="font-extrabold">Pilih Warna : </h1>
                    {selectedColor}
                  </div>
                  <div className="flex gap-5">
                    {colorOptions.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => handleColorSelect(color)}
                        className={`border-2 border-gray-400 text-gray-400 px-2 rounded-xl flex items-center gap-2 h-auto ${
                          selectedColor === color.name ? "bg-gray-300" : ""
                        }`}
                      >
                        <img
                          className="h-10 w-5 rounded-sm"
                          src={color.image}
                        ></img>
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Pilih Ram */}
                <div className="mt-5">
                  <div className="flex gap-1">
                    <h1 className="font-bold">Pilih Ukuran Ram :</h1>{" "}
                    {selectedRam}
                  </div>
                  <div className="flex gap-5">
                    {ramOptions.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleRamSelect(size)}
                        className={`border-2 border-gray-400 text-gray-400 px-4 py-2 rounded-lg w-20 ${
                          selectedRam === size ? " bg-gray-300" : ""
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Pilih Rom */}
                <div className="mt-5">
                  <div className="flex gap-1">
                    <h1 className="font-bold">Pilih Ukuran Rom</h1>{" "}
                    {selectedRom}
                  </div>
                  <div className="flex gap-5">
                    {romOptions.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleRomSelect(size)}
                        className={`border-3 border-gray-400 text-gray-400 px-4 py-2 rounded-lg w-20 ${
                          selectedRom === size ? " bg-gray-300 " : ""
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Teks untuk Detail dari Product */}
          <div className="h-50 pl-12 text-black flex gap-10">
            <div className="inline-block text-md">
              <h1 className="font-bold text-xl">Detail Produk</h1>
              <hr className="my-3 text-gray-300 w-78"/>
              <div className="flex gap-10">
                <div className="inline-block text-gray-600">
                  <p>Kondisi</p>
                  <p>Status Sinyal</p>
                  <p>Tahun Rilis</p>
                  <p>Tipe Garansi</p>
                </div>
                <div className="inline-block">
                  <p>: Second, Seperti Baru</p>
                  <p>: Sinyal Aktif</p>
                  <p>: 2024</p>
                  <p>: Garansi Merek (Resmi)</p>
                </div>
              </div>
            </div>
            <div className="inline-block text-md gap-0">
              <h1 className="font-bold text-xl">Pengiriman</h1>
              <hr className="my-3 text-gray-300 w-78"/>
              <div className="flex gap-10">
                <div className="inline-block">
                  <div className="flex gap-5 items-center">
                    <FontAwesomeIcon icon={faMapLocationDot}/>
                    <div className="flex gap-1">
                    <p>Dikirim dari</p>
                    <p className="font-bold">Jawa Tengah</p>
                    </div>
                  </div>
                  <div className="inline-block">
                    <div className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faTruck} className="text-md"/> 
                      <p className="font-bold">Ongkir IDR 7.500</p>
                    </div>
                    <p className="text-gray-600 -mt-1 pl-9">Estimasi tiba tergantung lokasi anda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Detil CheckOut */}
        <div className="h-100 w-130 justify-items-center">
          <DetailCheckout
            activeimage={activeImage}
            selectedColor={selectedColor}
            selectedRam={selectedRam}
            selectedRom={selectedRom}
            stock={stock}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

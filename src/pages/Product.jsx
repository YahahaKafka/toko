import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import listcard from "../util/ProductData";
import { useEffect } from "react";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (sessionStorage.getItem("prevPage") === "/product/:id") {
      const scrollY = sessionStorage.getItem("scrollPosition");
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10));
      }
    }

    return () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
      sessionStorage.setItem("prevPage", location.pathname);
    };
  }, []);

  return (
    <>
      <div className="pt-15 pb-20 w-screen bg-gray-300">
        <h1 className="font-bold mt-5 mb-12 text-3xl text-center">
          Product Store
        </h1>
        <div
          className="flex flex-wrap w-screen px-5 gap-10 justify-center 
                     max-sm:grid max-sm:grid-cols-2 max-sm:gap-4 max-sm:px-4"
        >
          {listcard.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(`/product/${item.id}`)}
              className="border-none bg-gray-100 flex flex-col rounded-3xl min-h-110 w-80 shadow-2xl 
                         max-sm:w-full max-sm:min-h-auto max-sm:rounded-lg max-sm:shadow-md 
                         cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="pt-7 px-15 max-sm:pt-4 max-sm:px-2 md:justify-center">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="h-50 w-50 max-sm:h-38 max-sm:w-38 object-cover rounded-xl mx-auto"
                />
                <div className="bg-blue-500 flex gap-2 items-center my-5 px-4 py-1 w-fit text-left rounded-2xl text-xs text-white font-bold
                                max-sm:my-3 max-sm:px-3 max-sm:text-xs max-sm:w-full max-sm:font-normal">
                  <FontAwesomeIcon icon={item.tagimg} />
                  <h1>{item.tag}</h1>
                </div>
                <div className="text-xl text-left h-28 max-sm:text-sm max-sm:h-20">
                  <h1 className="font-bold">{item.name}</h1>
                  <h2>{item.price}</h2>
                </div>
              </div>
              <ul className="text-gray-400 text-center max-sm:text-sm max-sm:h-auto">
                <li className="pb-4 max-sm:text-xs">Lihat Selengkapnya</li>
              </ul>
            </div>
          ))}
        </div>
        <h1 className="font-bold mt-15 text-2xl text-center">Happy Shooping</h1>
      </div>
    </>
  );
};

export default Product;

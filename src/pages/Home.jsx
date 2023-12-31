import { useState } from "react";
import { Link } from "react-router-dom";
import { dataProductos } from "../data/allData";
import { motion } from "framer-motion";
import {
  rtingsg4,
  gproside,
  padtiger,
  keycrone,
  logig,
  logigpros,
} from "../assets/Images";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }} // Estado inicial (invisible)
      animate={{ opacity: 1 }} // Estado animado (visible)
      exit={{ opacity: 0 }} // Estado de salida (invisible)
    >
      <div className="mx-4 md:mx-0 mt-24 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="relative w-full h-52 md:h-72">
            <Link to="/productos">
              <img
                src={rtingsg4}
                alt="rtingsg4"
                className={`object-cover w-full h-full rounded-3xl hover:brightness-75 hover:duration-100 duration-100 ${
                  isLoading ? "animate-pulse" : ""
                }`}
                onLoad={() => setIsLoading(false)}
              />
              <p className="text-xl md:text-3xl font-bold absolute bottom-5 left-5 text-white">
                Monitores
              </p>
            </Link>
          </div>
          <div className=" relative w-full h-52 md:h-72">
            <Link to="/productos">
              <img
                src={keycrone}
                alt="keycrone"
                className={`object-cover w-full h-full rounded-3xl hover:brightness-75 hover:duration-100 duration-100 ${
                  isLoading ? "animate-pulse" : ""
                }`}
                onLoad={() => setIsLoading(false)}
              />
              <p className="text-xl md:text-3xl font-bold absolute bottom-5 left-5 text-white">
                Teclados
              </p>
            </Link>
          </div>
          <div className="relative w-full h-52 md:h-72">
            <Link to="/productos">
              <img
                src={padtiger}
                alt="padtiger"
                className={`object-cover w-full h-full rounded-3xl hover:brightness-75 hover:duration-100 duration-100 ${
                  isLoading ? "animate-pulse" : ""
                }`}
                onLoad={() => setIsLoading(false)}
              />
              <p className="text-xl md:text-3xl font-bold absolute bottom-5 left-5 text-white">
                Mousepads
              </p>
            </Link>
          </div>
          <div className="relative w-full h-52 md:h-72">
            <Link to="/productos">
              <img
                src={gproside}
                alt="gproside"
                className={`object-cover w-full h-full rounded-3xl hover:brightness-75 hover:duration-100 duration-100 ${
                  isLoading ? "animate-pulse" : ""
                }`}
                onLoad={() => setIsLoading(false)}
              />
              <p className="text-xl md:text-3xl font-bold absolute bottom-5 left-5 text-white">
                Mouses
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <div className="flex flex-row justify-between">
          <h3 className="text-sm md:text-xl font-bold px-4 md:px-0 md:mx-0">
            🔥 Productos en tendencia
          </h3>
          <Link
            className="flex flex-row text-gray-500 hover:text-black mr-4 md:mr-0 text-sm items-center"
            to="/productos"
          >
            Ver más
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 mt-10 gap-4 pb-10 mx-4 md:mx-0">
          {dataProductos.slice(0, 3).map((producto) => (
            <Link
              key={producto.id}
              to={`/productos/${producto.id}`}
              className="cursor-pointer bg-white border border-gray-200 shadow-sm hover:shadow rounded-lg"
            >
              <div className="w-full h-full flex flex-col justify-between">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className={`object-cover mx-auto w-60 ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                  onLoad={() => setIsLoading(false)}
                />
                <div className="flex flex-col px-4 mt-2">
                  <p className="text-sm text-gray-400">{producto.categoria}</p>
                  <h4 className="font-bold text-base">{producto.nombre}</h4>
                  <div className="flex flex-row justify-between items-center mt-6 mb-3">
                    <div className="flex flex-row">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-400 mr-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-xs text-gray-400 self-center">
                        {producto.puntuacion}
                      </p>
                    </div>
                    <p className="font-bold">{`$ ${producto.precio.toLocaleString()}`}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;

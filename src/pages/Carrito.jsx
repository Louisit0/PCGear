import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const MySwal = withReactContent(Swal);

const Carrito = ({ carritoItems, setCarritoItems }) => {
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);

  const deleteProduct = (productId) => {
    const productToDelete = carritoItems.find(
      (producto) => producto.id === productId
    );

    if (productToDelete) {
      const updatedCart = carritoItems.filter(
        (producto) => producto.id !== productId
      );

      setCarritoItems(updatedCart);
    }
  };

  const decreaseVal = (productId) => {
    const updatedCart = carritoItems.map((producto) =>
      producto.id === productId && producto.cantidad > 1
        ? { ...producto, cantidad: producto.cantidad - 1 }
        : producto
    );
    setCarritoItems(updatedCart);
  };

  const increaseVal = (productId) => {
    const updatedCart = carritoItems.map((producto) =>
      producto.id === productId
        ? { ...producto, cantidad: producto.cantidad + 1 }
        : producto
    );
    setCarritoItems(updatedCart);
  };

  const comprar = () => {
    if (carritoItems.length === 0) {
      console.log("carrito vacio");
    } else {
      MySwal.fire({
        title: <strong>Compra realizada</strong>,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setCarritoItems([]);
        navigate("/");
      });
    }
  };

  useEffect(() => {
    const calculatedTotal = carritoItems.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    setTotal(calculatedTotal);
  }, [carritoItems]);

  return (
    <>
      {carritoItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }} // Estado inicial (invisible)
          animate={{ opacity: 1 }} // Estado animado (visible)
          exit={{ opacity: 0 }} // Estado de salida (invisible)
        >
          <div className="w-full md:w-1/2 h-screen flex flex-col mx-auto items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-20 text-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <h2 className="text-3xl font-bold w-2/3 text-center mt-8">
              Tu carrito parece vacío
            </h2>
            <p className="my-6">Agregue artículos a su carrito.</p>
            <Link
              to="/productos"
              className=" bg-black text-white w-2/3 font-bold rounded-xl text-center text-lg flex flex-row gap-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              Seguir comprando
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }} // Estado inicial (invisible)
          animate={{ opacity: 1 }} // Estado animado (visible)
          exit={{ opacity: 0 }} // Estado de salida (invisible)
        >
          <div
            className={`w-full mt-32 mb-20 lg:mb-0 px-4 md:px-0 ${
              carritoItems.length > 0 ? "lg:h-screen" : ""
            }`}
          >
            <div className="flex flex-row items-center justify-between mb-20 md:w-3/5">
              <h2 className="text-4xl font-bold">Su carrito</h2>
              <Link to="/productos" className="px-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-10">
              <div className="flex flex-col md:w-3/5">
                <p>
                  {carritoItems.length === 0 ? "El carrito esta vacío" : ""}
                </p>
                {carritoItems.map((producto) => (
                  <div
                    key={producto.id}
                    className="h-full flex flex-col md:flex-row mb-10"
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="object-cover w-60 h-60 mx-auto md:mx-5"
                    />
                    <div className="flex flex-col pb-0 justify-between w-full">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-xl w-4/5 md:w-full">
                          {producto.nombre}
                        </h3>
                        <button
                          className="h-6 w-6"
                          onClick={() => deleteProduct(producto.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex flex-col md:justify-between md:items-center">
                        <p className="text-base w-full my-4 lg:mb-6 text-gray-500">
                          {producto.descripcion}
                        </p>
                        {/* <p className="text-base mb-4 font-medium">Cantidad:</p> */}
                        <div className="flex justify-start gap-10 items-center md:w-full md:justify-start md:gap-8">
                          <button
                            onClick={() => decreaseVal(producto.id)}
                            className="bg-black rounded-full text-white py-1 px-3 text-lg"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium">
                            {producto.cantidad}
                          </span>
                          <button
                            onClick={() => increaseVal(producto.id)}
                            className="bg-black rounded-full text-white py-1 px-3 text-lg"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-base md:w-full md:text-start mt-4 ">{`$ ${(
                          producto.precio * producto.cantidad
                        ).toLocaleString()}`}</p>
                      </div>
                      <hr className="mt-9" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:w-1/3 px-4 md:px-0">
                <div className="flex justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">{`$ ${total.toLocaleString()}`}</span>
                </div>
                <button
                  className="p-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-bold my-6 flex flex-row items-center gap-2 justify-center text-lg"
                  onClick={comprar}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Finalizar pedido
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Carrito;

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dataProductos } from "../../data/allData";
import { useState } from "react";

const ProductoDetalle = ({
  notificationCount,
  setNotificationCount,
  carritoItems,
  setCarritoItems,
}) => {
  const [cant, setCant] = useState(1);
  const { productosId } = useParams();
  const producto = dataProductos.find(
    (producto) => producto.id === parseInt(productosId)
  );

  const [precioTotal, setPrecioTotal] = useState(producto.precio);

  const aumentarCant = () => {
    if (cant < producto.stock) {
      setCant((prevCant) => prevCant + 1);
      setPrecioTotal((prevPrecioTotal) => prevPrecioTotal + producto.precio);
    }
  };

  const disminuirCant = () => {
    if (cant > 1) {
      setCant((prevCant) => prevCant - 1);
      setPrecioTotal((prevPrecioTotal) => prevPrecioTotal - producto.precio);
    }
  };

  const handleButtonClick = () => {
    setNotificationCount(notificationCount + 1);

    // Verificar si el producto ya está en el carrito
    const existingProduct = carritoItems.find(
      (item) => item.id === producto.id
    );

    if (existingProduct) {
      // Actualizar la cantidad del producto existente
      const updatedCart = carritoItems.map((item) =>
        item.id === existingProduct.id
          ? { ...item, cantidad: item.cantidad + 1 } // Actualizar la cantidad
          : item
      );
      setCarritoItems(updatedCart);
    } else {
      // Agregar el producto al carrito
      setCarritoItems((prevItems) => [
        ...prevItems,
        { ...producto, cantidad: 1 },
      ]);
    }

    toast.success("¡Producto añadido al carrito!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="w-full h-full mt-32 relative">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="object-cover w-2/3 mx-auto md:h-full md:w-full"
          />
        </div>
        <div className="w-full md:w-1/2 bg-gray-50 py-20 px-10">
          <div className="flex flex-col justify-center h-full">
            <p className="text-gray-400">{producto.categoria}</p>
            <h2 className="font-bold text-3xl mb-4">{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <div className="flex flex-row justify-between w-4/5 md:w-1/2 mt-4">
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
                <p className="text-gray-400">{producto.puntuacion}</p>
              </div>
              <p>-</p>

              <p className="font-bold">${producto.precio}</p>
            </div>
            <button
              className="p-4 bg-black text-white uppercase font-bold mt-10 md:w-1/2"
              onClick={handleButtonClick}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;

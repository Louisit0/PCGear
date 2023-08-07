import { Link } from "react-router-dom";
import { dataProductos } from "../data/allData";
import Tabs from "../components/Tabs";

const Productos = () => {
  return (
    <div className="flex flex-col mt-36">
      <Tabs />

      <div className="grid md:grid-cols-3 gap-4 mx-4 md:mx-0">
        {dataProductos.map((producto) => (
          <Link
            key={producto.id}
            to={`/productos/${producto.id}`}
            className="cursor-pointer"
          >
            <div className="h-full bg-white border border-gray-200 shadow-sm rounded-lg">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="rounded-t-lg object-cover"
              />
              <div className="m-4 px-4">
                <h4 className="font-bold">{producto.nombre}</h4>
                <p className="my-4 text-sm">{producto.descripcion}</p>
                <p className="text-green-600">{`$ ${producto.precio}`}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Productos;

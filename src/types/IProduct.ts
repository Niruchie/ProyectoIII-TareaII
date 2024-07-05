import IEntity from "./IEntity";
import Category from "./ICategory";

interface IProduct extends IEntity {
  nombre: string;
  descripcion: string;
  precio: number;
  cantidadEnStock: number;
  categoria: Category;
}

export { IProduct };
export default IProduct;

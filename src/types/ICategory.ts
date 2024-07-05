import IEntity from './IEntity';

interface Categoria extends IEntity {
	nombre: string;
	descripcion: string;
}

export { Categoria };
export default Categoria;
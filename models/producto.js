const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
    },
    img: {
        type: String
    },
});

// Sobreescribo el metodo toJSON para quitar los campos __v para que no
// lo devuelva en el response del controlador
ProductoSchema.methods.toJSON = function() {
    const { __v, _id, estado,  ...producto } = this.toObject();
    producto.uid = _id;
    return producto;
};


module.exports = model( 'Producto', ProductoSchema );

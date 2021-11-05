const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
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
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
});

// Sobreescribo el metodo toJSON para quitar los campos __v para que no
// lo devuelva en el response del controlador
CategoriaSchema.methods.toJSON = function() {
    const { __v, _id,  ...categoria } = this.toObject();
    categoria.uid = _id;
    return categoria;
};


module.exports = model( 'Categoria', CategoriaSchema );

export default function validate(inputs){
const errors = {}

    if(!inputs.name){
        errors.name = 'El nombre no puede estar vacío'
    }

    if(inputs.name.length < 3 ||inputs.name.length > 12){
        errors.name = 'El nombre debe contener de 3 a 12 letras'
    }

    if(inputs.life_span !== Number ||  inputs.height !== Number || inputs.weight !== Number){

        errors.life_span = 'Este campo solo admite valores numericos'
        errors.height = 'Este campo solo admite valores numericos'
        errors.weight = 'Este campo solo admite valores numericos'
    }

    if(inputs.life_span > 999 ||  inputs.height > 999 || inputs.weight > 999){
        errors.life_span = 'Este campo solo admite valores hasta 999'
        errors.height = 'Este campo solo admite valores hasta 999'
        errors.weight = 'Este campo solo admite valores hasta 999'
    }
}
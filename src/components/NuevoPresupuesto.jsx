import { useState } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setPresupuestoValido}) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault()

        if(!presupuesto || presupuesto < 0){
            setMensaje('No es un presupuesto válido')
            return
        }

        setMensaje('')
        setPresupuestoValido(true)
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
        
        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label htmlFor="">Definir presupuesto</label>
                <input 
                    placeholder="Agrega un presupuesto"
                    className="nuevo-presupuesto"
                    type="number" 
                    value={presupuesto}
                    onChange={ e => setPresupuesto(Number(e.target.value))} />
            </div>

            <input type="submit" value='Agregar' />

            {
                mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>
            }
        </form>
    </div>
  )
}

export default NuevoPresupuesto
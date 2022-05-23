import { useState, useEffect } from 'react'
import cerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGastos, gastoEditar, setGastoEditar}) => {

    const [nombre, setNombre] = useState('')

    const [cantidad, setCantidad] = useState('')

    const [categoria, setCategoria] = useState('')

    const [mensaje, setMensaje] = useState('')

    const [id, setId] = useState('')

    const [fecha, setFecha] = useState('')

    const ocultarModal = () => {
        setGastoEditar(false)
        setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')
            return;
        }

        guardarGastos({nombre, cantidad, categoria, id, fecha})

    }

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    }, [])

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={cerrarBtn} 
                alt="boton cerrar"
                onClick={ocultarModal} />
        </div>

        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : `cerrar`}`}>
            <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>

            {
                mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>
            }

            <div className="campo">
                <label htmlFor="nombre">
                    Nombre gasto
                </label>
                <input 
                    type="text" 
                    placeholder='Agrega el nombre del gasto'
                    id='nombre'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">
                    Cantidad
                </label>
                <input 
                    type="number" 
                    placeholder='Agrega la cantidad del gasto'
                    id='cantidad'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">
                    Categoría
                </label>                
                <select 
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                    id="categoria">
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input 
                type="submit" 
                value={gastoEditar.nombre ? 'Guardar cambios' : 'Agregar gasto'}
            />
            
        </form>       
    </div>
  )
}

export default Modal
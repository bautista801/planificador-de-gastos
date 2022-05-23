import React from "react"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from "../helpers/index"
import inconoAhorro from '../img/icono_ahorro.svg'
import inconoCasa from '../img/icono_casa.svg'
import inconoComida from '../img/icono_comida.svg'
import inconoGastos from '../img/icono_gastos.svg'
import inconoOcio from '../img/icono_ocio.svg'
import inconoSalud from '../img/icono_salud.svg'
import inconoSuscripciones from '../img/icono_suscripciones.svg'

const diccionarioIconos = {
    ahorro: inconoAhorro,
    casa: inconoCasa,
    comida: inconoComida,
    gastos: inconoGastos,
    ocio: inconoOcio,
    salud: inconoSalud,
    suscripciones: inconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

    const {categoria, nombre, cantidad, id, fecha} = gasto;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                destructive={true}
                onClick={() => eliminarGasto(id)}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
      <SwipeableList>
          <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
              
            <div className="gasto sombra">
                
                <div className="contenido-gasto">

                    <img src={diccionarioIconos[categoria]} alt="iconos" />

                    <div className="descripcion-gasto">

                        <p className="categoria">{categoria}</p>

                        <p className="nombre-gasto">{nombre}</p>

                        <p className="fecha-gasto">Agregado el: <span>{formatearFecha(fecha)}</span></p>

                    </div>

                </div>
                
                <p className="cantidad-gasto">${cantidad}</p>
            
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import {generarId} from './helpers/index'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  const [presupuestoValido, setPresupuestoValido] =useState(false)

  const [modal, setModal] = useState(false)

  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? [] )

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')

  const [gastosFiltrados, setGastosFiltrados] = useState([])

  const handleGastoNuevo = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
      //console.log('animando modal')
    }, 500)
  }

  const guardarGastos = gasto => {

    if(gasto.id){
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }


    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
        //console.log('animando modal')
      }, 500)
    }
  }, [gastoEditar])

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados)
  }

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0) {
      setPresupuestoValido(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  return (
    <div className={modal ? 'fijar' : ''} >
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        presupuestoValido={presupuestoValido}
        setPresupuestoValido={setPresupuestoValido}
        />

      {
        presupuestoValido && (
          <>
            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                setGastoEditar={setGastoEditar}
                gastos={gastos} 
                eliminarGasto={eliminarGasto} 
                gastosFiltrados={gastosFiltrados} 
                filtro={filtro} />
            </main>

            <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt="icono nuevo gasto" 
              onClick={handleGastoNuevo} />
            </div>
            </>
        )
      }

      {modal && <Modal 
                  setModal={setModal} 
                  animarModal={animarModal} 
                  setAnimarModal={setAnimarModal} 
                  guardarGastos={guardarGastos} 
                  gastoEditar={gastoEditar} 
                  setGastoEditar={setGastoEditar} /> }

    </div>
  )
}

export default App

import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({presupuesto, setPresupuesto, presupuestoValido, setPresupuestoValido, gastos, setGastos}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {
            presupuestoValido ? (
                <ControlPresupuesto
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setPresupuestoValido={setPresupuestoValido}
                />
            ) : (
                <NuevoPresupuesto 
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setPresupuestoValido={setPresupuestoValido}
                />
            )
        }
    </header>
  )
}

export default Header
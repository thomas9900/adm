import { Link } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = ({ shipments, activeCompany }) => {
    return (
        <div className='sidebar'>
            <div className='sidebar__container'>
                {(shipments && shipments.length > 0) ? shipments.map((shipment) => (
                    <Link 
                        className='sidebar__company' to={'/' + shipment.name}
                        onClick={() => activeCompany(shipment)} 
                        key={shipment.id} 
                    >
                        {shipment.name}
                    </Link>
                )) 
                : <h3>Please load shipments over the network.</h3>}
            </div>
        </div>
    )
}   

export default Sidebar
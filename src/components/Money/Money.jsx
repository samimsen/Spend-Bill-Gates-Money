import './Money.css'
import { formatPrice } from '../../helpers/formatPrice'

const Money = ({ money }) => {

    return (
        <div className="money-container">{formatPrice(money)}</div>
    )
}

export default Money
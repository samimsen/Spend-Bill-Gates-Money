import { formatMoneyShort, formatPrice } from '../../helpers/formatPrice'
import './Cart.css'

const Cart = ({ cart }) => {

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.quantity
    }, 0)

    if (cart.length > 0) {
        return (
            <div className='cart-container'>
                <h2>Your Receipt</h2>
                <div className='receipt' >
                    {
                        cart.map((item) => (
                            <div className='receipt-item' key={item.title}>
                                <div className='item-title'>{item.title} </div>
                                <div className='item-quantity'>x{item.quantity} </div>
                                <div className='total-price'>{formatMoneyShort(item.quantity * item.price)} </div>
                            </div>
                        ))
                    }
                </div>
                <hr />
                <div className='total'>
                    <h3 className='total-title'>TOTAL</h3>
                    <div className='total-receipt'>
                        {formatPrice(totalPrice)}
                    </div>
                </div>
            </div>
        )
    }
    return (
        null
    )
}

export default Cart
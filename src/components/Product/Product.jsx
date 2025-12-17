import { useEffect, useState } from 'react'
import './Product.css'
import { formatPrice } from '../../helpers/formatPrice'

const Product = ({ product, img, title, price, updateQuantity, cart, money }) => {

    const quantity = cart.find(item => item.id === product.id)?.quantity ?? 0

    const [inputValue, setInputValue] = useState(Number(quantity))

    useEffect(() => {
        setInputValue(Number(quantity))
    }, [quantity])

    return (
        <div className="product-container">
            <div className="product-info">
                <div className="img-container">
                    <img src={`../../../public/img/${img}`} alt={title} />
                </div>
                <h2 className="product-name">{title}</h2>
                <h3 className="price-text">{formatPrice(price)}</h3>
            </div>

            <div className="buttons">
                <button
                    className={quantity === 0 ? "sell-btn" : "sell-active"}
                    disabled={quantity === 0}
                    onClick={() => updateQuantity(product, quantity - 1)}>
                    Sell
                </button>
                <input
                    type="number"
                    min={0}
                    value={inputValue}
                    onChange={(e) => updateQuantity(product, Number(e.target.value || 0))}
                />
                <button
                    className={money > product.price ? "buy-btn" : ""}
                    disabled={money < product.price}
                    onClick={() => updateQuantity(product, quantity + 1)}>
                    Buy
                </button>
            </div>
        </div>
    )
}

export default Product

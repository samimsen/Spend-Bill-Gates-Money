import { useState, useRef } from 'react'
import './App.css'
import AppContainer from './components/AppContainer/AppContainer'
import Money from './components/Money/Money'
import Product from './components/Product/Product'
import Title from './components/Title/Title'
import { products } from './data'
import Cart from './components/Cart/Cart'

function App() {

  const [money, setMoney] = useState(100000000000)
  const [cart, setCart] = useState([]);

  const moneyTargetRef = useRef(money)
  const animationRef = useRef(null)

  const animateMoneyChange = (targetMoney) => {
    moneyTargetRef.current = targetMoney

    if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    const duration = 3000
    const interval = 1500
    const totalSteps = Math.ceil(duration / interval)

    animationRef.current = setInterval(() => {
      setMoney(prev => {
        const diff = moneyTargetRef.current - prev

        if (diff === 0) {
          clearInterval(animationRef.current)
          animationRef.current = null
          return prev
        }

        const step =
          Math.sign(diff) *
          Math.max(1, Math.ceil(Math.abs(diff) / totalSteps))

        return prev + step
      })
    }, 100)
  }

  const updateQuantity = (product, newQuantity) => {
    if (newQuantity < 0) return

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      const oldQuantity = existing?.quantity ?? 0

      const diff = newQuantity - oldQuantity
      const moneyDiff = diff * product.price

      const currentMoney = moneyTargetRef.current

      if (moneyDiff > 0 && currentMoney < moneyDiff) {
        return prev
      }

      const targetMoney = currentMoney - moneyDiff

      if (moneyDiff !== 0) {
        animateMoneyChange(targetMoney)
      }

      if (newQuantity === 0) {
        return prev.filter(item => item.id !== product.id)
      }

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      }

      return [...prev, { ...product, quantity: newQuantity }]
    })
  }

  return (
    <AppContainer>
      <Title />
      <Money money={money} />
      <div className='products-container'>
        {
          products.map((product) => (
            <Product key={product.id} product={product} {...product} cart={cart} setCart={setCart} updateQuantity={updateQuantity} money={money} />
          ))
        }
      </div>
      <Cart cart={cart} />
    </AppContainer>
  )
}

export default App
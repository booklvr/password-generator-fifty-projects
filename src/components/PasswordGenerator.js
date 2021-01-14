import React, { useState } from 'react'

const PasswordGenerator = () => {
  const [lower, setLower] = useState(true)
  const [upper, setUpper] = useState(true)
  const [number, setNumber] = useState(true)
  const [symbol, setSymbol] = useState(true)
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('')

  const generatePassword = () => {
    let generatedPassword = ''

    const typesCount = lower + upper + number + symbol
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    )

    console.log(typesArr)
    if (typesCount === 0) {
      setPassword('')
      return
    }

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0]
        console.log(funcName)
        generatedPassword += randomFunc[funcName]()
        console.log(generatedPassword)
      })
    }

    const finalPassword = generatedPassword.slice(0, length)

    setPassword(finalPassword)
  }

  const handleClipboard = (e) => {
    const textarea = document.createElement('textarea')

    if (!password) {
      return
    }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
  }

  // Random functions
  const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }

  const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  }

  const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
  }

  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
  }

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  }

  return (
    <div className='container'>
      <h2>Password Generator</h2>
      <div className='result-container'>
        <span id='result'>{password && password}</span>
        <button className='btn' id='clipboard' onClick={handleClipboard}>
          <i className='far fa-clipboard'></i>
        </button>
      </div>
      <div className='settings'>
        <div className='setting'>
          <label>Password Length</label>
          <input
            type='number'
            id='length'
            min='4'
            max='20'
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className='setting'>
          <label>Include uppercase letters</label>
          <input
            type='checkbox'
            id='uppercase'
            checked={upper ? 'checked' : false}
            onChange={() => setUpper(!upper)}
          />
        </div>
        <div className='setting'>
          <label>Include lowercase letters</label>
          <input
            type='checkbox'
            id='lowercase'
            checked={lower ? 'checked' : false}
            onChange={() => setLower(!lower)}
          />
        </div>
        <div className='setting'>
          <label>Include numbers</label>
          <input
            type='checkbox'
            id='numbers'
            checked={number ? 'checked' : false}
            onChange={() => setNumber(!number)}
          />
        </div>
        <div className='setting'>
          <label>Include symbols</label>
          <input
            type='checkbox'
            id='symbols'
            checked={symbol ? 'checked' : false}
            onChange={() => setSymbol(!symbol)}
          />
        </div>
      </div>

      <button
        className='btn btn-large'
        id='generate'
        onClick={() => generatePassword()}
      >
        Generate Password
      </button>
    </div>
  )
}

export default PasswordGenerator

import React, { useEffect, useState } from 'react'
import { Sdk, Env, EnvNames, MetaMaskWalletProvider } from 'etherspot'

const message1 = '👻 Metamask is not detected'
const message2 = '📡 Fail on create Etherspot Sdk Account'
const message3 =
  '✂️ User cancel the connection with the Metamask or Not in Testnets'
const button1 = 'switch to Testnets'

// change default environment
Env.defaultName = 'testnets' as EnvNames

function Connect() {
  const createSdk = (walletProvider: any) => {
    try {
      const sdk = new Sdk(walletProvider)
      const { state } = sdk
      console.info('SDK created', state)
      console.log('Smart wallet', state.account.address)
      setAddress(state.account.address)
      setNetwork(state.network.name)
      setConnected(true)
    } catch (e) {
      setAddress(message2)
    }
  }
  const connectionToMetamask = async () => {
    try {
      const walletProvider = await MetaMaskWalletProvider.connect()
      console.log(walletProvider)
      createSdk(walletProvider)
    } catch (e) {
      setAddress(message3)
    }
  }
  const handleConnetion = async () => {
    if (!MetaMaskWalletProvider.detect()) {
      setAddress(message1)
      return
    }
    await connectionToMetamask()
  }

  const shortAddress = (address: string) => {
    if (address.length === 42) {
      return address.slice(0, 6).concat('...'.concat(address.slice(-4)))
    }
  }

  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState('')
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    handleConnetion()
  })

  const connectButton = () => {
    if (!connected)
      return (
        <button className="btn btn-state no-animation btn-disabled">
          {button1}
        </button>
      )
    else return <></>
  }

  return (
    <div>
      <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
        <div className="sm:flex sm:items-center px-6 py-4">
          <div className="avatar">
            <div className="mb-8 rounded-full w-24 h-24">
              <img
                src="https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-600x400.jpg"
                alt="avatar"
              />
            </div>
          </div>
          <div className="text-center sm:text-left sm:flex-grow">
            <div className="mb-4">
              <p className="text-xl leading-tight text-Secondary">
                address: {shortAddress(address)}
              </p>
              <button className="btn btn-accent	no-animation btn-disabled">{network}</button>
            </div>
            <div>{connectButton()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Connect
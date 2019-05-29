import React, { Component } from 'react'
import { DeveryRegistry } from '@devery/devery'
import LoadData from './LoadDataHelper'

import './App.css';

const deveryRegistryClient = new DeveryRegistry()

export default class extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      account: 'Please sign in to MetaMask',
      checkBrandAddr: '',
      checkProductAddr: '',
      appAccount: null,
    }
  }

  componentDidMount () {
    if (!window.web3) return
    // Checks for active MetaMask account info.
    let account = window.web3.eth.accounts[0]
    if (account === undefined) {
      this.setState({
        account: 'Please sign in to MetaMask.',
      })
      return
    }
    if (account !== this.state.account) {
      this.setState({ account })
    }
  }

  handleBrandAddrChange = e => {
    this.setState({ checkBrandAddr: e.target.value })
  }

  handleProductAddrChange = e => {
    this.setState({ checkProductAddr: e.target.value })
  }

  getBrand = async () => {
    const Brand = await deveryRegistryClient.getBrand(this.state.checkBrandAddr)
    if (!Brand.active) return Promise.reject('No active brand')
    return Promise.resolve(Brand)
  }

  getProduct = async () => {
    const Product = await deveryRegistryClient.getProduct(this.state.checkProductAddr)
    if (!Product.active) return Promise.reject('No product')
    return Promise.resolve(Product)
  }

  handleGetAppAccounts = () => {
    return deveryRegistryClient.appAccountsPaginated()
  }

  handleAppAccountChange = e => {
    this.setState({ appAccount: e.target.value })
  }

  handleGetApp = async () => {
    return deveryRegistryClient.getApp(this.state.appAccount)
  }

  handleGetBrandAccounts = () => {
    return deveryRegistryClient.brandAccountsPaginated()
  }

  handleGetProductAccounts = () => {
    return deveryRegistryClient.productAccountsPaginated()
  }

  render () {
    const {
      account
    } = this.state

    return (
      <div className="Explorer">
        <div>
          <h1>Devery Explorer</h1>
          <p>User Account: {account}</p>
        </div>

        <h2>APP INFO</h2>
        <fieldset>
          <h3>Get App Accounts:</h3>

          <LoadData
            buttonMessage='Get App Accounts'
            loadDataFunc={this.handleGetAppAccounts}
          />
        </fieldset>

        <fieldset>
          <h3>Get App:</h3>
          <p>App Info: active, appAccount, appName, fee, feeAccount</p>
          <input type="text" placeholder="App Address" onChange={this.handleAppAccountChange} />

          {
            !this.state.appAccount
            ? (<span>Please insert App address first</span>)
            : (<LoadData
                buttonMessage='Get App'
                loadDataFunc={this.handleGetApp}
              />)
          }
        </fieldset>

        <h2>BRAND INFO</h2>

        <fieldset>
          <h3>Get Brand Accounts:</h3>
          <p>This gets ALL brand accounts. i.e. Not just for your app.</p>

          <LoadData
            buttonMessage='Get Brand Accounts'
            loadDataFunc={this.handleGetBrandAccounts}
          />
        </fieldset>

        <fieldset>
          <h3>Get Brand Info:</h3>
          <p>Brand Info: brandAccount, appAccount, brandName, active</p>
          <input type="text" placeholder="Enter Brand Address" onChange={this.handleBrandAddrChange} />

          {
            !this.state.checkBrandAddr
            ? (<span>Please insert Brand address first</span>)
            : (<LoadData
                buttonMessage='Get Brand Info'
                loadDataFunc={this.getBrand}
              />)
          }
        </fieldset>

        <h2>PRODUCT INFO</h2>

        <fieldset>
          <h3>Get Product Accounts:</h3>
          <p>This gets ALL product accounts. i.e. Not just for your app/brand.</p>

          <LoadData
            buttonMessage='Get Product Accounts'
            loadDataFunc={this.handleGetProductAccounts}
          />
        </fieldset>

        <fieldset>
          <h3>Get Product Info:</h3>
          <p>Product Info: productAccount, brandAccount, description, details, year, origin,
            active</p>
          <input type="text" placeholder="Enter A Product Address" onChange={this.handleProductAddrChange} />

          {
            !this.state.checkProductAddr
            ? (<span>Please insert Product address first</span>)
            : (<LoadData
                buttonMessage='Get Product Info'
                loadDataFunc={this.getProduct}
              />)
          }
        </fieldset>
      </div>
    )
  }
}

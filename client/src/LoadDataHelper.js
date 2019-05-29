import React, { Component, Fragment } from 'react'

export default class extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      isLoading: false,
      data: null
    }
  }

  render () {
    const {
      emptyMessage = 'Not loaded',
      loadingMessage = 'Loading',
      buttonMessage = 'Load',
    } = this.props

    const { data = null, isLoading } = this.state

    let children = data

    if (!data && !isLoading) children = emptyMessage
    if (!data && isLoading) children = loadingMessage

    return (
      <Fragment>
        <pre>{children}</pre>
        <br />
        <button type="button" onClick={this.handleLoadData}>{buttonMessage}</button>
      </Fragment>
    )
  }

  handleLoadData = async () => {
    let data;
    this.setState({ isLoading: true })
    try {
      data = await this.props.loadDataFunc()
    } catch (e) {
      console.log(e)
      data = 'Something went wrong'
    }
    this.setState({ isLoading: false, data })
  }
}

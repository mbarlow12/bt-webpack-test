import React from 'react';


export default class DynamicComponent extends React.PureComponent {

  constructor( { moduleProvider } ) {
    super();
    this.state = {
      Component: null
    };
    this.moduleProvider = moduleProvider;
  }

  componentDidMount() {
    this.moduleProvider().then( ({ default: Component }) => {
      this.setState( { Component } );
    });
  }

  render() {
    const { Component } = this.state;

    return (
      <div>
        { Component ? <Component /> : <p>Loading...</p> }
      </div>
    )
  }
}
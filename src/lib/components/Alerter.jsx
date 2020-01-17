import React from 'react';

export function Alerter(message) {
  return <button onClick={alert(message)}>Click me!</button>;
}
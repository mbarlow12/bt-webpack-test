import React from 'react';
import _ from 'lodash';

export function Concatter() {
  const words = ['I', 'am', 'the', 'concatter', '!'];
  const string = _.join(words, ' ');
  return <h3>{ string }</h3>;
};

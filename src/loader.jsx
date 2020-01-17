import React from 'react';
import ReactDOM from 'react-dom';

import { DynamicComponent } from './lib/components';

const withEntryBundle = base => `${base}/entry`;

const moduleProvider = importString => {
  const finalString = withEntryBundle(importString.replace(/\:\:/g, '\/'));
  return () => import(/* webpackMode: 'eager' */ `./${finalString}`);
};

window.addEventListener('load', e => {

  // find all elements with data-directory attr
  const components = document.querySelectorAll('.react-component');

  components.forEach(component => {
    // import string will be something like module::vch_admin
    // convert to directory for importing
    let { importString } = component.dataset;
    ReactDOM.render(
      React.createElement(
        DynamicComponent,
        { moduleProvider: moduleProvider(importString) } ),
      component
    );
  });
});
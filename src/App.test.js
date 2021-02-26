import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';

test('Snapshot for App component', () => {

  const renderedComponent = renderer.create(<App/>).toJSON();
  expect(renderedComponent).toMatchSnapshot();
});

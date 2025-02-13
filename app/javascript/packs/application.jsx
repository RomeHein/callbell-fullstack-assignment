// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import Board from './components/Board';
import '../channels'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Board />, document.body.appendChild(document.createElement('div')));
});

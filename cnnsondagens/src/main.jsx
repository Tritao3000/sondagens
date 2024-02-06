import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import LineChartComponent from './components/LineChart.jsx';
import BarChartComponent from './components/BarChart.jsx';

//let sondagensBackend = sondagens;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/*
ReactDOM.createRoot(document.getElementById('grafico-linhas')).render(
  <React.StrictMode>
    <LineChartComponent data={sondagensBackend} />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('grafico-barras')).render(
  <React.StrictMode>
    <BarChartComponent data={sondagensBackend} />
  </React.StrictMode>
);
*/

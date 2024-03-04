import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import LineChartComponent from './components/LineChart.jsx';
import LineChartPosComponent from './components/LineChartPos.jsx';
import BarChartComponent from './components/BarChart.jsx';
import PartidosTodos from './components/PartidosTodos.jsx';
import MediaPos from './components/MediaPos.jsx';
import MediaTotal from './components/MediaTotal.jsx';

let sondagensBackend = sondagens;
let sondagensBackend2 = sondagens2;
/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

ReactDOM.createRoot(document.getElementById('grafico-barras')).render(
  <React.StrictMode>
    <BarChartComponent data={sondagensBackend} />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('ranking')).render(
  <React.StrictMode>
    <PartidosTodos data={sondagensBackend2} />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('grafico-linhas')).render(
  <React.StrictMode>
    <LineChartComponent data={sondagensBackend} />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('grafico-linhas-pos')).render(
  <React.StrictMode>
    <LineChartPosComponent data={sondagensBackend} />
  </React.StrictMode>
);
if (document.getElementById('media-total')) {
  ReactDOM.createRoot(document.getElementById('media-total')).render(
    <React.StrictMode>
      <MediaTotal data={sondagensBackend} />
    </React.StrictMode>
  );
}
if (document.getElementById('media-pos')) {
  ReactDOM.createRoot(document.getElementById('media-pos')).render(
    <React.StrictMode>
      <MediaPos data={sondagensBackend} />
    </React.StrictMode>
  );
}

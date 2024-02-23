import { useEffect, useState } from 'react';
import BarChartComponent from './components/BarChart';
import LineChartComponent from './components/LineChart';
import PartidosTodos from './components/PartidosTodos';

export const strokes = {
  Chega: '#001ba4',
  IL: '#329DC1',
  Livre: '#2D2C31',
  BE: '#7E1DAA',
  PS: '#CE19BC',
  AD: '#F26932',
  PAN: '#75A639',
  CDU: '#D02020',
};

function App() {
  const [sondagensHolder, setSondagensHolder] = useState(null);
  const [sondagensHolder2, setSondagensHolder2] = useState(null);

  useEffect(() => {
    async function fetchSondagens() {
      try {
        fetch('http://localhost:8080/sondagens')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setSondagensHolder(data);
          })
          .catch(() => {
            setSondagensHolder(null);
          });
      } catch (error) {
        setSondagensHolder(null);
      }
    }

    fetchSondagens();
  }, []);

  useEffect(() => {
    async function fetchSondagens2() {
      try {
        fetch('http://localhost:8080/sondagens2')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setSondagensHolder2(data);
          })
          .catch(() => {
            setSondagensHolder2(null);
          });
      } catch (error) {
        setSondagensHolder2(null);
      }
    }

    fetchSondagens2();
  }, []);

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <LineChartComponent data={sondagensHolder} />
      <div className="my-20" />
      <BarChartComponent data={sondagensHolder} />
      <div className="my-20" />
      <PartidosTodos data={sondagensHolder2} />
    </div>
  );
}

export default App;

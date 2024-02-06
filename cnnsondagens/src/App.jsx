import { useEffect, useState } from 'react';
import BarChartComponent from './components/BarChart';
import LineChartComponent from './components/LineChart';

export const strokes = {
  Chega: '#262626',
  IL: '#5FB7E3',
  Livre: '#02CD8B',
  BE: '#C90535',
  PS: '#F394B4',
  AD: '#FF7F00',
  PAN: '#008081',
  CDU: '#1467C0',
};

function App() {
  const [sondagensHolder, setSondagensHolder] = useState(null);

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

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <LineChartComponent data={sondagensHolder} />
      <div className="my-20" />
      <BarChartComponent data={sondagensHolder} />
    </div>
  );
}

export default App;

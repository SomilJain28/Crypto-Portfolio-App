import { Navbar, Welcome, Footer, Services, Transactions } from './components';
import HistoricalData from './components/HistoricalData';
import './App.css';

function App() {
  return (
    <>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>
        {/* <HistoricalData /> */}
        <Services />
        {/* <Carousel /> */}
        {/* <Transactions /> */}
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;

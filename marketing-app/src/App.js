import logo from './logo.svg';
import './App.css';
import CommissionList from './components/CommissionList';
import PaymentsList from './components/PaymentsList';

function App() {
  return (
    <div className="App">
      <h1>Marketing App</h1>
      <CommissionList />
      <PaymentsList />
    </div>
  );
}

export default App;

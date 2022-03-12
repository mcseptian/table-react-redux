import { Home } from './page/Home';
import Example from './page/Example';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} key={1} />
          <Route path="/example" element={<Example />} key={2} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;

import './app.css';
import { Layout } from "antd";
import "antd/dist/antd.css";
import Headers from './layout/header';
const { Header } = Layout;


function App() {
  return (
    <div className="App">
      <Layout>
        <Headers />
      </Layout>
    </div>
  );
}

export default App;

import './app.css';
import { Layout } from "antd";
import "antd/dist/antd.css";
import Headers from './layout/header';
import Footer from './layout/footer';
import Contents from './layout/content';

function App({ children }) {
  return (
    <div className="App">
      <Layout>
        <Headers />
        <Contents>{ children }</Contents>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;

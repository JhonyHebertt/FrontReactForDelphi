import './App.css';
import { BrowserRouter } from 'react-router-dom';

/*componentes */
import { AuthProvider } from './context/context'
import Header from './components/header';
import Menu from './components/menu'
import Routes from './routers';

export default function App() {

  return (
    <div className="app">
      <AuthProvider>
        <Header />
        <BrowserRouter>
          <div className="container-fluid">
            <div className="row">
              <Menu />
              <main role="main" className="col-md-12 col-lg-10">
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <Routes />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div >
  );
}

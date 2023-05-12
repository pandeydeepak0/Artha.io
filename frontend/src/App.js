import React from "react";
import AddBrand from './components/AddBrand';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import BrandPage from './components/BrandPage';
import BrandDetails from './components/BrandDetails';
import AppPage from "./components/AppPage";

const App = () => {
  // Add components in the component folder

  return (
    <main>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/brands" component={BrandPage} exact/>
          <Route path="/mint-brand" component={AddBrand} />
          <Route exact path='/brands/:tokenID'>
            <BrandDetails/>
          </Route>
          
        </Switch>
      </Router>
      
    </main>
  );
};

export default App;

import React from 'react'

//* React router dom
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//* UI Components import
import Header from './components/UI/Header'
import Sidebar from './components/UI/Sidebar'
import BottomNav from './components/UI/BottomNav'

//* Screens import
import HomeScreen from './screens/HomeScreen'
import ExploreScreen from './screens/ExploreScreen'
import FourZeroFourScreen from './screens/FourZeroFour'
import UploadScreen from './screens/UploadScreen'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Sidebar/>
          <div className="feed">
            <Switch>
              <Route path="/" exact component={HomeScreen} />
              <Route path="/explore" exact component={ExploreScreen} />
              <Route path="/upload" exact component={UploadScreen} />
              <Route component={FourZeroFourScreen} />
            </Switch>
          </div>
        </div>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
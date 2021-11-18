import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './views/MainPage/MainPage';
import FolioWritingPage from './views/FolioWritingPage/FolioWritingPage';
import MyPage from './views/UserPage/MyPage';
import UserPage from './views/UserPage/UserPage';
import FollowerWritingPage from './views/UserPage/UserPageWriting';
import './App.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';
function App() {
  const store = createStore(rootReducer);

  return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/folio/writing' exact component={FolioWritingPage} />
            <Route path='/folio/me' exact component={MyPage} />
            <Route path='/folio/user' exact component={UserPage} />
            <Route path='/folio/user/writing' exact component={FollowerWritingPage} />
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;

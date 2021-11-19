import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './views/MainPage/MainPage';
import FolioWritingPage from './views/FolioWritingPage/FolioWritingPage';
import MyPage from './views/UserPage/MyPage';
import UserPage from './views/UserPage/UserPage';
import FollowerWritingPage from './views/UserPage/UserPageWriting';
import SearchPage from './views/SearchPage/SearchPage';
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
            <Route path='/folio/user/:userEmail' exact component={UserPage} />
            <Route path='/folio/user/writing/:userEmail' exact component={FollowerWritingPage} />
            <Route path='/folio/search/:userName' exact component={SearchPage} />
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;

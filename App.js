import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';

const App = () => {
  return (
    <div className="ui container">
      {/* <HastRouter /> uses everything after a # as 'path' ;
        # auto added after home page */}
      {/* <MemoryRouter />  doesn't change URL*/}
      {/* <BrowserRouter /> uses everything after TLD (top-level-domain ;
        .com, .net) as 'path' */}
      <BrowserRouter>
        <div>
          <Header />
          {/* if path="/pagetwo", then both path="/" then path="/pagetwo"
          shows b/c path="/" is contained within path="/pagetwo" ;
          if 'exact' keyword within route, only paths exactly matching show*/}
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

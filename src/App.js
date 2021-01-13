import React from 'react';
import Bootstrap from 'Bootstrap';
import { renderRoutes } from 'common/router';

function App() {
  return <Bootstrap>{renderRoutes()}</Bootstrap>;
}

export default App;

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { chainPaths } from '~/constants/chain';
import Home from '~/pages/Home';

export default function Routes() {
  const chainPathOr = chainPaths.join('|');

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/cosmos" />} />
        <Route exact path={`/:chain(${chainPathOr})`} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

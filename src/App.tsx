import React from 'react';
import './styles/App.css';

import Circle from './components/Circle';

export interface Props {

}

export interface State {

}

class App extends React.Component<Props, State> {

  render() {
    return(
      <React.Fragment>

        <Circle />
        <section className="problem">
          <h1>
            Problem description
          </h1>
          <article className="description">
          It should be possible to drag the circles, and the line should be drawn between the circles. The input fields shows the position of the circles and the length of the line, all the inputs should be possible to edit, and the related ui should update.
          </article>
        </section>

      </React.Fragment>

    );
  }
}

export default App;

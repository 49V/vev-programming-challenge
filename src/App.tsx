import React from 'react';
import './styles/App.css';

export interface Props {

}

export interface State {

}

class App extends React.Component<Props, State> {

  render() {
    return(
    <section className="problem">
      Problem description
      <article className="description">
      It should be possible to drag the circles, and the line should be drawn between the circles. The input fields shows the position of the circles and the length of the line, all the inputs should be possible to edit, and the related ui should update.
      </article>
    </section>
    );
  }
}

export default App;

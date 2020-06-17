import { connect } from 'react-redux';
import React from "react"

import Nav from './components/Nav';

class Page extends React.Component {

  constructor(props) {
    super(props);
    document.title = this.formatTitle()
  }

  componentDidUpdate() {
    document.title = this.formatTitle()
  }

  formatTitle(){
    const nameApp = this.props.name;
    return document.title = this.props.title + " - " + nameApp;
  }

  render() {
    const PageComponent = this.props.component

    return (
      <div>
        <Nav />
        <main className="container">
          <div className="page-header" id="banner">
            <section>
              <h1>{this.props.title}</h1>
            </section>
          </div>
          <hr />
          <PageComponent props={this.props} />
        </main>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  name: state.app.name
})

export default connect(mapStateToProps)(Page)

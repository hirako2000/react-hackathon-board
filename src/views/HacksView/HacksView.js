/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as hacksActions }  from '../../redux/modules/hacks'
import classes from './HacksView.scss'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type
Props = {
  hacks: Array,
  listFromServer: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HacksView extends React.Component<void, Props, void> {
  static propTypes = {
    hacks: PropTypes.array.isRequired,
    listFromServer: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container text-center'>
        <h1>Hacks</h1>
        <button className='btn btn-default' onClick={this.props.listFromServer}>
          List
        </button>
        <span className={classes['counter--green']}>{this.props.hacks[0] ? this.props.hacks[0].title : 'click'}</span>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  hacks: state.hacks
});
export default connect(mapStateToProps, hacksActions)
(HacksView)

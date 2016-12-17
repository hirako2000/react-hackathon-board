import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import { actions } from '../../redux/modules/locale';

import { Menu, Item, Icon, Dropdown} from 'react-semantify';
import moment from 'moment';

type
Props = {
  locale: Object,
  update: Function
};

class LocalePickerView extends React.Component {

  static propTypes = {
    locale: PropTypes.object,
    update: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleSwitch(lang) {
    this.props.update(lang);
  }

  render() {
    return (
      <Dropdown init={true} className="">
        <input type="hidden" name="country" />
        <Item>
          <i className={this.props.locale.lang ? this.props.locale.lang +  " flag" : "gb flag"} />
        </Item>
        <Menu className="ui borderless">
          <Item className="" onClick={() => this.handleSwitch('gb')} >
              <i className="gb flag"></i>English
          </Item>
          <Item className="" onClick={() => this.handleSwitch('fr')}>
                <i className="fr flag"></i>French
          </Item>
          <Item className="disabled" onClick={() => this.handleSwitch('de')}>
              <i className="de flag"></i>German
          </Item>
        </Menu>
      </Dropdown>

    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
});
export default connect(mapStateToProps, actions)(LocalePickerView);

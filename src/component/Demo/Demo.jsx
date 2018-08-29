import React, {PropTypes, Component} from 'react';
import ReactJsonLogic from 'react-json-logic';
import jsonLogic from 'json-logic-js-enhanced';

import 'react-json-logic/dist/style.css';
import './Demo.css';
import Editor from "../Editor/Editor";

// PropTypes
const {string, object, oneOfType} = PropTypes;
const propTypes = {
  title: string.isRequired,
  value: oneOfType([object, string]),
  data: object,
};

const defaultProps = {
  value: {},
  data: {},
};

const varFunction = function (a, b) {
  const {data} = this.state;
  const not_found = (b === undefined) ? null : b;
  const sub_props = String(a).split(".");
  let result = Object.assign({}, data);
  for (let i = 0; i < sub_props.length; i++) {
    // Descending into data
    result = result[sub_props[i]];
    if (result === undefined) {
      return b ? b : not_found;
    }
  }
  return result;
};

class Demo extends Component {
  constructor(props) {
    super(props);
    jsonLogic.add_operation("var", varFunction.bind(this));
    this.state = {
      value: props.value,
      data: props.data,
      result: 'Not Evaluated',
    };
  }

  onFieldValueChange = value => this.setState({value});

  onAccessorDataChange = data => this.setState({data});

  onEvaluate = () => this.setState({
    result: jsonLogic.apply(this.state.value, this.state.data),
  });

  render() {
    const {title} = this.props;
    const {value, data, result} = this.state;
    return (
      <div className={'Wrapper'}>
        <h3>
          {title}
        </h3>
        <ReactJsonLogic
          data={JSON.stringify(data)}
          value={value}
          onChange={this.onFieldValueChange}
        />
        <hr/>
        <h4>Built Logic</h4>
        <Editor
          value={value}
          onChange={(e) => {
            try {
              return this.onFieldValueChange(JSON.parse(e));
            } catch (err) {
              return '';
            }
          }}
        />
        <hr/>
        <h4>Data for Accessor Fields <small>(Must be JSON)</small></h4>
        <Editor
          value={data}
          onChange={this.onAccessorDataChange}
        />
        <button disabled={Object.keys(value).length === 0} onClick={this.onEvaluate}>
          Evaluate
        </button>
        <hr/>
        <b>Result:</b> {JSON.stringify(result)}
      </div>
    );
  }
}

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;

export default Demo

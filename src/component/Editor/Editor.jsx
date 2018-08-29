import React, { PropTypes } from 'react';
import 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/github';

const { string, func } = PropTypes;
const propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
};

const Editor = ({ value = {}, onChange = () => {} }) => (
  <div>
    <AceEditor
      className={'Test'}
      mode={"json"}
      theme="github"
      onChange={onChange}
      value={JSON.stringify(value)}
      name={Math.floor(Math.random() * 1000).toString()}
      editorProps={{ $blockScrolling: 'Infinity' }}
      tabSize={2}
      width="100%"
      height="200px"
    />
  </div>
);

Editor.propTypes = propTypes;

export default Editor;

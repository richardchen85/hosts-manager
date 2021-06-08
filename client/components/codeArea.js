import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/ttcn-cfg/ttcn-cfg';

class CodeArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: props.value,
    };
  }
  render() {
    const { className } = this.props;
    return (
      <textarea
        className={className + ' cont'}
        ref={($host) => {
          this.$host = $host;
        }}
      />
    );
  }

  componentDidMount() {
    const { initialValue } = this.state;
    const { readonly, onChange } = this.props;
    this.cm = CodeMirror.fromTextArea(this.$host, {
      lineWrapping: true,
      readOnly: readonly,
      viewportMargin: Infinity,
      mode: 'ttcn-cfg',
    });
    initialValue && this.cm.setValue(initialValue);
    this.cm.on('change', () => {
      onChange(this.cm.getValue());
    });
  }

  componentDidUpdate(prevProps) {
    const {
      cm,
      props: { readonly },
    } = this;
    if (prevProps.readonly !== readonly) {
      cm.setOption('readOnly', readonly);
    }
  }
}

export default CodeArea;

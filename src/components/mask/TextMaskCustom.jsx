import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#0/a0/bc00"
      definitions={{
        '#': /[0-3]/,
        'a': /[0|1]/,
        'b': /[1|2]/,
        'c': /[9|0]/,

      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
 export default TextMaskCustom
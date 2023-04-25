import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../../theme.js';

const TextInput = ({ style, error, ...props }) => {
  let textInputStyle = [style];

  if (error) {
    textInputStyle =  StyleSheet.create({ ...textInputStyle[0], borderColor: theme.colors.warning});
  }

  return <NativeTextInput style={textInputStyle}  {...props} />;
};

export default TextInput;
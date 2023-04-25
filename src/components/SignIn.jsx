import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik} from 'formik'
import theme from '../../theme.js';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 8,
    backgroundColor: theme.colors.appBar
  },
  input: {
    height: 55,
    margin: 9,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    paddingLeft: 17,
    borderRadius: 4,
    fontSize: theme.fontSizes.subheading
  },
  button: {
    height: 55,
    margin: 9,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:  {
    color: theme.colors.appBar,
    fontSize: theme.fontSizes.subheading
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string().required("Username is required"),
  password: yup
    .string().required("Password is required")
});

const onSubmit = (values) => {
  console.log(values);
};

const Form =({onSubmit}) => {

  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.input} />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true}  style={styles.input}/>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>

  )

}

const SignIn = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
       {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
    </Formik>
);};

export default SignIn;
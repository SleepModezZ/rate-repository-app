import { ScrollView, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../../theme.js';
import * as yup from 'yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const initialValues = {
  username: '',
  password: '',
  confirmation: '',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 8,
    backgroundColor: theme.colors.appBar,
  },
  input: {
    height: 55,
    margin: 9,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    paddingLeft: 17,
    borderRadius: 4,
    fontSize: theme.fontSizes.subheading,
  },
  button: {
    height: 55,
    margin: 9,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.appBar,
    fontSize: theme.fontSizes.subheading,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be at most 50 characters long'),
  confirmation: yup
    .string()
    .oneOf([Yup.ref('password'), null], "Confirmation don't match pasword")
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [new_user] = useMutation(CREATE_USER);

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password);
    try {
      const res = await new_user({
        variables: {
          user: { username, password },
        },
      });
      if (res) {
        console.log(res.data);
        navigate('/');
      }
    } catch (e) {
      console.log('Virhettä pukkaa: ', e);
    }
  };
  const Form = ({ onSubmit }) => {
    return (
      <ScrollView style={styles.container}>
        <FormikTextInput name="username" placeholder="Username" style={styles.input} />
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
        />
        <FormikTextInput
          name="confirmation"
          placeholder="Password confirmation"
          secureTextEntry={true}
          style={styles.input}
        />
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text style={styles.text}>Sign up</Text>
        </Pressable>
      </ScrollView>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;

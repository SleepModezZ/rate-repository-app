import { ScrollView, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../../theme.js';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const initialValues = {
  ownerName: '',
  ratingtext: '',
  repositoryName: '',
  text: '',
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
  multilineInput: {
    height: 110,
    margin: 9,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    paddingLeft: 17,
    borderRadius: 4,
    fontSize: theme.fontSizes.subheading,
    textAlignVertical: 'top',
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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  ratingtext: yup.number().integer().required('Rating is required'),
  text: yup.string().optional(),
});

const Review = () => {
  const navigate = useNavigate();
  const [new_review] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const { ownerName, ratingtext, repositoryName, text } = values;
    const rating = parseInt(ratingtext);
    try {
      const res = await new_review({
        variables: {
          review: { ownerName, rating, repositoryName, text },
        },
      });
      if (res) {
        console.log(res.data.createReview.repositoryId);
        const address = '/singleView/' + res.data.createReview.repositoryId;
        navigate(address);
      }
    } catch (e) {
      console.log('Virhettä pukkaa: ', e);
    }
  };
  const Form = ({ onSubmit }) => {
    return (
      <ScrollView style={styles.container}>
        <FormikTextInput
          name="ownerName"
          placeholder="Repository owner name"
          style={styles.input}
        />
        <FormikTextInput
          name="repositoryName"
          placeholder="Repository name"
          style={styles.input}
        />
        <FormikTextInput
          name="ratingtext"
          placeholder="Rating between 0 and 100"
          style={styles.input}
        />
        <FormikTextInput
          name="text"
          placeholder="Review"
          multiline={true}
          maxLength={2000}
          style={styles.multilineInput}
        />
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text style={styles.text}>Create a review</Text>
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

export default Review;

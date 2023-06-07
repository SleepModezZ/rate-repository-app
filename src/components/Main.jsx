import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Review from './Review';
import SingleView from './RepositoryList/SingleView';
import theme from '../../theme.js';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.appBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/singleView/:id" element={<SingleView />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/review" element={<Review />} exact />
        <Route path="/my_reviews" element={<MyReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;

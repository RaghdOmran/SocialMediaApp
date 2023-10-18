import React from 'react';
import { connect } from 'react-redux';
import { setUser, removeUser } from '../actions/userActions';

const YourComponent = ({ user, isAuthenticated, setUser, removeUser }) => {
  // You can now use `user` and `isAuthenticated` as regular props

  const handleLogin = () => {
    // Your login logic here, for the demo we're using a static user object
    const user = {
      name: 'John Doe',
      id: '123'
    };
    setUser(user);
  };

  const handleLogout = () => {
    // Your logout logic here
    removeUser();
  };

  // The JSX below will display based on user's authentication status
  return (
    <div>
      { isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

// Mapping Redux state to component props
const mapStateToProps = state => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
});

// Connecting Redux actions to component props and exporting
export default connect(mapStateToProps, { setUser, removeUser })(YourComponent);

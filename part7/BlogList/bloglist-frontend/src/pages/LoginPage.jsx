import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  user,
}) => {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    const success = await handleLogin(event);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={onSubmit}
      />
    </div>
  );
};

export default LoginPage;

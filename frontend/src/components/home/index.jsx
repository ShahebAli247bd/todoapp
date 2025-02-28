import { useAuthStore } from "../../../store/authStore";
import AuthPage from "../auth/auth";
import Dashboard from "../dashboard/dashboard";

import HomePage from "./Home";

const IndexPage = () => {
  const { user } = useAuthStore();

  return <>{user ? <Dashboard /> : <AuthPage />}</>;
};

export default IndexPage;

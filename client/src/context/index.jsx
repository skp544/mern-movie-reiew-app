import AuthProvider from "./AuthProvider";
import SearchProvider from "./SearchProvider";
import ThemeProvider from "./ThemeProvider";

const ContextProviders = ({ children }) => {
  return (
    <AuthProvider>
      <SearchProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default ContextProviders;

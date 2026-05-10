export const useTheme = () => {
  const theme = useState('theme', () => 'dark');
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };
  return { theme, toggleTheme };
};

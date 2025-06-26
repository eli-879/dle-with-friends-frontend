// theme.ts
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9', // Light blue
		},
		secondary: {
			main: '#f48fb1', // Pink
		},
		background: {
			default: '#121212',
			paper: '#1e1e1e',
		},
		text: {
			primary: '#ffffff',
			secondary: '#b0bec5',
		},
	},
	typography: {
		fontFamily: 'Roboto, Arial, sans-serif',
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
	},
});

export default darkTheme;

import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';

export default function Input(props: TextFieldProps) {
  const { sx, ...etc } = props;
  return (
    <TextField
      variant="outlined"
      size="small"
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          height: '4rem',
          fontSize: '1.4rem',
        },
        '& .MuiInputLabel-root': {
          fontSize: '1.4rem',

          '&.Mui-focused': {
            color: 'black',
          },
        },
        '& .MuiOutlinedInput-root:hover': {
          '& > fieldset': {
            borderColor: 'black',
          },
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'black',
        },
        ...sx,
      }}
      {...etc}
    />
  );
}

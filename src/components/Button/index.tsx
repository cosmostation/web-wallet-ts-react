import type { ButtonBaseProps } from '@mui/material';
import { Button as BaseButton } from '@mui/material';

type ButtonProps = ButtonBaseProps & { colorVariant?: 'black' | 'white' };

export default function Button(props: ButtonProps) {
  const { sx, children, onClick, colorVariant } = props;

  const color =
    colorVariant === 'black'
      ? {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          borderColor: '#ababab',
          '&:hover': {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderColor: '#ababab',
          },
        }
      : {
          backgroundColor: '#FFFFFF',
          color: '#000000',
          borderColor: '#ababab',
          '&:hover': {
            backgroundColor: '#000000',
            color: '#FFFFFF',
            borderColor: '#ababab',
          },
        };

  return (
    <BaseButton
      type="button"
      variant="outlined"
      size="large"
      sx={{
        fontSize: '1.2rem',
        textTransform: 'none',
        ...color,
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}

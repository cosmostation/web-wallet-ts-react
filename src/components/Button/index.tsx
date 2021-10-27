import { Button as BaseButton } from '@mui/material';

type ButtonProps = {
  children: string;
  onClick?: () => void;
  fontSize?: string;
  fontWeight?: string;
};

export default function Button({ children, onClick, fontSize = '1.2rem', fontWeight }: ButtonProps) {
  return (
    <BaseButton
      type="button"
      variant="outlined"
      size="large"
      sx={{
        fontSize,
        fontWeight,
        textTransform: 'none',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        borderColor: '#ababab',
        '&:hover': {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          borderColor: '#ababab',
        },
      }}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}

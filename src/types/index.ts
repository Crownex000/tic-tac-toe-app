import { SxProps, Theme } from '@mui/material/styles';

export interface KeyTypes {
  [key: keyof any]: any;
}

export interface StyleProps {
  [key: keyof any]: SxProps<Theme>;
};

export interface PlayerProps {
  name: string;
  sign: 'X' | 'O';
}
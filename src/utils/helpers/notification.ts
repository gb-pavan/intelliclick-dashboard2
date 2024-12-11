import { showNotification } from '@mantine/notifications';

interface IProps {
  title?: string;
  message: string;
}

export const errorToast = (data: IProps) => {
  showNotification({
    color: 'red',
    title: 'Error',
    ...data,
  });
};
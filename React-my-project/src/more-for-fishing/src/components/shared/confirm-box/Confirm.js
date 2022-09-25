import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './Confirm.css'

export const submitHandler = (handler, title, msg) => {
  confirmAlert({
    title: title,
    message: msg,
    buttons: [
      {
        label: 'Yes',
        onClick: () => handler(),
      },
      {
        label: 'No',
        onClick: (e) => (e),
      },
    ],
  });
};

import { Form, Modal } from 'antd';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { PhoneInput } from '../auth/PhoneInput';
type TConfirmFormProps = {
  phone: string;
  prefix: string;
};

export const ConfirmOrder = (props: {
  isOpen: boolean;
  orderTaxi: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [user] = useAuthState(auth);
  const [phoneNumber, setPhoneNumber] = useState<TConfirmFormProps>({
    phone: '',
    prefix: '',
  });
  const [canConfirm, setCanConfirm] = useState(false);
  const { isOpen, orderTaxi, setIsOpen } = props;
  const [formElem] = Form.useForm();

  const handleOk = (): void => {
    setIsOpen(false);
    orderTaxi();
  };

  const handleCancel = (): void => {
    setIsOpen(false);
  };

  const db = getDatabase();
  const reference = ref(db, `users/clients/${user?.uid}/phone`);

  useEffect(() => {
    onValue(reference, (snapshot) => {
      const val = snapshot.val();
      if (!val) return;
      const phone = (val as string).slice(2);
      const prefix = (val as string).slice(0, 2);
      setPhoneNumber({
        prefix,
        phone,
      });
      setCanConfirm(true);
    });
  }, []);

  const checkCanConfirm = (_: Partial<TConfirmFormProps>, values: TConfirmFormProps): void => {
    const { prefix, phone } = values;
    setCanConfirm(Boolean(prefix && phone));
  };

  return (
    <Modal
      title="Confirm order"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: !canConfirm }}
    >
      <Form initialValues={phoneNumber} form={formElem} onValuesChange={checkCanConfirm}>
        <PhoneInput />
      </Form>
    </Modal>
  );
};

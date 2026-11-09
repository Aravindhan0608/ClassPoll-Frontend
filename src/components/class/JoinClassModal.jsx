import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Modal from '../modals/Modal.jsx';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import { joinClassSchema } from '../../utils/validators.js';
import { getErrorMessage } from '../../utils/helpers.js';
import * as classService from '../../services/class.service.js';

const JoinClassModal = ({ isOpen, onClose, onJoined }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(joinClassSchema) });

  const close = () => {
    reset();
    onClose();
  };

  const onSubmit = async ({ classCode }) => {
    try {
      const joined = await classService.joinClass(classCode);
      toast.success(`Joined ${joined.className}`);
      onJoined?.(joined);
      close();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Join a class">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Join code"
          placeholder="7F3K9A"
          className="text-center font-mono text-lg uppercase tracking-[0.3em]"
          maxLength={6}
          error={errors.classCode?.message}
          {...register('classCode')}
        />
        <p className="text-xs text-ink-faint">Ask your teacher for the 6-character code shown on their class page.</p>
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Join class
        </Button>
      </form>
    </Modal>
  );
};

export default JoinClassModal;

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Modal from '../modals/Modal.jsx';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import { createClassSchema } from '../../utils/validators.js';
import { getErrorMessage } from '../../utils/helpers.js';
import * as classService from '../../services/class.service.js';

const CreateClassModal = ({ isOpen, onClose, onCreated }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(createClassSchema) });

  const close = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      const created = await classService.createClass(data);
      toast.success(`"${created.className}" created — code ${created.classCode}`);
      onCreated?.(created);
      close();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Create a class">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input label="Class name" placeholder="AP Biology — Period 3" error={errors.className?.message} {...register('className')} />
        <div>
          <label className="label" htmlFor="description">
            Description (optional)
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="What's this class about?"
            className="input resize-none"
            {...register('description')}
          />
          {errors.description?.message && <p className="mt-1.5 text-sm text-danger-400">{errors.description.message}</p>}
        </div>
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Create class
        </Button>
      </form>
    </Modal>
  );
};

export default CreateClassModal;

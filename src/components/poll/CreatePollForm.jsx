import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import { createPollSchema } from '../../utils/validators.js';
import { getErrorMessage } from '../../utils/helpers.js';
import * as pollService from '../../services/poll.service.js';

const CreatePollForm = ({ classId, onCreated, onCancel }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createPollSchema),
    defaultValues: { question: '', options: ['', ''], allowResult: true },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'options' });

  const onSubmit = async (data) => {
    try {
      const poll = await pollService.createPoll({ classId, ...data });
      toast.success('Poll created as a draft');
      onCreated?.(poll);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Input label="Question" placeholder="Which process releases energy from glucose?" error={errors.question?.message} {...register('question')} />

      <div>
        <label className="label">Options</label>
        <div className="space-y-2.5">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                placeholder={`Option ${index + 1}`}
                error={errors.options?.[index]?.message}
                {...register(`options.${index}`)}
              />
              {fields.length > 2 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="shrink-0 rounded-lg p-2.5 text-ink-faint hover:bg-white/5 hover:text-danger-400"
                  aria-label="Remove option"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.options?.message && <p className="mt-1.5 text-sm text-danger-400">{errors.options.message}</p>}
        {fields.length < 6 && (
          <button
            type="button"
            onClick={() => append('')}
            className="mt-2.5 flex items-center gap-1.5 text-sm font-medium text-brand-400 hover:text-brand-300"
          >
            <Plus className="h-3.5 w-3.5" /> Add option
          </button>
        )}
      </div>

      <Controller
        control={control}
        name="allowResult"
        render={({ field }) => (
          <label className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3">
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="h-4 w-4 rounded border-base-border bg-base-surface accent-brand-500"
            />
            <span className="text-sm text-ink-muted">Let students see live results while this poll is active</span>
          </label>
        )}
      />

      <div className="flex gap-3">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting} className="flex-1">
          Create poll
        </Button>
      </div>
    </form>
  );
};

export default CreatePollForm;

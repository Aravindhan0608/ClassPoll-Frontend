import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../common/Button.jsx';
import { askQuestionSchema } from '../../utils/validators.js';
import { getErrorMessage } from '../../utils/helpers.js';
import * as questionService from '../../services/question.service.js';

const AskQuestionForm = ({ classId, onAsked }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(askQuestionSchema) });

  const onSubmit = async ({ question }) => {
    try {
      const created = await questionService.askQuestion(classId, question);
      toast.success('Question sent to your teacher');
      onAsked?.(created);
      reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-5" noValidate>
      <label className="label" htmlFor="question">
        Ask a question
      </label>
      <div className="flex gap-2">
        <textarea
          id="question"
          rows={2}
          placeholder="What's still unclear?"
          className="input resize-none"
          {...register('question')}
        />
        <Button type="submit" isLoading={isSubmitting} className="shrink-0 self-end">
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {errors.question?.message && <p className="mt-1.5 text-sm text-danger-400">{errors.question.message}</p>}
    </form>
  );
};

export default AskQuestionForm;

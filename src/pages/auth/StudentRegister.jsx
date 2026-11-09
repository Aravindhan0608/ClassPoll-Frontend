import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/layout/AuthLayout.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { registerSchema } from '../../utils/validators.js';
import { getErrorMessage } from '../../utils/helpers.js';
import { ROUTES } from '../../utils/constants.js';

const StudentRegister = () => {
  const { registerStudent } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const user = await registerStudent(data);
      toast.success(`Welcome to ClassPoll+, ${user.name.split(' ')[0]}`);
      navigate(ROUTES.STUDENT_DASHBOARD, { replace: true });
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  };

  return (
    <AuthLayout
      title="Create your student account"
      subtitle="Join classes, vote on live polls, ask questions."
      footer={
        <>
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-medium text-brand-400 hover:text-brand-300">
            Log in
          </Link>
          <br />
          <span className="mt-1 inline-block">
            Teaching a class?{' '}
            <Link to={ROUTES.LOGIN} className="font-medium text-brand-400 hover:text-brand-300">
              Log in as a teacher
            </Link>
          </span>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {serverError && (
          <div className="rounded-lg border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-400">
            {serverError}
          </div>
        )}
        <Input label="Full name" placeholder="Jordan Lee" error={errors.name?.message} {...register('name')} />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@school.edu"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default StudentRegister;

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/layout/AuthLayout.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { loginSchema } from '../../utils/validators.js';
import { getErrorMessage } from '../../utils/helpers.js';
import { ROUTES, ROLES } from '../../utils/constants.js';

const roleHome = {
  [ROLES.STUDENT]: ROUTES.STUDENT_DASHBOARD,
  [ROLES.TEACHER]: ROUTES.TEACHER_DASHBOARD,
  [ROLES.ADMIN]: ROUTES.ADMIN_DASHBOARD,
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const user = await login(data);
      const redirectTo = location.state?.from?.pathname || roleHome[user.role] || ROUTES.HOME;
      toast.success(`Welcome back, ${user.name.split(' ')[0]}`);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your ClassPoll+ account."
      footer={
        <>
          New here?{' '}
          <Link to={ROUTES.REGISTER_STUDENT} className="font-medium text-brand-400 hover:text-brand-300">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {serverError && (
          <div className="rounded-lg border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-400">
            {serverError}
          </div>
        )}
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
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Log in
        </Button>
      </form>
      <p className="mt-4 text-center text-xs text-ink-faint">
        Teachers and students use the same login. Administrators sign in here too.
      </p>
    </AuthLayout>
  );
};

export default Login;

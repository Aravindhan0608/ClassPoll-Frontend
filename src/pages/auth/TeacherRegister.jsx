import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout.jsx';
import Button from '../../components/common/Button.jsx';
import { ROUTES } from '../../utils/constants.js';

const TeacherRegister = () => {
  return (
    <AuthLayout
      title="Teacher Access"
      subtitle="Administrator authorization is required for instructor accounts."
      footer={
        <>
          Already have teacher credentials?{' '}
          <Link to={ROUTES.LOGIN} className="font-medium text-brand-400 hover:text-brand-300">
            Log in
          </Link>
          <br />
          <span className="mt-1 inline-block">
            Joining a class as a student?{' '}
            <Link to={ROUTES.REGISTER_STUDENT} className="font-medium text-brand-400 hover:text-brand-300">
              Register as a student
            </Link>
          </span>
        </>
      }
    >
      <div className="space-y-5 text-center">
        <div className="rounded-xl border border-brand-500/20 bg-brand-500/10 p-5 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/20 text-brand-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">Admin Approval Required</h3>
              <p className="text-xs text-ink-muted">Role-based access control policy</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            In accordance with classroom security policies, teacher accounts cannot be self-registered.
            To teach classes, run live polls, and access analytics, an administrator must assign instructor
            credentials to your account.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link to={ROUTES.LOGIN} className="block w-full">
            <Button className="w-full">
              Log in with assigned account
            </Button>
          </Link>
          <Link to={ROUTES.REGISTER_STUDENT} className="block w-full">
            <Button variant="secondary" className="w-full">
              Register as student instead
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default TeacherRegister;

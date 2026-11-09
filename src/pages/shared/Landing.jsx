import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  MessageCircleQuestion,
  BarChart3,
  Users,
  ShieldCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import PublicNavbar from '../../components/layout/PublicNavbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Button from '../../components/common/Button.jsx';
import LivePollMock from '../../components/poll/LivePollMock.jsx';
import { ROUTES } from '../../utils/constants.js';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant live polls',
    description: 'Launch a question, watch votes redistribute in real time, close it when the room has spoken.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'A doubt never gets lost',
    description: 'Students ask questions inline. Teachers answer once, everyone stays in sync.',
  },
  {
    icon: BarChart3,
    title: 'Results that mean something',
    description: 'Every poll becomes a record — track engagement, comprehension, and participation over time.',
  },
  {
    icon: Users,
    title: 'One code, one class',
    description: 'Share a six-character join code. No rosters to import, no accounts to pre-provision.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-aware by design',
    description: 'Students vote and ask. Teachers run the room. Admins see the whole platform. Nothing overlaps.',
  },
  {
    icon: Layers,
    title: 'Built to hold history',
    description: 'Nothing is thrown away — every poll, question, and reply stays queryable long after class ends.',
  },
];

const ROLE_CARDS = [
  {
    role: 'Student',
    tagline: 'Show up, vote, ask.',
    points: ['Join any class in seconds with a code', 'Vote on live polls from your phone', 'Ask questions the teacher actually sees'],
  },
  {
    role: 'Teacher',
    tagline: 'Run the room in real time.',
    points: ['Spin up a poll between slides', 'Watch results build live, no refresh', 'Clear the doubt queue as you go'],
  },
  {
    role: 'Admin',
    tagline: 'See the whole platform.',
    points: ['Manage every teacher and student', 'Oversee every class, live or archived', 'Track engagement across the platform'],
  },
];

const Landing = () => (
  <div className="min-h-screen bg-base">
    <PublicNavbar />

    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="badge glass text-pulse-400">
            <span className="h-1.5 w-1.5 rounded-full bg-pulse-500" />
            Built for classrooms that move fast
          </span>
          <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            Every hand raised,
            <br />
            <span className="bg-brand-gradient bg-clip-text text-transparent">answered live.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-muted">
            ClassPoll+ turns a lecture into a conversation — instant polls, real-time results, and a
            question queue that never gets lost in the noise.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to={ROUTES.LOGIN}>
              <Button size="lg" className="w-full sm:w-auto">
                Teacher sign in <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to={ROUTES.REGISTER_STUDENT}>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Join a class
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="flex justify-center lg:justify-end"
        >
          <LivePollMock />
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="border-t border-base-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="text-sm font-medium uppercase tracking-wider text-brand-400">Why ClassPoll+</p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Everything a live room needs.</h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-lg text-ink">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section id="how-it-works" className="border-t border-base-border py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-pulse-400">The flow</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">From question to consensus in seconds.</h2>

        <div className="mt-14 grid grid-cols-1 gap-8 text-left md:grid-cols-4">
          {[
            { step: 'Create', detail: 'Teacher creates a class and shares a 6-character join code.' },
            { step: 'Ask', detail: 'A poll goes live the moment the teacher starts it.' },
            { step: 'Vote', detail: 'Students respond from any device, results update instantly.' },
            { step: 'Resolve', detail: 'Doubts get answered inline, right where they were asked.' },
          ].map((s, i) => (
            <div key={s.step} className="relative">
              <span className="font-mono text-sm text-ink-faint">0{i + 1}</span>
              <h3 className="mt-2 font-display text-lg text-ink">{s.step}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Roles */}
    <section id="roles" className="border-t border-base-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-400">For every role</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">One platform, three clear jobs.</h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ROLE_CARDS.map((r) => (
            <div key={r.role} className="glass-card p-6">
              <span className="badge bg-white/5 text-ink-muted">{r.role}</span>
              <h3 className="mt-3 font-display text-xl text-ink">{r.tagline}</h3>
              <ul className="mt-4 space-y-2.5">
                {r.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-pulse-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="border-t border-base-border py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl text-ink sm:text-4xl">Ready to fill the silence?</h2>
        <p className="mt-4 text-ink-muted">Free to start. No credit card, no roster import, just a join code.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to={ROUTES.LOGIN}>
            <Button size="lg">Teacher sign in</Button>
          </Link>
          <Link to={ROUTES.LOGIN}>
            <Button variant="secondary" size="lg">
              I already have an account
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Landing;

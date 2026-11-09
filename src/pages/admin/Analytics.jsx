import { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import * as adminService from '../../services/admin.service.js';
import { formatDate } from '../../utils/helpers.js';

const BreakdownCard = ({ title, data, colorClass }) => (
  <div className="glass-card p-6">
    <h3 className="mb-4 font-display text-base text-ink">{title}</h3>
    <div className="space-y-3">
      {Object.entries(data).length === 0 ? (
        <p className="text-sm text-ink-faint">No data yet.</p>
      ) : (
        Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between text-sm">
            <span className="capitalize text-ink-muted">{key}</span>
            <span className={`font-mono font-medium ${colorClass}`}>{value}</span>
          </div>
        ))
      )}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="text-ink-faint">{formatDate(label)}</p>
      <p className="font-mono text-ink">{payload[0].value} signups</p>
    </div>
  );
};

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await adminService.getAnalytics();
      setAnalytics(data);
    })();
  }, []);

  if (!analytics) return <LoadingScreen label="Crunching platform analytics" />;

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="mb-4 font-display text-base text-ink">New signups — last 14 days</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.dailySignups}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => formatDate(d)}
                stroke="#5B6478"
                fontSize={11}
                tickLine={false}
              />
              <YAxis stroke="#5B6478" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BreakdownCard title="Users by role" data={analytics.usersByRole} colorClass="text-brand-300" />
        <BreakdownCard title="Polls by status" data={analytics.pollsByStatus} colorClass="text-pulse-400" />
        <BreakdownCard title="Questions by status" data={analytics.questionsByStatus} colorClass="text-amber-400" />
      </div>

      <div className="glass-card p-6">
        <h3 className="mb-4 font-display text-base text-ink">Top 5 most-enrolled classes</h3>
        {analytics.topClasses.length === 0 ? (
          <p className="text-sm text-ink-faint">No classes yet.</p>
        ) : (
          <div className="space-y-3">
            {analytics.topClasses.map((c, i) => (
              <div key={c._id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink-muted">
                  <span className="font-mono text-ink-faint">0{i + 1}</span>
                  {c.className}
                </span>
                <span className="font-mono text-pulse-400">{c.studentCount} students</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;

import { useEffect, useState } from 'react';
import { Users, GraduationCap, BookOpen, Radio, Vote, MessageCircleQuestion } from 'lucide-react';
import StatCard from '../../components/cards/StatCard.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import * as adminService from '../../services/admin.service.js';

const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await adminService.getDashboardOverview();
      setOverview(data);
    })();
  }, []);

  if (!overview) return <LoadingScreen label="Loading platform overview" />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard icon={GraduationCap} label="Students" value={overview.totalStudents} accent="brand" />
      <StatCard icon={Users} label="Teachers" value={overview.totalTeachers} accent="brand" />
      <StatCard icon={BookOpen} label="Active classes" value={overview.activeClasses} accent="pulse" />
      <StatCard icon={Radio} label="Live polls right now" value={overview.livePolls} accent="pulse" />
      <StatCard icon={Vote} label="Total votes cast" value={overview.totalVotes} accent="amber" />
      <StatCard icon={MessageCircleQuestion} label="Pending questions" value={overview.pendingQuestions} accent="amber" />
    </div>
  );
};

export default AdminDashboard;

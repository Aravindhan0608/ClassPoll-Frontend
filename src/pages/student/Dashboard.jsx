import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Radio, MessageCircleQuestion, Plus } from 'lucide-react';
import StatCard from '../../components/cards/StatCard.jsx';
import ClassCard from '../../components/class/ClassCard.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import JoinClassModal from '../../components/class/JoinClassModal.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import * as classService from '../../services/class.service.js';
import { ROUTES } from '../../utils/constants.js';

const StudentDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const loadClasses = async () => {
    const list = await classService.getMyStudentClasses();
    setClasses(list);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await loadClasses();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <LoadingScreen label="Loading your classes" />;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={BookOpen} label="Classes joined" value={classes.length} accent="brand" />
        <StatCard icon={Radio} label="Live right now" value="—" accent="pulse" />
        <StatCard icon={MessageCircleQuestion} label="Questions asked" value="—" accent="amber" />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Your classes</h2>
          <Button size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" /> Join class
          </Button>
        </div>

        {classes.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No classes yet"
            description="Ask your teacher for their 6-character join code to get started."
            action={<Button onClick={() => setModalOpen(true)}>Join your first class</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((c) => (
              <ClassCard key={c._id} classItem={c} linkTo={ROUTES.STUDENT_ACTIVE_POLL} />
            ))}
          </div>
        )}
      </div>

      <JoinClassModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onJoined={loadClasses} />
    </div>
  );
};

export default StudentDashboard;

import { useEffect, useState } from 'react';
import { BookOpen, Users, Plus } from 'lucide-react';
import StatCard from '../../components/cards/StatCard.jsx';
import ClassCard from '../../components/class/ClassCard.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import CreateClassModal from '../../components/class/CreateClassModal.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import * as classService from '../../services/class.service.js';
import { ROUTES } from '../../utils/constants.js';

const TeacherDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const loadClasses = async () => {
    const list = await classService.getMyTeacherClasses();
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

  const totalStudents = classes.reduce((sum, c) => sum + (c.studentCount ?? c.students?.length ?? 0), 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard icon={BookOpen} label="Classes you teach" value={classes.length} accent="brand" />
        <StatCard icon={Users} label="Total students" value={totalStudents} accent="pulse" />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Your classes</h2>
          <Button size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" /> Create class
          </Button>
        </div>

        {classes.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No classes yet"
            description="Create a class to get a shareable join code for your students."
            action={<Button onClick={() => setModalOpen(true)}>Create your first class</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((c) => (
              <ClassCard key={c._id} classItem={c} linkTo={ROUTES.TEACHER_CLASS_DETAIL} />
            ))}
          </div>
        )}
      </div>

      <CreateClassModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreated={loadClasses} />
    </div>
  );
};

export default TeacherDashboard;

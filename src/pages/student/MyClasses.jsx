import { useEffect, useState } from 'react';
import { BookOpen, Plus } from 'lucide-react';
import ClassCard from '../../components/class/ClassCard.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import JoinClassModal from '../../components/class/JoinClassModal.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import * as classService from '../../services/class.service.js';
import { ROUTES } from '../../utils/constants.js';

const MyClasses = () => {
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
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink-muted">{classes.length} class{classes.length === 1 ? '' : 'es'} joined</p>
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

      <JoinClassModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onJoined={loadClasses} />
    </div>
  );
};

export default MyClasses;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircleQuestion } from 'lucide-react';
import TeacherQuestionItem from '../../components/question/TeacherQuestionItem.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import useClassRoom from '../../hooks/useClassRoom.js';
import useSocketEvent from '../../hooks/useSocketEvent.js';
import * as classService from '../../services/class.service.js';
import * as questionService from '../../services/question.service.js';
import { cn } from '../../utils/helpers.js';

const FILTERS = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Answered', value: 'answered' },
];

const TeacherQuestions = () => {
  const { classId } = useParams();
  const [classDoc, setClassDoc] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useClassRoom(classId);

  const load = async (status) => {
    const [classData, list] = await Promise.all([
      classService.getClassById(classId),
      questionService.getQuestionsForClass(classId, status || undefined),
    ]);
    setClassDoc(classData);
    setQuestions(list);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await load(filter);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId, filter]);

  // A new question just came in from a student — refresh live.
  useSocketEvent('question:new', () => load(filter), [classId, filter]);

  const handleAnswered = (updated) => {
    setQuestions((prev) =>
      filter === 'pending' ? prev.filter((q) => q._id !== updated._id) : prev.map((q) => (q._id === updated._id ? updated : q))
    );
  };

  if (isLoading) return <LoadingScreen label="Loading questions" />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl text-ink">{classDoc?.className}</h2>
        <div className="flex gap-1 rounded-lg border border-base-border bg-base-surface p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors',
                filter === f.value ? 'bg-brand-gradient text-white' : 'text-ink-muted hover:text-ink'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {questions.length === 0 ? (
        <EmptyState icon={MessageCircleQuestion} title="No questions" description="Questions from students will appear here." />
      ) : (
        <div className="mx-auto max-w-2xl space-y-3">
          {questions.map((q) => (
            <TeacherQuestionItem key={q._id} question={q} onAnswered={handleAnswered} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherQuestions;

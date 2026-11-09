import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircleQuestion } from 'lucide-react';
import ClassTabs from '../../components/class/ClassTabs.jsx';
import AskQuestionForm from '../../components/question/AskQuestionForm.jsx';
import QuestionItem from '../../components/question/QuestionItem.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import useClassRoom from '../../hooks/useClassRoom.js';
import useSocketEvent from '../../hooks/useSocketEvent.js';
import * as classService from '../../services/class.service.js';
import * as questionService from '../../services/question.service.js';

const StudentQuestions = () => {
  const { classId } = useParams();
  const [classDoc, setClassDoc] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useClassRoom(classId);

  const load = async () => {
    const [classData, list] = await Promise.all([
      classService.getClassById(classId),
      questionService.getQuestionsForClass(classId),
    ]);
    setClassDoc(classData);
    setQuestions(list);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await load();
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  // Teacher just answered one of ours — refresh so it flips to "Answered" live.
  useSocketEvent('question:answered', () => load(), [classId]);

  if (isLoading) return <LoadingScreen label="Loading questions" />;

  return (
    <div>
      <ClassTabs classId={classId} className={classDoc?.className} />

      <div className="mx-auto max-w-2xl space-y-6">
        <AskQuestionForm classId={classId} onAsked={(q) => setQuestions((prev) => [q, ...prev])} />

        {questions.length === 0 ? (
          <EmptyState icon={MessageCircleQuestion} title="No questions yet" description="Ask your first question above." />
        ) : (
          <div className="space-y-3">
            {questions.map((q) => (
              <QuestionItem key={q._id} question={q} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentQuestions;

import { useState } from 'react';
import { MessageCircleQuestion, CheckCircle2, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../common/Button.jsx';
import * as questionService from '../../services/question.service.js';
import { formatRelativeTime, getErrorMessage } from '../../utils/helpers.js';

const TeacherQuestionItem = ({ question, onAnswered }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = async () => {
    if (!answer.trim()) return;
    setIsSubmitting(true);
    try {
      const updated = await questionService.answerQuestion(question._id, answer.trim());
      toast.success('Reply sent');
      onAnswered?.(updated);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5">
          <MessageCircleQuestion className="h-4 w-4 text-brand-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-ink-muted">Anonymous Student</span>
            <span className="text-xs text-ink-faint">{formatRelativeTime(question.createdAt)}</span>
          </div>
          <p className="mt-1 text-sm text-ink">{question.question}</p>

          {question.status === 'answered' ? (
            <div className="mt-3 rounded-lg border border-pulse-500/20 bg-pulse-500/5 px-3.5 py-2.5">
              <span className="flex items-center gap-1.5 text-xs font-medium text-pulse-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> You answered
              </span>
              <p className="mt-1.5 text-sm text-ink-muted">{question.answer}</p>
            </div>
          ) : (
            <div className="mt-3">
              <span className="mb-2 flex items-center gap-1.5 text-xs font-medium text-amber-500">
                <Clock className="h-3.5 w-3.5" /> Awaiting your reply
              </span>
              <div className="flex gap-2">
                <textarea
                  rows={2}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your reply…"
                  className="input resize-none"
                />
                <Button size="sm" isLoading={isSubmitting} disabled={!answer.trim()} onClick={handleAnswer} className="shrink-0 self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherQuestionItem;

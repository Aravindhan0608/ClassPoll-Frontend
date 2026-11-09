import { MessageCircleQuestion, CheckCircle2, Clock } from 'lucide-react';
import { formatRelativeTime } from '../../utils/helpers.js';

const QuestionItem = ({ question, showAsker = false }) => (
  <div className="glass-card p-5">
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5">
        <MessageCircleQuestion className="h-4 w-4 text-brand-400" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          {showAsker && question.studentId?.name && (
            <span className="text-xs font-medium text-ink-muted">{question.studentId.name}</span>
          )}
          <span className="ml-auto text-xs text-ink-faint">{formatRelativeTime(question.createdAt)}</span>
        </div>
        <p className="mt-1 text-sm text-ink">{question.question}</p>

        {question.status === 'answered' ? (
          <div className="mt-3 rounded-lg border border-pulse-500/20 bg-pulse-500/5 px-3.5 py-2.5">
            <span className="flex items-center gap-1.5 text-xs font-medium text-pulse-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Answered
            </span>
            <p className="mt-1.5 text-sm text-ink-muted">{question.answer}</p>
          </div>
        ) : (
          <span className="mt-3 flex items-center gap-1.5 text-xs font-medium text-amber-500">
            <Clock className="h-3.5 w-3.5" /> Awaiting reply
          </span>
        )}
      </div>
    </div>
  </div>
);

export default QuestionItem;

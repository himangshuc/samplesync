import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import api from '../utils/api';
import {
  QUESTIONS, INITIAL_FLOW, DEBRIEF_FLOW,
  getBranchFlow, getSubBranchQuestions,
  SUB_BRANCH_PREFIXES, getQuestionById,
} from '../data/questionnaire';
import { qState, BRANCH_META } from '../utils/questionnaireState';

/* ─── Option Card ─────────────────────────────────────────────────────────── */
function OptionCard({ opt, selected, multiMode, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center text-center gap-2 p-5 rounded-2xl border-2 transition-all duration-150 w-full
        ${selected
          ? multiMode
            ? 'border-lime-500 bg-lime-50 text-navy-700 shadow-sm'
            : 'bg-navy-700 border-navy-700 text-white shadow-md'
          : 'bg-white border-gray-200 text-navy-700 hover:border-navy-400 hover:shadow-sm'
        }`}
    >
      {selected && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-lime-500 flex items-center justify-center">
          <Check className="w-3 h-3 text-navy-700" />
        </span>
      )}
      <span className="text-3xl leading-none">{opt.emoji}</span>
      <span className="font-bold text-sm leading-snug">{opt.label}</span>
      {opt.description && (
        <span className={`text-xs leading-relaxed ${selected && !multiMode ? 'text-white/70' : 'text-navy-700/50'}`}>
          {opt.description}
        </span>
      )}
    </button>
  );
}

/* ─── Section Intro Splash ────────────────────────────────────────────────── */
function SectionSplash({ intro, onContinue }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-navy-700 flex items-center justify-center mb-6">
        <span className="font-black text-lime-500 text-3xl leading-none">*</span>
      </div>
      <p className="text-navy-700/70 text-lg leading-relaxed max-w-md mb-8">{intro}</p>
      <button
        onClick={onContinue}
        className="inline-flex items-center gap-2 px-8 py-3 bg-navy-700 text-white font-semibold rounded-full hover:bg-navy-600 transition-colors"
      >
        Let's go <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ─── Completion / Transition Screen ─────────────────────────────────────── */
function CompletionScreen({ currentBranch, onStartNext, onTakeLater }) {
  const pending   = qState.getPendingBranches();
  const nextBranch = pending[0] ?? null;
  const allBranchesDone = qState.isAllBranchesDone();
  const selections = qState.getBranchStatus();

  if (currentBranch === 'debrief') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-20 h-20 rounded-full bg-lime-500 flex items-center justify-center mb-6">
          <span className="font-black text-navy-700 text-4xl leading-none">*</span>
        </div>
        <h2 className="text-3xl font-black text-navy-700 mb-3">Profile Complete!</h2>
        <p className="text-navy-700/60 text-base max-w-sm mb-8">
          Your Researcher ID is now active. We'll start matching samples to your profile right away.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-700 text-white font-bold rounded-full hover:bg-navy-600 transition-colors"
        >
          Go to Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (currentBranch === 'intro') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="w-14 h-14 rounded-full bg-lime-500 flex items-center justify-center mb-6">
          <Check className="w-7 h-7 text-navy-700" />
        </div>
        <h2 className="text-3xl font-black text-navy-700 mb-2">Assignment Complete!</h2>
        <p className="text-navy-700/60 mb-8">
          You've been assigned to {selections.length} department{selections.length !== 1 ? 's' : ''}. Complete each questionnaire to get perfectly matched samples.
        </p>

        <div className="space-y-3 mb-8">
          {selections.map(({ branch, done }) => {
            const meta = BRANCH_META[branch];
            return (
              <div key={branch} className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${done ? 'border-lime-500 bg-lime-50' : 'border-gray-200 bg-white'}`}>
                <span className="text-2xl">{meta.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-navy-700 text-sm">{meta.label}</p>
                  <p className="text-navy-700/50 text-xs">{meta.description}</p>
                </div>
                {done
                  ? <span className="w-6 h-6 rounded-full bg-lime-500 flex items-center justify-center shrink-0"><Check className="w-3.5 h-3.5 text-navy-700" /></span>
                  : <span className="text-xs font-semibold text-navy-700/40 shrink-0">Pending</span>
                }
              </div>
            );
          })}
        </div>

        {nextBranch ? (
          <div className="space-y-3">
            <button
              onClick={() => onStartNext(nextBranch)}
              className="w-full py-4 bg-navy-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-navy-600 transition-colors"
            >
              Start {BRANCH_META[nextBranch].emoji} {BRANCH_META[nextBranch].label} <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onTakeLater}
              className="w-full py-3 text-navy-700/50 text-sm font-medium hover:text-navy-700 transition-colors"
            >
              Take them later
            </button>
          </div>
        ) : (
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-700 text-white font-bold rounded-full hover:bg-navy-600 transition-colors"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    );
  }

  // After a branch questionnaire
  const meta = BRANCH_META[currentBranch];
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="w-14 h-14 rounded-full bg-lime-500 flex items-center justify-center mb-6">
        <Check className="w-7 h-7 text-navy-700" />
      </div>
      <p className="text-sm font-bold text-navy-700/50 uppercase tracking-widest mb-2">{meta.emoji} {meta.label}</p>
      <h2 className="text-3xl font-black text-navy-700 mb-6">Questionnaire complete!</h2>

      {pending.length > 0 ? (
        <>
          <p className="text-navy-700/60 mb-6">
            You still have {pending.length} questionnaire{pending.length !== 1 ? 's' : ''} pending:
          </p>
          <div className="space-y-2 mb-8">
            {pending.map(b => {
              const m = BRANCH_META[b];
              return (
                <div key={b} className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gray-200">
                  <span className="text-xl">{m.emoji}</span>
                  <span className="font-semibold text-navy-700 text-sm">{m.label}</span>
                  <span className="ml-auto text-xs text-navy-700/40 font-medium">Pending</span>
                </div>
              );
            })}
          </div>
          <div className="space-y-3">
            <button
              onClick={() => onStartNext(nextBranch)}
              className="w-full py-4 bg-navy-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-navy-600 transition-colors"
            >
              Start {BRANCH_META[nextBranch].emoji} {BRANCH_META[nextBranch].label} <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onTakeLater}
              className="w-full py-3 text-navy-700/50 text-sm font-medium hover:text-navy-700 transition-colors"
            >
              Take them later
            </button>
          </div>
        </>
      ) : allBranchesDone && !qState.isDebriefDone() ? (
        <>
          <p className="text-navy-700/60 mb-8">
            All departments profiled! One last step — complete your Mission Control briefing to finalise your researcher profile.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => onStartNext('debrief')}
              className="w-full py-4 bg-navy-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-navy-600 transition-colors"
            >
              {BRANCH_META.debrief.emoji} Start {BRANCH_META.debrief.label} <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onTakeLater}
              className="w-full py-3 text-navy-700/50 text-sm font-medium hover:text-navy-700 transition-colors"
            >
              Take it later
            </button>
          </div>
        </>
      ) : (
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-700 text-white font-bold rounded-full hover:bg-navy-600 transition-colors"
        >
          Go to Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
export default function ProfileQuestionnaire() {
  const { branch } = useParams();
  const navigate   = useNavigate();

  const currentBranch = branch ?? 'intro';

  // Guard: must complete intro before taking a branch
  useEffect(() => {
    if (currentBranch !== 'intro' && !qState.isIntroDone()) {
      navigate('/questionnaire', { replace: true });
    }
  }, [currentBranch, navigate]);

  // Build initial flow for this phase (no cross-phase injection)
  function buildInitialFlow() {
    if (currentBranch === 'intro')   return ['intro_q1', 'intro_q2', 'intro_q3'];
    if (currentBranch === 'debrief') return [...DEBRIEF_FLOW];
    return getBranchFlow(currentBranch);
  }

  const [flow, setFlow]           = useState(() => buildInitialFlow());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers]     = useState({});
  const [multiTemp, setMultiTemp] = useState([]);
  const [stagedAnswer, setStagedAnswer] = useState(null);
  const [saving, setSaving]       = useState(false);
  const [phase, setPhase]         = useState('questions'); // 'questions' | 'complete'
  const [sectionIntroAcked, setSectionIntroAcked] = useState({});
  const [maxProgress, setMaxProgress] = useState(0);

  const qId      = flow[currentIndex];
  const question = getQuestionById(qId);
  const isLast   = currentIndex === flow.length - 1;
  const progress = Math.round(((currentIndex + 1) / (flow.length || 1)) * 100);

  useEffect(() => {
    setMaxProgress(prev => Math.max(prev, progress));
  }, [progress]);

  useEffect(() => {
    if (!question) return;
    if (question.type === 'multi') setMultiTemp(answers[qId] ?? []);
    setStagedAnswer(answers[qId] ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qId]);

  if (!question && phase === 'questions') return null;

  const sectionKey = question?.sectionKey;
  const needsIntro = question?.sectionIntro && !sectionIntroAcked[sectionKey];

  function ackSectionIntro() {
    setSectionIntroAcked(prev => ({ ...prev, [sectionKey]: true }));
  }

  /* ── Engine ── */
  function handleAnswer(answer) {
    const currentQId = flow[currentIndex];
    const newAnswers = { ...answers, [currentQId]: answer };
    setAnswers(newAnswers);

    let newFlow = [...flow];

    // Sub-branch injection (only within branch phases, not intro/debrief)
    if (currentBranch !== 'intro' && currentBranch !== 'debrief') {
      const prefixes = SUB_BRANCH_PREFIXES[currentQId];
      if (prefixes) {
        const tail = flow.slice(currentIndex + 1).filter(
          id => !prefixes.some(p => id.startsWith(p))
        );
        const subBranch = getSubBranchQuestions(currentQId, answer);
        newFlow = [...flow.slice(0, currentIndex + 1), ...subBranch, ...tail];
        setFlow(newFlow);
      }
    }

    setStagedAnswer(null);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= newFlow.length) {
      handleComplete(newAnswers, newFlow);
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setStagedAnswer(null);
    }
  }

  function toggleMulti(value) {
    setMultiTemp(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  }

  async function handleComplete(finalAnswers, finalFlow) {
    setSaving(true);
    try {
      await api.post('/users/questionnaire', {
        phase: currentBranch,
        answers: finalAnswers,
        flow_completed: finalFlow,
      });
    } catch { /* non-fatal */ }

    // Update local state
    if (currentBranch === 'intro') {
      qState.setIntroDone(finalAnswers['intro_q3'] ?? []);
    } else if (currentBranch === 'debrief') {
      qState.setDebriefDone();
    } else {
      qState.setBranchDone(currentBranch);
    }

    setSaving(false);
    setPhase('complete');
  }

  function handleStartNext(nextBranch) {
    navigate(`/questionnaire/${nextBranch}`);
    // Reset local state for the new branch
    setFlow(getBranchFlow(nextBranch));
    setCurrentIndex(0);
    setAnswers({});
    setMultiTemp([]);
    setStagedAnswer(null);
    setPhase('questions');
    setMaxProgress(0);
    setSectionIntroAcked({});
  }

  function handleTakeLater() {
    navigate('/dashboard');
  }

  /* ── Render: completion screen ── */
  if (phase === 'complete') {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#EFEFEF]">
        <CompletionScreen
          currentBranch={currentBranch}
          onStartNext={handleStartNext}
          onTakeLater={handleTakeLater}
        />
      </div>
    );
  }

  /* ── Render: questions ── */
  const gridCols =
    question.options.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' :
    question.options.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
    'grid-cols-2';

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#EFEFEF]">

      {/* Progress bar */}
      <div className="sticky top-0 z-10 bg-[#EFEFEF]/90 backdrop-blur-sm border-b border-navy-700/10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="w-8 h-8 rounded-full flex items-center justify-center text-navy-700/40 hover:text-navy-700 disabled:opacity-20 transition-colors shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="w-full h-1.5 bg-navy-700/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-lime-500 rounded-full transition-all duration-500"
                style={{ width: `${maxProgress}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-semibold text-navy-700/40 shrink-0 tabular-nums">
            {maxProgress}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-10">

          {needsIntro ? (
            <SectionSplash intro={question.sectionIntro} onContinue={ackSectionIntro} />
          ) : (
            <>
              {/* Section badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-navy-700 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  <span className="text-lime-500">*</span>
                  {question.sectionLabel}
                  {question.partLabel && (
                    <span className="text-white/50 ml-1">· {question.partLabel}</span>
                  )}
                </span>
              </div>

              {/* Question */}
              <h2 className="text-2xl md:text-3xl font-black text-navy-700 leading-tight mb-3">
                {question.question}
              </h2>
              {question.hint && (
                <p className="text-navy-700/50 text-sm mb-6">{question.hint}</p>
              )}

              {/* Options grid */}
              <div className={`grid ${gridCols} gap-3 mb-8`}>
                {question.type === 'single' && question.options.map(opt => (
                  <OptionCard
                    key={opt.value}
                    opt={opt}
                    multiMode={false}
                    selected={isLast ? stagedAnswer === opt.value : answers[qId] === opt.value}
                    onClick={() => isLast ? setStagedAnswer(opt.value) : handleAnswer(opt.value)}
                  />
                ))}
                {question.type === 'multi' && question.options.map(opt => (
                  <OptionCard
                    key={opt.value}
                    opt={opt}
                    multiMode={true}
                    selected={multiTemp.includes(opt.value)}
                    onClick={() => toggleMulti(opt.value)}
                  />
                ))}
              </div>

              {/* Multi-select continue */}
              {question.type === 'multi' && (
                <button
                  onClick={() => { if (multiTemp.length > 0) handleAnswer(multiTemp); }}
                  disabled={multiTemp.length === 0}
                  className="w-full py-4 bg-navy-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-30 hover:bg-navy-600 transition-colors"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {/* Last question complete button */}
              {isLast && question.type === 'single' && (
                <button
                  onClick={() => { if (stagedAnswer) handleAnswer(stagedAnswer); }}
                  disabled={!stagedAnswer || saving}
                  className="w-full py-4 bg-lime-500 text-navy-700 font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-30 hover:bg-lime-400 transition-colors"
                >
                  {saving
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                    : <><Check className="w-4 h-4" /> Complete</>
                  }
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

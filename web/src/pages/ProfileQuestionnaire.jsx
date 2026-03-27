import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import api from '../utils/api';
import {
  QUESTIONS, INITIAL_FLOW, DEBRIEF_FLOW,
  getBranchQuestionsForSelections, getSubBranchQuestions,
  SUB_BRANCH_PREFIXES, getQuestionById,
} from '../data/questionnaire';

/* ─── Option Card ─────────────────────────────────────────────────────────── */
function OptionCard({ opt, selected, onClick, multiMode }) {
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
      {selected && !multiMode && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-lime-500 flex items-center justify-center">
          <Check className="w-3 h-3 text-navy-700" />
        </span>
      )}
      {selected && multiMode && (
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

/* ─── Main Component ──────────────────────────────────────────────────────── */
export default function ProfileQuestionnaire() {
  const navigate = useNavigate();

  /* ── State ── */
  const [flow, setFlow]               = useState(INITIAL_FLOW);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers]         = useState({});
  const [multiTemp, setMultiTemp]     = useState([]);
  const [stagedAnswer, setStagedAnswer] = useState(null); // for final question
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState('');
  const [sectionIntroAcked, setSectionIntroAcked] = useState({});
  const [maxProgress, setMaxProgress] = useState(0);

  const qId      = flow[currentIndex];
  const question = getQuestionById(qId);
  const isLast   = currentIndex === flow.length - 1;
  const progress = Math.round(((currentIndex + 1) / (flow.length || 1)) * 100);

  /* Keep maxProgress monotonically increasing (so bar never retreats) */
  useEffect(() => {
    setMaxProgress(prev => Math.max(prev, progress));
  }, [progress]);

  /* Pre-fill multiTemp when landing on a multi question */
  useEffect(() => {
    if (!question) return;
    if (question.type === 'multi') {
      setMultiTemp(answers[qId] ?? []);
    }
    setStagedAnswer(answers[qId] ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qId]);

  if (!question) return null;

  /* ── Section intro gate ── */
  const sectionKey  = question.sectionKey;
  const needsIntro  = question.sectionIntro && !sectionIntroAcked[sectionKey];

  function ackSectionIntro() {
    setSectionIntroAcked(prev => ({ ...prev, [sectionKey]: true }));
  }

  /* ── Engine: handle an answer ── */
  function handleAnswer(answer) {
    const currentQId = flow[currentIndex];
    const newAnswers = { ...answers, [currentQId]: answer };
    setAnswers(newAnswers);

    let newFlow = [...flow];

    if (currentQId === 'intro_q3') {
      // answer is array — replace entire tail with branch questions + debrief
      const branchQs = getBranchQuestionsForSelections(answer);
      newFlow = [...flow.slice(0, currentIndex + 1), ...branchQs, ...DEBRIEF_FLOW];
    } else {
      // Check for sub-branch injection (single-select trigger questions)
      const prefixes = SUB_BRANCH_PREFIXES[currentQId];
      if (prefixes) {
        // Strip any previously injected sub-branch questions for this trigger
        const tail = flow.slice(currentIndex + 1).filter(
          id => !prefixes.some(p => id.startsWith(p))
        );
        const subBranch = getSubBranchQuestions(currentQId, answer);
        newFlow = [...flow.slice(0, currentIndex + 1), ...subBranch, ...tail];
      }
    }

    setFlow(newFlow);
    setStagedAnswer(null);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= newFlow.length) {
      handleComplete(newAnswers, newFlow);
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  /* ── Engine: go back ── */
  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setStagedAnswer(null);
    }
  }

  /* ── Engine: complete ── */
  async function handleComplete(finalAnswers, finalFlow) {
    setSaving(true);
    setError('');
    try {
      await api.post('/users/questionnaire', {
        answers: finalAnswers,
        flow_completed: finalFlow,
      });
    } catch {
      // Non-fatal — save locally regardless
    } finally {
      localStorage.setItem('questionnaire_done', 'true');
      setSaving(false);
      navigate('/dashboard');
    }
  }

  /* ── Toggle multi-select ── */
  function toggleMulti(value) {
    setMultiTemp(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  }

  /* ── Render ── */
  const gridCols = question.options.length <= 2
    ? 'grid-cols-1 sm:grid-cols-2'
    : question.options.length === 3
    ? 'grid-cols-1 sm:grid-cols-3'
    : 'grid-cols-2 md:grid-cols-2';

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#EFEFEF]">

      {/* ── Progress bar + nav ── */}
      <div className="sticky top-0 z-10 bg-[#EFEFEF]/90 backdrop-blur-sm border-b border-navy-700/10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="w-8 h-8 rounded-full flex items-center justify-center text-navy-700/50 hover:text-navy-700 disabled:opacity-20 transition-colors shrink-0"
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

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-10">

          {/* Section intro splash */}
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
                    onClick={() => {
                      if (isLast) {
                        setStagedAnswer(opt.value);
                      } else {
                        handleAnswer(opt.value);
                      }
                    }}
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

              {/* Action buttons */}
              {question.type === 'multi' && (
                <button
                  onClick={() => {
                    if (multiTemp.length > 0) handleAnswer(multiTemp);
                  }}
                  disabled={multiTemp.length === 0}
                  className="w-full py-4 bg-navy-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-30 transition-opacity hover:bg-navy-600"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {isLast && question.type === 'single' && (
                <button
                  onClick={() => {
                    if (stagedAnswer) handleAnswer(stagedAnswer);
                  }}
                  disabled={!stagedAnswer || saving}
                  className="w-full py-4 bg-lime-500 text-navy-700 font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-30 transition-opacity hover:bg-lime-400"
                >
                  {saving
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving your profile…</>
                    : <><Check className="w-4 h-4" /> Complete Profile</>
                  }
                </button>
              )}

              {error && (
                <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

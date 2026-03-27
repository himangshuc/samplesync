/* ─── Questionnaire progress state (localStorage) ───────────────────────────
   Keys are prefixed ss_q_ to avoid collisions.
   ─────────────────────────────────────────────────────────────────────────── */

const BRANCH_ORDER = ['kitchen', 'bathroom', 'living', 'wardrobe', 'pet'];

export const BRANCH_META = {
  kitchen:  { label: 'The Kitchen Check',        emoji: '🍳', description: 'Snacks, drinks & pantry preferences' },
  bathroom: { label: 'The Vanity Lab',            emoji: '🧴', description: 'Skincare, bodycare & fragrance' },
  living:   { label: 'The Sanctuary Studio',      emoji: '🛋️', description: 'Home décor, plants & smart gadgets' },
  wardrobe: { label: 'The Threads & Trend Lab',   emoji: '👔', description: 'Clothing, footwear & accessories' },
  pet:      { label: 'The Paws & Claws Club',     emoji: '🐾', description: 'Pet food, toys & grooming' },
  debrief:  { label: 'Mission Control',           emoji: '🎯', description: 'Logistics & researcher preferences' },
};

const K = {
  introDone:    'ss_q_intro_done',
  selections:   'ss_q_selections',
  branchesDone: 'ss_q_branches_done',
  debriefDone:  'ss_q_debrief_done',
};

function read(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch { return fallback; }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const qState = {
  isIntroDone:     () => read(K.introDone, false),
  getSelections:   () => read(K.selections, []),
  getDoneBranches: () => read(K.branchesDone, []),
  isDebriefDone:   () => read(K.debriefDone, false),

  setIntroDone(selections) {
    write(K.introDone, true);
    write(K.selections, selections);
  },

  setBranchDone(branch) {
    const done = this.getDoneBranches();
    if (!done.includes(branch)) write(K.branchesDone, [...done, branch]);
  },

  setDebriefDone() {
    write(K.debriefDone, true);
    localStorage.setItem('questionnaire_done', 'true');
  },

  getPendingBranches() {
    const sel  = this.getSelections();
    const done = this.getDoneBranches();
    return BRANCH_ORDER.filter(b => sel.includes(b) && !done.includes(b));
  },

  getNextBranch() {
    return this.getPendingBranches()[0] ?? null;
  },

  isAllBranchesDone() {
    return this.getPendingBranches().length === 0;
  },

  isAllDone() {
    return this.isIntroDone() && this.isAllBranchesDone() && this.isDebriefDone();
  },

  /** Returns selected branches in order, each with a `done` flag. */
  getBranchStatus() {
    const sel  = this.getSelections();
    const done = this.getDoneBranches();
    return BRANCH_ORDER
      .filter(b => sel.includes(b))
      .map(b => ({ branch: b, done: done.includes(b) }));
  },
};

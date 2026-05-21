import React, { useState, useEffect } from 'react';
import { Target, KeyRound, Home, ChevronUp, ChevronDown, Copy, Check, Sparkles, Loader2, Mail, BookOpen, ExternalLink, RotateCw, ArrowLeft, Users, Brain, Eye, MessageCircle, PlayCircle, Video, ClipboardList, MessageSquare, LifeBuoy, Mic, PenTool, Award, TrendingUp, Smile, Quote } from 'lucide-react';

// --- DATA ---
const clarityStrategies = [
  { 
    title: "Prompting (Think-aloud)", 
    reason: "removes the guessing game of invisible cognitive processes",
    description: "Teacher verbalizes their internal thought process while modeling a task, demonstrating exactly how to approach a problem or text.",
    docLink: "https://rbi-support.tea.texas.gov/resource-library/excerpts-experts/modeling",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/teaching-language" 
  },
  { 
    title: "\"Gold Standard\" exemplar", 
    reason: "clarifies expectations for high-quality work",
    description: "Providing a completed, high-quality example of the final product before students begin so they know exactly what success looks like.",
    docLink: "https://spedsupport.tea.texas.gov/resource-library/excerpts-experts/modeling",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/excerpts-experts/modeling"
  },
  { 
    title: "Visual Timer", 
    reason: "removes uncertainty around task duration and supports self-regulation",
    description: "Using a visual countdown tool (like a colored disk timer or digital countdown) to make the abstract concept of time concrete, predictable, and manageable.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/visual-timer"
  },
  { 
    title: "Name success criteria", 
    reason: "removes confusion about task expectations",
    description: "Clearly listing the specific, observable elements required for a task to be considered complete and correct.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/reinforcement"
  },
  { 
    title: "Pre-teach vocabulary", 
    reason: "removes the barrier of unfamiliar academic language",
    description: "Explicitly introducing key academic and content-specific words before students encounter them in the independent lesson.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/series-tips-strategies-special-education/student-centered-vocabulary"
  },
  { 
    title: "Provide anchor chart", 
    reason: "removes the burden on working memory",
    description: "Co-creating a visual reference that remains displayed to remind students of key concepts, steps, or strategies.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/series-tips-strategies-special-education/first-then-charts"
  },
  { 
    title: "Task Analysis (Chunking steps)", 
    reason: "removes the barrier of overwhelming multi-step directions",
    description: "Breaking down complex, multi-step directions into smaller, manageable, and sequential actions to avoid cognitive overload.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/series-tips-strategies-special-education/task-analysis-and-chaining"
  },
  { 
    title: "Provide visual checklist", 
    reason: "removes executive functioning barriers",
    description: "Supplying a visual list of steps for the student to physically check off as they complete parts of a task to support self-monitoring.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/self-management"
  },
  { 
    title: "Build on Prior Learning", 
    reason: "reduces frustration by starting with familiar and successful tasks",
    description: "Scaffolding the lesson by beginning with tasks the student has already mastered to build behavioral momentum and confidence before introducing new, challenging content.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/behavioral-momentum"
  }
];

const accessStrategies = [
  { 
    title: "Allow Rehearsal in preferred language", 
    reason: "leverages the student's full linguistic repertoire",
    description: "Allowing the student to practice, discuss, or process concepts in their native or preferred language before transitioning to English output.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/priming"
  },
  { 
    title: "Allow oral rehearsal first", 
    reason: "leverages verbal strengths before written output",
    description: "Having the student speak their thoughts and answers aloud to organize them before requiring any written output.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/priming"
  },
  { 
    title: "Gestures/Non-verbal / AAC", 
    reason: "leverages multimodal forms of expression",
    description: "Encouraging the use of physical movement, sign language, or augmentative communication devices to show mastery.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/functional-communication-training-fct"
  },
  { 
    title: "Text-to-Speech/Scribe/Frames", 
    reason: "leverages technology and scaffolds to bypass writing, fine motor, or decoding barriers",
    description: "Using text-to-speech technology to read text aloud, scribing the student's dictated spoken words, or providing linguistic frames to help them easily construct content-area responses.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/excerpts-experts/augmentative-and-alternative-communication-giving-students"
  },
  { 
    title: "Bilingual visual glossary", 
    reason: "leverages cross-linguistic connections",
    description: "A reference tool featuring vocabulary words in both languages alongside illustrative images.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://www.txautism.net/interventions/visual-supports"
  },
  { 
    title: "High-interest topics", 
    reason: "leverages personal interests for engagement and autonomy",
    description: "Incorporating the student's specific personal interests into the lesson content or reading materials.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://www.youtube.com/embed/mPfMExJZOIw"
  },
  { 
    title: "Use Choice Boards", 
    reason: "leverages autonomy and intrinsic motivation",
    description: "Offering a menu of approved options for how the student can learn material or demonstrate their knowledge.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrls: [
      { label: "Watch Snack-Time Choice Making", url: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/choice-making-during-snack-charlie" },
      { label: "Explore Autism Toolkit: Choice Boards", url: "https://spedsupport.tea.texas.gov/resource-library/autism-toolkit/choice-board" }
    ]
  },
  { 
    title: "Exercise/Movement Break/TPR", 
    reason: "leverages physical movement to support language acquisition",
    description: "Integrating physical activity or Total Physical Response to link body movements directly to vocabulary meaning.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://www.youtube.com/embed/rIIVWLLFxEo"
  }
];

const conditionStrategies = [
  { 
    title: "Visual schedule", 
    reason: "supports predictability and emotional safety",
    description: "A visual representation of the day's or lesson's sequence of activities to reduce uncertainty and anxiety.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/autism-toolkit/individual-schedules"
  },
  { 
    title: "Clear transition signals (Priming)", 
    reason: "reduces anxiety and addresses the need for predictability",
    description: "Giving advance notice and clear visual or auditory cues before shifting from one activity to another.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/firstthen"
  },
  { 
    title: "Practice privately first", 
    reason: "addresses anxiety and lowers the affective filter before group sharing",
    description: "Allowing the student to try the skill one-on-one or independently before being asked to share with the group.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/behavioral-momentum"
  },
  { 
    title: "Wait Time (5-10 seconds)", 
    reason: "addresses the need for extended auditory processing time",
    description: "Intentionally pausing silently after asking a question to allow for language processing and formulation.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/choice-making-during-small-group"
  },
  { 
    title: "Strategic Rephrasing", 
    reason: "addresses receptive language challenges without increasing pressure",
    description: "Repeating or rewording a student's utterance or a question using simpler language or correct syntax without demanding repetition.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/prompting"
  },
  { 
    title: "Consistent location for practice", 
    reason: "addresses environmental sensory needs",
    description: "Providing a designated, predictable, and sensory-friendly physical space for specific types of independent work.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/strategies-action/meeting-sensory-needs"
  },
  { 
    title: "Partner sharing vs group", 
    reason: "addresses social anxiety by providing a safer communication setting",
    description: "Starting with a low-pressure turn-and-talk with one trusted peer before moving to whole-class discussions.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://spedsupport.tea.texas.gov/resource-library/excerpts-experts/peers-bridge-builders-students-complex-access-needs"
  },
  { 
    title: "Social Narratives for Retell", 
    reason: "addresses the need for explicit social expectations",
    description: "Using brief stories to explicitly teach the social expectations, steps, and scripts for participating in an activity.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://www.youtube.com/embed/pwTE1Ijpb3o"
  },
  { 
    title: "Power Words (Home Support)", 
    reason: "addresses the need for a strong family-school bridge",
    description: "Sharing key vocabulary and concepts with families so they can reinforce and discuss them in the home environment.",
    docLink: "https://rbi-support.tea.texas.gov/",
    videoUrl: "https://www.txautism.net/interventions/parent-implemented-intervention#research"
  }
];

const elpsPlds = {
  oral: {
    "Pre-Production": "Receptive language is developing (silent period). Understands English only when highly scaffolded; responds primarily with gestures, drawings, or mimicry.",
    Beginning: "Characterized by speech emergence using single words or two-to-three-word phrases. Understands simple, routine conversations with highly scaffolded instruction.",
    Intermediate: "Characterized by receptive and expressive language with literal comprehension. Uses simple, high-frequency, everyday English; needs moderately scaffolded instruction.",
    "High Intermediate": "Consistently uses a variety of sentence types, shares thoughts, asks for clarification, and uses content-area terms with minimal scaffolding. Reaches a higher level of abstract comprehension.",
    Advanced: "Engages comfortably in formal/informal grade-level interactions with little to no linguistic support. Uses precise, academic content vocabulary and complex structures."
  },
  writing: {
    "Pre-Production": "Receptive written language developing. Relies on copying, drawing, or primary language to participate; unable to construct original, independent English text.",
    Beginning: "Writes simple, isolated words, lists, or short copied phrases. Relies heavily on high-frequency concrete words, visual charts, and primary language frames.",
    Intermediate: "Writes simple sentences using high-frequency everyday vocabulary. Relies primarily on literal meanings, present tense verbs, and highly repetitive sentence patterns.",
    "High Intermediate": "Writes with increasing detail and a variety of sentence structures. Discusses academic topics using content-based terms; minor errors do not block overall meaning.",
    Advanced: "Writes complex academic structures at a level nearly comparable to native English-speaking peers. Uses precise abstract vocabulary with little to no linguistic scaffolding."
  }
};

const curatedQuotes = [
  { text: "Every child deserves a champion—an adult who will never give up on them, who understands the power of connection, and insists that they become the best that they can possibly be.", author: "Rita Pierson" },
  { text: "If a child can't learn the way we teach, maybe we should teach the way they learn.", author: "Ignacio Estrada" },
  { text: "Fairness does not mean everyone gets the same thing. Fairness means everyone gets what they need to be successful.", author: "Richard Lavoie" },
  { text: "Diversity is being invited to the party. Inclusion is being asked to dance.", author: "Verna Myers" },
  { text: "Autism doesn't come with an instruction guide. It comes with a person who deserves to be understood.", author: "Unknown" },
  { text: "Connections are the true currency of classrooms. Before we can ask for linguistic or academic output, we must establish trust.", author: "Emergent Bilingual Framework" }
];

// --- COMPONENTS ---

function FlipColumn({ title, subtitle, icon, colorClass, headerClass, buttonClass, strategies, currentIndex, onPrev, onNext, badge }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const currentStrategy = strategies[currentIndex];

  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const isEmbeddable = (url) => {
    return url && (url.includes('youtube.com/embed') || url.includes('player.vimeo.com'));
  };

  const renderVideoSection = () => {
    let videoList = [];
    if (currentStrategy.videoUrls) {
      videoList = currentStrategy.videoUrls.map((item, idx) => {
        if (typeof item === 'string') {
          return { label: `Watch Video Model ${idx + 1}`, url: item };
        }
        return item;
      });
    } else if (currentStrategy.videoUrl) {
      videoList = [{ label: "Watch Lesson Model", url: currentStrategy.videoUrl }];
    }

    if (videoList.length === 0) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-0"></div>
          <PlayCircle className="w-10 h-10 mb-2 opacity-50 z-10 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-xs font-bold tracking-wider uppercase opacity-70 z-10">Video Model Placeholder</span>
          <span className="absolute bottom-2 left-3 text-white/90 text-xs font-medium z-10 flex items-center gap-1">
            <Video className="w-3 h-3" /> Coming Soon
          </span>
        </div>
      );
    }

    if (videoList.length === 1 && isEmbeddable(videoList[0].url)) {
      return (
        <iframe 
          src={videoList[0].url} 
          title={`${currentStrategy.title} Video Model`}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      );
    }

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 to-slate-800 z-0"></div>
        <Video className="w-10 h-10 mb-2 text-indigo-400 z-10" strokeWidth={1.5} />
        <p className="text-xs font-bold text-white z-10 mb-3 px-2 uppercase tracking-wider">
          {videoList.length > 1 ? "TEA Video Resources" : "TEA Video Resource"}
        </p>
        <div className="z-10 flex flex-col gap-2 w-full max-h-[110px] overflow-y-auto px-2">
          {videoList.map((vid, idx) => (
            <a 
              key={idx}
              href={vid.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 shadow-lg border border-indigo-400/30 truncate"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" /> 
              <span className="truncate">{vid.label}</span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col border-2 rounded-2xl overflow-hidden shadow-sm transition-all h-[440px] ${colorClass}`}>
      <div className={`p-4 flex flex-col items-center justify-center text-center border-b border-opacity-30 border-black ${headerClass} z-10`}>
        <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-50 rounded-full mb-2 shadow-sm">
          {icon}
        </div>
        <h2 className="font-black text-xl tracking-wide">{title}</h2>
        <p className="text-sm font-medium opacity-80">{subtitle}</p>
      </div>

      <div className="flex-1 relative" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          
          {/* FRONT FACE */}
          <div className="absolute inset-0 w-full h-full flex flex-col p-4 bg-white bg-opacity-60 backdrop-blur-sm" style={{ backfaceVisibility: 'hidden' }}>
            <div className="absolute top-0 left-4 right-4 h-3 flex justify-between px-2 -mt-1.5 opacity-20">
              {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-3 bg-black rounded-full shadow-inner"></div>)}
            </div>

            <button onClick={onPrev} className={`mx-auto p-2 rounded-full transition-colors focus:ring-2 focus:outline-none mt-2 ${buttonClass}`} aria-label="Previous strategy">
              <ChevronUp className="w-8 h-8" />
            </button>

            <div className="flex-1 flex flex-col justify-center py-2 text-center">
              <div className="mb-1 text-xs font-bold uppercase tracking-widest opacity-60">Strategy {currentIndex + 1} of {strategies.length}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 px-2 leading-tight">{currentStrategy.title}</h3>
              <div className="mt-auto">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 uppercase tracking-wider ${headerClass}`}>{badge}</span>
                <p className="text-sm opacity-90 leading-snug px-2 line-clamp-3">"...because it {currentStrategy.reason}."</p>
              </div>
            </div>

            <div className="relative flex justify-center items-center mt-2 pb-2">
              <button onClick={() => setIsFlipped(true)} className="absolute left-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity">
                <RotateCw className="w-3.5 h-3.5" /> Details & Video
              </button>
              <button onClick={onNext} className={`p-2 rounded-full transition-colors focus:ring-2 focus:outline-none ${buttonClass}`} aria-label="Next strategy">
                <ChevronDown className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="absolute inset-0 w-full h-full flex flex-col p-5 bg-white bg-opacity-95 backdrop-blur-sm" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="absolute top-0 left-4 right-4 h-3 flex justify-between px-2 -mt-1.5 opacity-20">
              {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-3 bg-black rounded-full shadow-inner"></div>)}
            </div>

            <div className="flex justify-between items-start mb-3 mt-4">
              <h3 className="text-lg font-bold leading-tight pr-2 text-slate-800">{currentStrategy.title}</h3>
              <button onClick={() => setIsFlipped(false)} className="p-1 -mr-2 text-slate-400 hover:text-slate-800 transition-colors" aria-label="Flip back">
                 <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-1 text-slate-700 font-medium">
                <p className="text-sm leading-relaxed mb-4">{currentStrategy.description}</p>
                
                {/* --- VIDEO PLAYER SECTION --- */}
                <div className="mb-4 w-full aspect-video rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-900 relative shadow-sm group">
                  {renderVideoSection()}
                </div>

              </div>
              
              <a href={currentStrategy.docLink} target="_blank" rel="noopener noreferrer" className={`mt-3 w-full shrink-0 inline-flex justify-center items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl transition-all ${headerClass} hover:opacity-90 shadow-sm`}>
                <ExternalLink className="w-4 h-4" /> View in Framework Document
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// MAIN APP
export default function App() {
  const [studentName, setStudentName] = useState("Kai");
  const [clarityIndex, setClarityIndex] = useState(0);
  const [accessIndex, setAccessIndex] = useState(0);
  const [conditionIndex, setConditionIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Default parameters for ELPS 2.0 (falls back to intermediate/beginning defaults for prompt integration)
  const [oralLevel] = useState("Intermediate");
  const [writingLevel] = useState("Beginning");

  // AI State
  const [subject, setSubject] = useState("Reading");
  const [scenario, setScenario] = useState("");
  const [isGeneratingScenario, setIsGeneratingScenario] = useState(false);
  
  const [parentLanguage, setParentLanguage] = useState("Spanish");
  const [emailDraft, setEmailDraft] = useState("");
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);

  const [paraBrief, setParaBrief] = useState("");
  const [isGeneratingPara, setIsGeneratingPara] = useState(false);

  const [iepGoal, setIepGoal] = useState("");
  const [isGeneratingIep, setIsGeneratingIep] = useState(false);

  const [teacherScript, setTeacherScript] = useState("");
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

  const [pivotPlan, setPivotPlan] = useState("");
  const [isGeneratingPivot, setIsGeneratingPivot] = useState(false);

  const [studentSpeech, setStudentSpeech] = useState("");
  const [speechRating, setSpeechRating] = useState("");
  const [isRatingSpeech, setIsRatingSpeech] = useState(false);

  const [studentWriting, setStudentWriting] = useState("");
  const [writingRating, setWritingRating] = useState("");
  const [isRatingWriting, setIsRatingWriting] = useState(false);

  const [observation, setObservation] = useState("");
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendationRationale, setRecommendationRationale] = useState("");

  // Language Acquisition Goal Generator State
  const [targetDomain, setTargetDomain] = useState("Speaking");
  const [currentPldLevel, setCurrentPldLevel] = useState("Beginning");
  const [targetPldLevel, setTargetPldLevel] = useState("Intermediate");
  const [langGoalOutput, setLangGoalOutput] = useState("");
  const [isGeneratingLangGoal, setIsGeneratingLangGoal] = useState(false);

  // Kid-Friendly Objective Translator State
  const [rawElpsStandard, setRawElpsStandard] = useState("");
  const [kidObjectiveTargetLevel, setKidObjectiveTargetLevel] = useState("Intermediate");
  const [translatedKidObjective, setTranslatedKidObjective] = useState("");
  const [isTranslatingKidObjective, setIsTranslatingKidObjective] = useState(false);

  // Inspirational Quote Engine State
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [customEncouragement, setCustomEncouragement] = useState("");
  const [isGeneratingEncouragement, setIsGeneratingEncouragement] = useState(false);

  const handlePrev = (index, setIndex, arrayLength) => {
    setIndex(index === 0 ? arrayLength - 1 : index - 1);
  };

  const handleNext = (index, setIndex, arrayLength) => {
    setIndex(index === arrayLength - 1 ? 0 : index + 1);
  };

  const activeClarity = clarityStrategies[clarityIndex];
  const activeAccess = accessStrategies[accessIndex];
  const activeCondition = conditionStrategies[conditionIndex];

  const generatedStatement = `To help ${studentName || "[student name]"} succeed in this lesson, I am using [clarity] ${activeClarity.title.toLowerCase()} because it ${activeClarity.reason}, using [access] ${activeAccess.title.toLowerCase()} because it ${activeAccess.reason}, and using [conditions] ${activeCondition.title.toLowerCase()} because it ${activeCondition.reason}.`;

  const fetchGemini = async (prompt, systemInstruction = "", isJson = false) => {
    // -------------------------------------------------------------
    // SECURE LOCAL PROXY OVERRIDE MODE ACTIVE
    // -------------------------------------------------------------
    const url = `/api/coach`; 
    const payload = { prompt, systemInstruction };

    let retries = 5;
    let delay = 1000;
    
    while (retries > 0) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        
        if (isJson) {
          try { 
            const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(cleanedText); 
          } catch (e) { return null; }
        }
        return text || "No response generated.";
      } catch (error) {
        retries--;
        if (retries === 0) return isJson ? null : "Error connecting to AI. Please check your network or Vercel configuration.";
        await new Promise(res => setTimeout(res, delay));
        delay *= 2; 
      }
    }
  };

  const handleRecommendStrategies = async () => {
    if (!observation.trim()) return;
    setIsRecommending(true);
    setRecommendationRationale("");
    
    const clarityTitles = clarityStrategies.map(s => s.title).join(", ");
    const accessTitles = accessStrategies.map(s => s.title).join(", ");
    const conditionTitles = conditionStrategies.map(s => s.title).join(", ");
    
    const prompt = `Based on this teacher's observation of an Emergent Bilingual student with Autism (EB-AU):
    Observation of barriers/strengths: "${observation}"
    
    The student's official Texas ELPS 2.0 proficiency levels are:
    - Oral Language (Listening/Speaking): ${oralLevel} (meaning: ${elpsPlds.oral[oralLevel]})
    - Writing Domain: ${writingLevel} (meaning: ${elpsPlds.writing[writingLevel]})
    
    Please analyze their barriers alongside these 5-level linguistic bands and select the ONE best strategy from each of these three lists that addresses their specific barriers.
    Clarity List: ${clarityTitles}
    Access List: ${accessTitles}
    Conditions List: ${conditionTitles}
    
    Return a JSON object with this exact structure:
    {
      "clarityExactTitle": "exact title from the list",
      "accessExactTitle": "exact title from the list",
      "conditionExactTitle": "exact title from the list",
      "rationale": "A warm, brief 2-sentence explanation of why this specific combination of 3 strategies is recommended based on their ELPS 2.0 levels and observation."
    }`;
    
    const result = await fetchGemini(prompt, "You are an expert EB-AU special educator. Respond ONLY with valid JSON.", true);
    
    if (result && result.clarityExactTitle && result.accessExactTitle && result.conditionExactTitle) {
      const cIndex = clarityStrategies.findIndex(s => s.title === result.clarityExactTitle);
      const aIndex = accessStrategies.findIndex(s => s.title === result.accessExactTitle);
      const condIndex = conditionStrategies.findIndex(s => s.title === result.conditionExactTitle);
      
      if (cIndex !== -1) setClarityIndex(cIndex);
      if (aIndex !== -1) setAccessIndex(aIndex);
      if (condIndex !== -1) setConditionIndex(condIndex);
      
      setRecommendationRationale(result.rationale);
    } else {
      setRecommendationRationale("Sorry, I couldn't generate a recommendation right now. Please ensure your Gemini API key is configured correctly in Vercel.");
    }
    setIsRecommending(false);
  };

  const handleGenerateScenario = async () => {
    setIsGeneratingScenario(true);
    setScenario("");
    const prompt = `Generate a short, 3-4 sentence classroom scenario showing a teacher implementing these specific strategies for a student named ${studentName || "the student"} during a ${subject} lesson.
    The student's ELPS 2.0 Levels are: Oral (${oralLevel}), Writing (${writingLevel}).
    
    Strategies:
    1. Clarity: ${activeClarity.title}
    2. Access: ${activeAccess.title}
    3. Conditions: ${activeCondition.title}`;
    
    const result = await fetchGemini(prompt, "You are an expert special education teacher. Provide a highly concrete, practical classroom example demonstrating how these supports align with the student's ELPS 2.0 levels. Do not use conversational filler.");
    setScenario(result);
    setIsGeneratingScenario(false);
  };

  const handleGenerateEmail = async () => {
    setIsGeneratingEmail(true);
    setEmailDraft("");
    const prompt = `Convert this lesson planning statement into a warm, brief email to the student's parents explaining the support strategies we are using: "${generatedStatement}". The student's ELPS 2.0 Levels are Oral: ${oralLevel}, Writing: ${writingLevel}. Write the email in ${parentLanguage}.`;
    
    const result = await fetchGemini(prompt, "You are a warm, collaborative special education teacher writing to a parent. Keep it encouraging, free of dense jargon, and outline the home/school bridge. No subject line needed.");
    setEmailDraft(result);
    setIsGeneratingEmail(false);
  };

  const handleGenerateParaBrief = async () => {
    setIsGeneratingPara(true);
    setParaBrief("");
    const prompt = `Create a brief, bulleted 3-step checklist for a paraprofessional working with ${studentName || "the student"} during a ${subject} lesson. Show them exactly how to implement the following strategies considering the student's ELPS 2.0 language levels (Oral: ${oralLevel}, Writing: ${writingLevel}):
    1. ${activeClarity.title}
    2. ${activeAccess.title}
    3. ${activeCondition.title}`;
    
    const result_text = await fetchGemini(prompt, "You are a lead teacher giving quick, actionable directions to a paraprofessional. Keep it extremely brief and format as a bulleted list. Do not use pleasantries.");
    setParaBrief(result_text);
    setIsGeneratingPara(false);
  };

  const handleGenerateIepGoal = async () => {
    setIsGeneratingIep(true);
    setIepGoal("");
    const prompt = `Draft a measurable SMART IEP goal for ${studentName || "the student"} related to participating in a ${subject} lesson. 
    Context observation of barriers: "${observation || "Student struggles with standard instruction."}"
    Student's ELPS 2.0 Levels: Oral (${oralLevel}), Writing (${writingLevel}).
    Include the use of these selected accommodations in the condition of the goal: 
    1. ${activeClarity.title} 
    2. ${activeAccess.title} 
    3. ${conditionStrategies[conditionIndex].title}`;
    
    const result = await fetchGemini(prompt, "You are an expert special educator. Provide only a single, well-written SMART goal and 2 short objectives referencing language supports. Do not use conversational filler.");
    setIepGoal(result);
    setIsGeneratingIep(false);
  };

  const handleGenerateScript = async () => {
    setIsGeneratingScript(true);
    setTeacherScript("");
    const prompt = `Write the exact script a teacher should say out loud to ${studentName || "the student"} to kick off this ${subject} lesson.
    The student's ELPS 2.0 levels are Oral: ${oralLevel}, Writing: ${writingLevel}.
    The script must explicitly introduce and frame the use of these strategies in a student-friendly way:
    1. ${activeClarity.title}
    2. ${activeAccess.title}
    3. ${activeCondition.title}`;
    
    const result = await fetchGemini(prompt, "You are a warm, encouraging teacher speaking directly to an emergent bilingual student with autism. Provide ONLY the spoken script in simple, direct language adapted to their oral proficiency level.");
    setTeacherScript(result);
    setIsGeneratingScript(false);
  };

  const handleGeneratePivot = async () => {
    setIsGeneratingPivot(true);
    setPivotPlan("");
    const prompt = `If ${studentName || "the student"} still exhibits task refusal or confusion during the ${subject} lesson despite the use of ${activeClarity.title}, ${activeAccess.title}, and ${activeCondition.title}, what are 2 quick, in-the-moment pivot strategies a teacher can try? Adapt these pivots for ELPS 2.0 levels (Oral: ${oralLevel}, Writing: ${writingLevel}).`;
    
    const result = await fetchGemini(prompt, "You are a special education behavior specialist. Provide 2 highly practical, concrete bullet points for a teacher to pivot in the moment. Keep it brief.");
    setPivotPlan(result);
    setIsGeneratingPivot(false);
  };

  const handleRateSpeech = async () => {
    setIsRatingSpeech(true);
    setSpeechRating("");
    const prompt = `Evaluate the following student oral response based on the Texas ELPS 2.0 (English Language Proficiency Standards) Speaking domain.
    Student's response: "${studentSpeech}"
    
    Provide:
    1. Estimated Proficiency Level using the 5-level ELPS 2.0 scale (Pre-Production, Beginning, Intermediate, High Intermediate, or Advanced).
    2. A brief 2-sentence justification referencing ELPS 2.0 descriptors (e.g., vocabulary, syntax, fluency, discourse).
    3. One actionable next step for the teacher to help ${studentName || "the student"} level up.`;
    
    const result = await fetchGemini(prompt, "You are an expert Texas ESL evaluator familiar with ELPS 2.0. Keep your feedback actionable, encouraging, and brief. Format with bold headers.");
    setSpeechRating(result);
    setIsRatingSpeech(false);
  };

  const handleRateWriting = async () => {
    setIsRatingWriting(true);
    setWritingRating("");
    const prompt = `Evaluate the following student written response based on the Texas ELPS 2.0 (English Language Proficiency Standards) Writing domain.
    Student's response: "${studentWriting}"
    
    Provide:
    1. Estimated Proficiency Level using the 5-level ELPS 2.0 scale (Pre-Production, Beginning, Intermediate, High Intermediate, or Advanced).
    2. A brief 2-sentence justification referencing ELPS 2.0 descriptors (e.g., spelling/mechanics, academic vocabulary, syntax complexity, vocabulary variety).
    3. One highly actionable next step or writing scaffold for the teacher to help ${studentName || "the student"} level up their writing.`;
    
    const result = await fetchGemini(prompt, "You are an expert Texas ESL evaluator familiar with ELPS 2.0. Keep your feedback actionable, encouraging, and brief. Format with bold headers.");
    setWritingRating(result);
    setIsRatingWriting(false);
  };

  const handleGenerateLangGoal = async () => {
    setIsGeneratingLangGoal(true);
    setLangGoalOutput("");
    const prompt = `Draft a Texas ELPS 2.0 (English Language Proficiency Standards) aligned Language Acquisition Goal for the emergent bilingual student ${studentName || 'the student'}.
    
    Domain: ${targetDomain}
    Current Level: ${currentPldLevel}
    Target Level: ${targetPldLevel}
    
    Integrate these selected support accommodations in the goal context or implementation steps:
    1. Clarity Support: ${activeClarity.title}
    2. Access Support: ${activeAccess.title}
    3. Conditions Support: ${activeCondition.title}
    
    Format the output cleanly using bold headers as follows:
    1. **ELPS 2.0 Language Acquisition Goal (SMART)**: Write a single, highly measurable linguistic goal targeting the transition from ${currentPldLevel} to ${targetPldLevel} in ${targetDomain}.
    2. **Linguistic Scaffolds**: List 2-3 specific scaffolding moves aligned with the target PLD.
    3. **Progress Monitoring & Assessment Method**: Explain how the teacher will formatively track the acquisition of this goal during ${subject} lessons.`;

    const result = await fetchGemini(prompt, "You are an expert Emergent Bilingual instructional coach specializing in the Texas ELPS 2.0 framework. Provide concrete, actionable goals and clear scaffolding recommendations without conversational filler.");
    setLangGoalOutput(result);
    setIsGeneratingLangGoal(false);
  };

  const handleTranslateObjective = async () => {
    setIsTranslatingKidObjective(true);
    setTranslatedKidObjective("");
    const prompt = `Take the following dense, academic Texas ELPS 2.0 standard or lesson objective and translate it into clear, encouraging, kid-friendly student-facing language.
    
    Official ELPS 2.0 Standard / Objective: "${rawElpsStandard}"
    Target Student Language Proficiency Level: ${kidObjectiveTargetLevel}
    
    Format the output cleanly with bold headers as follows:
    1. **"I Can" Statement**: A friendly, action-oriented statement written so a student at the ${kidObjectiveTargetLevel} proficiency level can read, speak, or understand it. Customize complexity based on this level (extremely visual and simple for Pre-Production/Beginning; increasingly academic for High Intermediate/Advanced).
    2. **My Speech or Writing Helper (Scaffold)**: Provide 1-2 sentence starters or verbal support scripts that directly help the student say or write their objective in the classroom.
    3. **Teacher Checklist Tip**: A 1-sentence tip on how the teacher can display, model, or check this objective with a student who also has autism (e.g., using visual icons, pointing to an anchor chart, or co-signing).`;

    const result = await fetchGemini(prompt, "You are an expert bilingual educator and student coach. Respond with clear, direct, and encouraging child-friendly objective structures adapted strictly to the student's language proficiency level.");
    setTranslatedKidObjective(result);
    setIsTranslatingKidObjective(false);
  };

  const handleGenerateCustomEncouragement = async () => {
    setIsGeneratingEncouragement(true);
    setCustomEncouragement("");
    const prompt = `Write a beautiful, deeply touching, and motivational 2-3 sentence quote or spark of inspiration to encourage a special education teacher today.
    The teacher is currently planning a ${subject} lesson for a student named ${studentName || 'their student'} using:
    - ${activeClarity.title} for Clarity,
    - ${activeAccess.title} for Access,
    - ${activeCondition.title} for Safe Conditions.
    
    Reference how vital, meaningful, and transformative their intentional work is. Keep it highly encouraging, poetic, and affirming.`;

    const result = await fetchGemini(prompt, "You are an inspirational educational leader, a champion of special educators, and a voice of deep gratitude. Speak directly to the teacher's heart.");
    setCustomEncouragement(result);
    setIsGeneratingEncouragement(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedStatement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cycleCuratedQuote = () => {
    setCustomEncouragement(""); 
    setQuoteIndex((prev) => (prev === curatedQuotes.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
      
      {/* --- PROTOTYPE FEEDBACK BUTTON --- */}
      <div className="max-w-6xl mx-auto flex justify-end mb-4">
        <a 
          href="https://forms.gle/Y8WogoGz58VcPmcZA" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full text-sm font-bold transition-colors shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Give Prototype Feedback
        </a>
      </div>

      <header className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-2">
            RBIS-Plus <span className="text-indigo-600">Planner</span>
          </h1>
          <p className="text-slate-600 font-medium">Interactive Framework for EB-AU Learners</p>
        </div>
        <div className="flex flex-col gap-1 w-full md:w-64">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Student Name</label>
          <input 
            type="text" 
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none transition-colors text-slate-700 font-medium"
            placeholder="e.g., Kai"
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">

        {/* --- AI STRATEGY MATCHER COACH --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Brain className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
              <Brain className="w-6 h-6 text-indigo-500" />
              AI Strategy Matcher Coach
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Describe {studentName || "the student"}'s current academic barriers or behavioral struggles. The AI coach will integrate your observations to match the perfect strategy combination.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute top-3 left-3 text-slate-400">
                  <Eye className="w-5 h-5" />
                </div>
                <textarea
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder="e.g., Gets overwhelmed during multi-step reading tasks and shuts down, but loves talking about dinosaurs..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-16 md:h-full transition-shadow"
                />
              </div>
              <button 
                onClick={handleRecommendStrategies}
                disabled={isRecommending || !observation.trim()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white rounded-xl font-bold transition-colors whitespace-nowrap shadow-sm h-full self-stretch"
              >
                {isRecommending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isRecommending ? 'Analyzing...' : 'Find Matches'}
              </button>
            </div>
            
            {recommendationRationale && (
              <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-xl text-sm leading-relaxed font-medium">
                <span className="font-bold mr-2">Why these strategies?</span>
                {recommendationRationale}
              </div>
            )}
          </div>
        </div>

        {/* Flipbook Columns (The Three Drivers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FlipColumn 
            title="CLARITY" subtitle="Make it Visible" badge="RBIS Strategies"
            icon={<Target className="w-6 h-6 text-rose-600" />}
            colorClass="bg-rose-50 border-rose-200" headerClass="bg-rose-600 text-white" buttonClass="hover:bg-rose-100 text-rose-600"
            strategies={clarityStrategies} currentIndex={clarityIndex}
            onPrev={() => handlePrev(clarityIndex, setClarityIndex, clarityStrategies.length)}
            onNext={() => handleNext(clarityIndex, setClarityIndex, clarityStrategies.length)}
          />
          <FlipColumn 
            title="ACCESS" subtitle="Make it Possible" badge="CBLI & Translang."
            icon={<KeyRound className="w-6 h-6 text-amber-600" />}
            colorClass="bg-amber-50 border-amber-200" headerClass="bg-amber-500 text-white" buttonClass="hover:bg-amber-100 text-amber-600"
            strategies={accessStrategies} currentIndex={accessIndex}
            onPrev={() => handlePrev(accessIndex, setAccessIndex, accessStrategies.length)}
            onNext={() => handleNext(accessIndex, setAccessIndex, accessStrategies.length)}
          />
          <FlipColumn 
            title="CONDITIONS" subtitle="Make it Safe" badge="Autism Supplement"
            icon={<Home className="w-6 h-6 text-teal-600" />}
            colorClass="bg-teal-50 border-teal-200" headerClass="bg-teal-600 text-white" buttonClass="hover:bg-teal-100 text-teal-600"
            strategies={conditionStrategies} currentIndex={conditionIndex}
            onPrev={() => handlePrev(conditionIndex, setConditionIndex, conditionStrategies.length)}
            onNext={() => handleNext(conditionIndex, setConditionIndex, conditionStrategies.length)}
          />
        </div>

        {/* --- INSPIRATIONAL QUOTE ENGINE HUB --- */}
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-sm border border-purple-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Quote className="w-32 h-32 text-indigo-300" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 mb-3">
                <Smile className="w-3.5 h-3.5" />
                Teacher Inspiration Hub
              </span>
              <div className="min-h-[96px] flex flex-col justify-center">
                {customEncouragement ? (
                  <p className="text-lg md:text-xl font-medium text-slate-800 italic leading-relaxed">
                    "{customEncouragement}"
                  </p>
                ) : (
                  <p className="text-lg md:text-xl font-medium text-slate-800 italic leading-relaxed">
                    "{curatedQuotes[quoteIndex].text}"
                  </p>
                )}
                <span className="text-sm font-bold text-slate-500 mt-2 block">
                  — {customEncouragement ? `${studentName || 'Your student'}'s AI Coach` : curatedQuotes[quoteIndex].author}
                </span>
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto">
              <button 
                onClick={cycleCuratedQuote} 
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
              >
                <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                Curated Quotes
              </button>
              <button 
                onClick={handleGenerateCustomEncouragement} 
                disabled={isGeneratingEncouragement}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                {isGeneratingEncouragement ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                {isGeneratingEncouragement ? 'Generating...' : 'AI Encourager'}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Statement Output */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="bg-slate-800 p-4 flex justify-between items-center text-white">
            <h2 className="font-bold flex items-center gap-2">Planning Template Statement</h2>
            <button onClick={copyToClipboard} className="flex items-center gap-2 text-sm font-medium bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1.5 rounded-lg transition-colors">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy to Plan'}
            </button>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-lg md:text-xl leading-relaxed text-slate-700">
              To help <span className="font-bold border-b-2 border-indigo-200 pb-0.5">{studentName || "[student name]"}</span> succeed in this lesson, I am using <span className="font-bold text-rose-600 bg-rose-50 px-1 rounded">[clarity] {activeClarity.title.toLowerCase()}</span> because it <span className="italic">{activeClarity.reason}</span>, using <span className="font-bold text-amber-600 bg-amber-50 px-1 rounded">[access] {activeAccess.title.toLowerCase()}</span> because it <span className="italic">{activeAccess.reason}</span>, and using <span className="font-bold text-teal-600 bg-teal-50 px-1 rounded">[conditions] {activeCondition.title.toLowerCase()}</span> because it <span className="italic">{activeCondition.reason}</span>.
            </p>
          </div>
        </div>

        {/* --- AI FEATURES SECTION --- */}
        <div className="mt-8">
          <div className="mb-6 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-500" />
              Gemini Teacher Tools
            </h2>
            <p className="text-slate-600">Dynamically generate support resources based on your selected strategies above.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Tool 1: Scenario Generator */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-indigo-200 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Lesson Scenario</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">Generate a concrete example of these strategies in action.</p>
              
              <div className="flex flex-col gap-3 mb-4 mt-auto">
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="Reading">Reading Lesson</option>
                  <option value="Math">Math Lesson</option>
                  <option value="Science">Science Lesson</option>
                  <option value="Writing">Writing Lesson</option>
                </select>
                <button onClick={handleGenerateScenario} disabled={isGeneratingScenario} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white rounded-lg font-medium transition-colors text-sm">
                  {isGeneratingScenario ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  ✨ Visualize Lesson
                </button>
              </div>
              {scenario && <div className="mt-2 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-slate-800 leading-relaxed">{scenario}</div>}
            </div>

            {/* Tool 2: Multilingual Email Drafter */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-green-200 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Family Comm.</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">Translate this jargon-heavy plan into a warm email to the family.</p>
              
              <div className="flex flex-col gap-3 mb-4 mt-auto">
                <select value={parentLanguage} onChange={(e) => setParentLanguage(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none">
                  <option value="English">Translate to English</option>
                  <option value="Spanish">Translate to Spanish</option>
                  <option value="Vietnamese">Translate to Vietnamese</option>
                  <option value="Arabic">Translate to Arabic</option>
                </select>
                <button onClick={handleGenerateEmail} disabled={isGeneratingEmail} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white rounded-lg font-medium transition-colors text-sm">
                  {isGeneratingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  ✨ Draft Email
                </button>
              </div>
              {emailDraft && <div className="mt-2 bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{emailDraft}</div>}
            </div>

            {/* Tool 3: Paraprofessional Brief */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-amber-200 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Co-Teacher Brief</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">Generate an actionable, 3-step checklist for a paraprofessional.</p>
              
              <div className="flex flex-col gap-3 mb-4 mt-auto">
                <button onClick={handleGenerateParaBrief} disabled={isGeneratingPara} className="w-full mt-10 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white rounded-lg font-medium transition-colors text-sm">
                  {isGeneratingPara ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  ✨ Create Checklist
                </button>
              </div>
              {paraBrief && <div className="mt-2 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{paraBrief}</div>}
            </div>

            {/* Tool 4: IEP Goal Drafter */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">IEP Goal Drafter</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">Draft a SMART goal incorporating these specific accommodations.</p>
              
              <div className="flex flex-col gap-3 mb-4 mt-auto">
                <button onClick={handleGenerateIepGoal} disabled={isGeneratingIep} className="w-full mt-10 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white rounded-lg font-medium transition-colors text-sm">
                  {isGeneratingIep ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  ✨ Draft IEP Goal
                </button>
              </div>
              {iepGoal && <div className="mt-2 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{iepGoal}</div>}
            </div>

            {/* Tool 5: Teacher Script */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-purple-200 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Direct Script</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">Get the exact words to say to introduce these supports to the student.</p>
              
              <div className="flex flex-col gap-3 mb-4 mt-auto">
                <button onClick={handleGenerateScript} disabled={isGeneratingScript} className="w-full mt-10 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white rounded-lg font-medium transition-colors text-sm">
                  {isGeneratingScript ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  ✨ Generate Script
                </button>
              </div>
              {teacherScript && <div className="mt-2 bg-purple-50 border border-purple-100 rounded-xl p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{teacherScript}</div>}
            </div>

            {/* Tool 6: Pivot Plan (Troubleshooter) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-rose-200 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                  <LifeBuoy className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Pivot Plan</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">What if it fails? Get 2 quick pivot strategies to try in the moment.</p>
              
              <div className="flex flex-col gap-3 mb-4 mt-auto">
                <button onClick={handleGeneratePivot} disabled={isGeneratingPivot} className="w-full mt-10 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white rounded-lg font-medium transition-colors text-sm">
                  {isGeneratingPivot ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  ✨ Suggest Pivots
                </button>
              </div>
              {pivotPlan && <div className="mt-2 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{pivotPlan}</div>}
            </div>

            {/* Tool 7: ELPS 2.0 Language Acquisition Goal Generator */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-indigo-200 transition-colors lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">ELPS 2.0 Language Acquisition Goal Generator</h3>
              </div>
              <p className="text-sm text-slate-600 mb-6">Create a linguistic-focused growth goal aligned with the Texas ELPS 2.0 framework, incorporating active support strategies.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Language Domain</label>
                  <select value={targetDomain} onChange={(e) => setTargetDomain(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="Listening">Listening</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Reading">Reading</option>
                    <option value="Writing">Writing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current ELPS 2.0 Level</label>
                  <select value={currentPldLevel} onChange={(e) => setCurrentPldLevel(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="Pre-Production">Pre-Production</option>
                    <option value="Beginning">Beginning</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="High Intermediate">High Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Target ELPS 2.0 Level</label>
                  <select value={targetPldLevel} onChange={(e) => setTargetPldLevel(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="Beginning">Beginning</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="High Intermediate">High Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mb-4">
                <button 
                  onClick={handleGenerateLangGoal} 
                  disabled={isGeneratingLangGoal} 
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white rounded-xl font-bold text-sm transition-all shadow-sm"
                >
                  {isGeneratingLangGoal ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                  ✨ Generate Language Goal
                </button>
              </div>
              
              {langGoalOutput && <div className="mt-2 bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap shadow-inner">{langGoalOutput}</div>}
            </div>

            {/* Tool 8: ELPS 2.0 Student-Friendly Objective Translator */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-rose-200 transition-colors lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                  <Smile className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">ELPS 2.0 Student-Friendly Objective Translator</h3>
              </div>
              <p className="text-sm text-slate-600 mb-6">Type or paste any dense academic ELPS 2.0 standard or lesson objective. This tool translates it into clear, encouraging "I Can" language adapted specifically for your student's proficiency level.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Official Standard / Academic Objective</label>
                  <textarea
                    value={rawElpsStandard}
                    onChange={(e) => setRawElpsStandard(e.target.value)}
                    placeholder="e.g., ELPS 2.2.C: Express opinions, ideas, and feelings using increasingly complex language structures..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none resize-none h-16 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Target Proficiency Level</label>
                  <select 
                    value={kidObjectiveTargetLevel} 
                    onChange={(e) => setKidObjectiveTargetLevel(e.target.value)} 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                  >
                    <option value="Pre-Production">Pre-Production</option>
                    <option value="Beginning">Beginning</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="High Intermediate">High Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mb-4">
                <button 
                  onClick={handleTranslateObjective} 
                  disabled={isTranslatingKidObjective || !rawElpsStandard.trim()} 
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-70 text-white rounded-xl font-bold text-sm transition-all shadow-sm"
                >
                  {isTranslatingKidObjective ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  ✨ Translate to Student-Friendly Language
                </button>
              </div>
              
              {translatedKidObjective && <div className="mt-2 bg-rose-50 border border-rose-100 rounded-xl p-6 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap shadow-inner">{translatedKidObjective}</div>}
            </div>

            {/* Tool 9: ELPS 2.0 Oral Language Rater */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-cyan-200 transition-colors lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                  <Mic className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">ELPS 2.0 Oral Language Rater</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">Type a transcript of the student's spoken answer. Gemini will rate their proficiency using TEA's ELPS 2.0 Speaking descriptors.</p>
              
              <div className="flex flex-col md:flex-row gap-4 mb-4 mt-auto">
                <textarea
                  value={studentSpeech}
                  onChange={(e) => setStudentSpeech(e.target.value)}
                  placeholder="e.g., 'The boy... he go to the store and buy apple because he hungry.'"
                  className="w-full flex-1 px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none h-24 shadow-inner"
                />
                <button 
                  onClick={handleRateSpeech} 
                  disabled={isRatingSpeech || !studentSpeech.trim()} 
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-70 text-white rounded-xl font-bold transition-colors shadow-sm whitespace-nowrap h-12 md:h-auto"
                >
                  {isRatingSpeech ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  ✨ Rate Speech
                </button>
              </div>
              {speechRating && <div className="mt-2 bg-cyan-50 border border-cyan-100 rounded-xl p-6 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{speechRating}</div>}
            </div>

            {/* Tool 10: ELPS 2.0 Writing Language Rater */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-emerald-200 transition-colors lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <PenTool className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">ELPS 2.0 Writing Language Rater</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">Type or paste a sample of the student's written response. Gemini will rate their writing level (Pre-Production, Beginning, Intermediate, High Intermediate, Advanced) using Texas ELPS 2.0 descriptors.</p>
              
              <div className="flex flex-col md:flex-row gap-4 mb-4 mt-auto">
                <textarea
                  value={studentWriting}
                  onChange={(e) => setStudentWriting(e.target.value)}
                  placeholder="e.g., 'The boy went to the stor for buy apple. He was very hungry so he eat it fast.'"
                  className="w-full flex-1 px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none h-24 shadow-inner"
                />
                <button 
                  onClick={handleRateWriting} 
                  disabled={isRatingWriting || !studentWriting.trim()} 
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white rounded-xl font-bold transition-colors shadow-sm whitespace-nowrap h-12 md:h-auto"
                >
                  {isRatingWriting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  ✨ Rate Writing
                </button>
              </div>
              {writingRating && <div className="mt-2 bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{writingRating}</div>}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
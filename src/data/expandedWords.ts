import { Word } from "./types";

export const expandedWords: Word[] = [
    // 1. CEPT (Take/Seize - 取る)
    {
        id: "precept",
        word: "Precept",
        meaning: { en: "A general rule intended to regulate behavior or thought.", ja: "行動や思考を規制するための一般的な規則（処世訓）。" },
        history: { en: "From 'pre-' (before) + 'cept' (taken). A rule taken beforehand.", ja: "'pre-' (前に) + 'cept' (取られた) に由来。前もって受け入れられた規則。" },
        blocks: [{ id: "pre", label: "Pre-", meaning: { en: "Before", ja: "前に" }, type: "prefix" }, { id: "cept", label: "Cept", meaning: { en: "Take", ja: "取る" }, type: "root" }],
        icon: "Scroll",
        timeline: [
            {
                year: "4500 BC",
                language: "Proto-Indo-European",
                word: "*Kap-",
                meaning: { en: "To grasp", ja: "掴む" },
                description: { en: "The ancient root describing the physical act of grabbing something.", ja: "何かを掴むという物理的な行為を表す古代の語根。" }
            },
            {
                year: "100 BC",
                language: "Latin",
                word: "Praecipere",
                meaning: { en: "To take beforehand / warn", ja: "前もって取る / 警告する" },
                description: { en: "Used by Roman commanders to give orders or warnings before an event.", ja: "ローマの指揮官がイベントの前に命令や警告を与えるために使用。" }
            },
            {
                year: "1300 AD",
                language: "Old French",
                word: "Precept",
                meaning: { en: "Injunction", ja: "命令" },
                description: { en: "Entered English via the Church and Law, referring to a commandment.", ja: "教会や法律を通じて英語に入り、戒律を指す。" }
            },
            {
                year: "Modern",
                language: "English",
                word: "Precept",
                meaning: { en: "Guiding Principle", ja: "指導原理" },
                description: { en: "Now strictly mental: a rule you 'take beforehand' to guide your life.", ja: "現在は厳密に精神的なもの：人生を導くために「前もって取る」規則。" }
            }
        ],
        bossChallenges: [
            {
                level: "Pre-2",
                word: "Accept",
                question: { en: "Based on 'Cept' (Take), what does 'Accept' mean?", ja: "'Cept' (取る) に基づくと、'Accept' はどういう意味？" },
                options: [{ en: "To take to oneself (Receive)", ja: "自分の方へ取る (受け取る)" }, { en: "To give away", ja: "手放す" }, { en: "To write down", ja: "書き留める" }],
                answer: "To take to oneself (Receive)"
            },
            {
                level: "2",
                word: "Exception",
                question: { en: "If 'Ex-' means 'Out', what is an 'Exception'?", ja: "'Ex-' が「外へ」を意味するなら、'Exception' とは？" },
                options: [{ en: "Something taken out", ja: "取り除かれたもの (例外)" }, { en: "Something held back", ja: "引き止められたもの" }, { en: "Something written poorly", ja: "下手に書かれたもの" }],
                answer: "Something taken out"
            },
            {
                level: "Pre-1",
                word: "Deceptive",
                question: { en: "If 'De-' means 'Away' (negatively), what is 'Deceptive'?", ja: "'De-' が「離れて (否定的に)」を意味するなら、'Deceptive' とは？" },
                options: [{ en: "Taking away the truth (Misleading)", ja: "真実を奪う (欺く)" }, { en: "Giving help", ja: "助けを与える" }, { en: "Standing firm", ja: "断固とする" }],
                answer: "Taking away the truth (Misleading)"
            },
            {
                level: "1",
                word: "Imperceptible",
                question: { en: "This one is hard. 'Im-' (Not) + 'Per' (Through) + 'Cept' (Take). What is it?", ja: "難問です。'Im-' (不) + 'Per' (通して) + 'Cept' (取る)。これは何？" },
                options: [{ en: "Cannot be 'taken' by the senses (Unnoticeable)", ja: "感覚で「取れ」ない (感知できない)" }, { en: "Very obvious", ja: "非常に明白" }, { en: "Highly efficient", ja: "非常に効率的" }],
                answer: "Cannot be 'taken' by the senses (Unnoticeable)"
            }
        ]
    },
    {
        id: "accept",
        word: "Accept",
        meaning: { en: "To consent to receive.", ja: "受け取ることに同意する。" },
        history: { en: "From 'ad-' (to) + 'cept' (take). To take to oneself.", ja: "'ad-' (〜へ) + 'cept' (取る) に由来。自分の方へ取る（受け入れる）。" },
        blocks: [{ id: "ac", label: "Ac-", meaning: { en: "To", ja: "〜へ" }, type: "prefix" }, { id: "cept", label: "Cept", meaning: { en: "Take", ja: "取る" }, type: "root" }],
        icon: "CheckCircle"
    },
    {
        id: "concept",
        word: "Concept",
        meaning: { en: "An abstract idea.", ja: "抽象的な考え（概念）。" },
        history: { en: "From 'con-' (together) + 'cept' (taken). Something taken/held together in the mind.", ja: "'con-' (共に) + 'cept' (取られた) に由来。心の中で共に保持されたもの。" },
        blocks: [{ id: "con", label: "Con-", meaning: { en: "Together", ja: "共に" }, type: "prefix" }, { id: "cept", label: "Cept", meaning: { en: "Take", ja: "取る" }, type: "root" }],
        icon: "Lightbulb"
    },

    // 2. TAIN (Hold - 保つ)
    {
        id: "detain",
        word: "Detain",
        meaning: { en: "Keep (someone) from proceeding; hold back.", ja: "（誰かを）進行させないようにする、引き留める。" },
        history: { en: "From 'de-' (away) + 'tain' (hold). To hold away or keep back.", ja: "'de-' (離れて) + 'tain' (保つ) に由来。引き離して保つ（拘留する）。" },
        blocks: [{ id: "de", label: "De-", meaning: { en: "Away/Down", ja: "離れて/下へ" }, type: "prefix" }, { id: "tain", label: "Tain", meaning: { en: "Hold", ja: "保つ" }, type: "root" }],
        icon: "Lock",
        timeline: [
            {
                year: "4500 BC",
                language: "Proto-Indo-European",
                word: "*Ten-",
                meaning: { en: "To stretch / hold", ja: "伸ばす / 保つ" },
                description: { en: "The root of tension, tendon, and holding firm.", ja: "緊張(tension)、腱(tendon)、しっかり保つことの語根。" }
            },
            {
                year: "100 BC",
                language: "Latin",
                word: "Detineo",
                meaning: { en: "To hold off / keep back", ja: "引き留める" },
                description: { en: "De- (Away) + Tene (Hold). Keeping something away from its path.", ja: "De- (離れて) + Tene (保つ)。何かを進路から遠ざけておく。" }
            },
            {
                year: "1500 AD",
                language: "Legal English",
                word: "Detain",
                meaning: { en: "To keep in custody", ja: "拘留する" },
                description: { en: "Became a specific legal term for holding a prisoner.", ja: "囚人を拘束するための特定の法的用語となった。" }
            }
        ]
    },
    {
        id: "contain",
        word: "Contain",
        meaning: { en: "To have or hold within.", ja: "内部に持つ、含む。" },
        history: { en: "From 'con-' (together) + 'tain' (hold). To hold together.", ja: "'con-' (共に) + 'tain' (保つ) に由来。共に保つ（包含する）。" },
        blocks: [{ id: "con", label: "Con-", meaning: { en: "Together", ja: "共に" }, type: "prefix" }, { id: "tain", label: "Tain", meaning: { en: "Hold", ja: "保つ" }, type: "root" }],
        icon: "Box"
    },
    {
        id: "maintain",
        word: "Maintain",
        meaning: { en: "To cause or enable a condition to continue.", ja: "状態を持続させる、維持する。" },
        history: { en: "From 'main' (hand) + 'tain' (hold). To hold in hand.", ja: "'main' (手) + 'tain' (保つ) に由来。手で保つ（維持する）。" },
        blocks: [{ id: "main", label: "Main", meaning: { en: "Hand", ja: "手" }, type: "prefix" }, { id: "tain", label: "Tain", meaning: { en: "Hold", ja: "保つ" }, type: "root" }],
        icon: "Wrench"
    },

    // 3. MIT (Send/Throw - 送る)
    {
        id: "intermittent",
        word: "Intermittent",
        meaning: { en: "Occurring at irregular intervals; not continuous or steady.", ja: "不規則な間隔で起こる、断続的な。" },
        history: { en: "From 'inter-' (between) + 'mit' (send). Sent between intervals.", ja: "'inter-' (間に) + 'mit' (送る) に由来。間隔を置いて送られる。" },
        blocks: [{ id: "inter", label: "Inter-", meaning: { en: "Between", ja: "間に" }, type: "prefix" }, { id: "mit", label: "Mit", meaning: { en: "Send", ja: "送る" }, type: "root" }],
        icon: "Activity"
    },
    {
        id: "submit",
        word: "Submit",
        meaning: { en: "Accept or yield to a superior force.", ja: "優れた力に屈する、または受け入れる。" },
        history: { en: "From 'sub-' (under) + 'mit' (send). To send oneself under.", ja: "'sub-' (下に) + 'mit' (送る) に由来。自分を下に送る（服従する/提出する）。" },
        blocks: [{ id: "sub", label: "Sub-", meaning: { en: "Under", ja: "下に" }, type: "prefix" }, { id: "mit", label: "Mit", meaning: { en: "Send", ja: "送る" }, type: "root" }],
        icon: "CornerDownRight"
    },
    {
        id: "transmit",
        word: "Transmit",
        meaning: { en: "Cause (something) to pass on from one place or person to another.", ja: "（何かを）ある場所や人から別の場所や人へ送る。" },
        history: { en: "From 'trans-' (across) + 'mit' (send). To send across.", ja: "'trans-' (横切って) + 'mit' (送る) に由来。向こう側へ送る（送信する）。" },
        blocks: [{ id: "trans", label: "Trans-", meaning: { en: "Across", ja: "横切って" }, type: "prefix" }, { id: "mit", label: "Mit", meaning: { en: "Send", ja: "送る" }, type: "root" }],
        icon: "Radio"
    },

    // 4. FER (Carry - 運ぶ)
    {
        id: "offer",
        word: "Offer",
        meaning: { en: "Present or proffer (something) for (someone) to accept or reject.", ja: "（誰かに）受け入れるか拒否するかを選択させるために（何かを）提示する。" },
        history: { en: "From 'ob-' (towards) + 'fer' (carry). To carry towards someone.", ja: "'ob-' (〜の方へ) + 'fer' (運ぶ) に由来。誰かの方へ運ぶ（提供する）。" },
        blocks: [{ id: "of", label: "Of-", meaning: { en: "Towards (from Ob-)", ja: "〜の方へ" }, type: "prefix" }, { id: "fer", label: "Fer", meaning: { en: "Carry", ja: "運ぶ" }, type: "root" }],
        icon: "Gift"
    },
    {
        id: "transfer",
        word: "Transfer",
        meaning: { en: "Move from one place to another.", ja: "ある場所から別の場所へ移動する。" },
        history: { en: "From 'trans-' (across) + 'fer' (carry). To carry across.", ja: "'trans-' (横切って) + 'fer' (運ぶ) に由来。向こう側へ運ぶ（移動する）。" },
        blocks: [{ id: "trans", label: "Trans-", meaning: { en: "Across", ja: "横切って" }, type: "prefix" }, { id: "fer", label: "Fer", meaning: { en: "Carry", ja: "運ぶ" }, type: "root" }],
        icon: "ArrowRightLeft"
    },
    {
        id: "conifer",
        word: "Conifer",
        meaning: { en: "A tree that bears cones.", ja: "球果（松ぼっくりなど）をつける木。" },
        history: { en: "From 'conus' (cone) + 'fer' (carry). Cone-carrying.", ja: "'conus' (円錐) + 'fer' (運ぶ) に由来。球果を運ぶもの（針葉樹）。" },
        blocks: [{ id: "coni", label: "Coni", meaning: { en: "Cone", ja: "円錐" }, type: "prefix" }, { id: "fer", label: "Fer", meaning: { en: "Carry", ja: "運ぶ" }, type: "root" }],
        icon: "TreePine"
    },

    // 5. SIST (Stand - 立つ)
    {
        id: "insist",
        word: "Insist",
        meaning: { en: "Demand something forcefully, not accepting refusal.", ja: "拒否を受け入れず、強く要求する。" },
        history: { en: "From 'in-' (on/in) + 'sist' (stand). To stand on (your ground).", ja: "'in-' (上に) + 'sist' (立つ) に由来。（自分の立場に）立ち続ける（主張する）。" },
        blocks: [{ id: "in", label: "In-", meaning: { en: "On", ja: "上に" }, type: "prefix" }, { id: "sist", label: "Sist", meaning: { en: "Stand", ja: "立つ" }, type: "root" }],
        icon: "AlertCircle"
    },
    {
        id: "persist",
        word: "Persist",
        meaning: { en: "Continue firmly in an opinion or a course of action.", ja: "意見や行動方針を固く守り続ける。" },
        history: { en: "From 'per-' (through) + 'sist' (stand). To stand through difficulties.", ja: "'per-' (通して) + 'sist' (立つ) に由来。困難を通して立ち続ける（固執する/持続する）。" },
        blocks: [{ id: "per", label: "Per-", meaning: { en: "Through", ja: "通して" }, type: "prefix" }, { id: "sist", label: "Sist", meaning: { en: "Stand", ja: "立つ" }, type: "root" }],
        icon: "TrendingUp"
    },
    {
        id: "assist",
        word: "Assist",
        meaning: { en: "Help (someone), typically by doing a share of the work.", ja: "（誰かを）手伝う、通常は仕事の一部を分担することによって。" },
        history: { en: "From 'ad-' (to) + 'sist' (stand). To stand by/near someone to help.", ja: "'ad-' (〜へ) + 'sist' (立つ) に由来。助けるために誰かのそばに立つ（支援する）。" },
        blocks: [{ id: "as", label: "As-", meaning: { en: "To/Near (from Ad-)", ja: "〜へ/近くに" }, type: "prefix" }, { id: "sist", label: "Sist", meaning: { en: "Stand", ja: "立つ" }, type: "root" }],
        icon: "HelpingHand"
    },

    // 6. GRAPH (Write - 書く)
    {
        id: "monograph",
        word: "Monograph",
        meaning: { en: "A detailed written study of a single specialized subject.", ja: "単一の専門的な主題に関する詳細な書面による研究（研究論文）。" },
        history: { en: "From 'mono-' (one) + 'graph' (write). Writing on one subject.", ja: "'mono-' (1つ) + 'graph' (書く) に由来。1つの主題について書くこと。" },
        blocks: [{ id: "mono", label: "Mono-", meaning: { en: "One", ja: "1つ" }, type: "prefix" }, { id: "graph", label: "Graph", meaning: { en: "Write", ja: "書く" }, type: "root" }],
        icon: "BookOpen"
    },
    {
        id: "autograph",
        word: "Autograph",
        meaning: { en: "A signature, especially that of a celebrity.", ja: "署名、特に有名人のサイン。" },
        history: { en: "From 'auto-' (self) + 'graph' (write). Self-written.", ja: "'auto-' (自身) + 'graph' (書く) に由来。自分で書いたもの。" },
        blocks: [{ id: "auto", label: "Auto-", meaning: { en: "Self", ja: "自身" }, type: "prefix" }, { id: "graph", label: "Graph", meaning: { en: "Write", ja: "書く" }, type: "root" }],
        icon: "Pen"
    },
    {
        id: "telegraph",
        word: "Telegraph",
        meaning: { en: "A system for transmitting messages from a distance.", ja: "遠距離からメッセージを送信するシステム（電報）。" },
        history: { en: "From 'tele-' (far) + 'graph' (write). Writing from afar.", ja: "'tele-' (遠く) + 'graph' (書く) に由来。遠くから書くこと。" },
        blocks: [{ id: "tele", label: "Tele-", meaning: { en: "Far", ja: "遠く" }, type: "prefix" }, { id: "graph", label: "Graph", meaning: { en: "Write", ja: "書く" }, type: "root" }],
        icon: "RadioReceiver"
    },

    // 7. LOG (Word/Study - 言葉)
    {
        id: "epilogue",
        word: "Epilogue",
        meaning: { en: "A section or speech at the end of a book or play.", ja: "本や劇の終わりの部分やスピーチ（結びの言葉）。" },
        history: { en: "From 'epi-' (upon/after) + 'log' (word). Words added after.", ja: "'epi-' (〜の上に/後に) + 'log' (言葉) に由来。後に追加された言葉。" },
        blocks: [{ id: "epi", label: "Epi-", meaning: { en: "Upon/End", ja: "〜の上に/終わり" }, type: "prefix" }, { id: "log", label: "Log", meaning: { en: "Word", ja: "言葉" }, type: "root" }],
        icon: "Book"
    },
    {
        id: "dialogue",
        word: "Dialogue",
        meaning: { en: "Conversation between two or more people.", ja: "2人以上の人々の間の会話（対話）。" },
        history: { en: "From 'dia-' (across) + 'log' (word). Words across people.", ja: "'dia-' (横切って) + 'log' (言葉) に由来。人々の間を行き交う言葉。" },
        blocks: [{ id: "dia", label: "Dia-", meaning: { en: "Across", ja: "横切って" }, type: "prefix" }, { id: "log", label: "Log", meaning: { en: "Word", ja: "言葉" }, type: "root" }],
        icon: "MessageCircle"
    },
    {
        id: "logic",
        word: "Logic",
        meaning: { en: "Reasoning conducted or assessed according to strict principles.", ja: "厳密な原則に従って行われる、または評価される推論（論理）。" },
        history: { en: "From 'log' (word/reason). The art of reasoning.", ja: "'log' (言葉/理性) に由来。推論の技術。" },
        blocks: [{ id: "log", label: "Log", meaning: { en: "Reason", ja: "理性" }, type: "root" }, { id: "ic", label: "-ic", meaning: { en: "Nature of", ja: "〜の性質" }, type: "suffix" }],
        icon: "Brain"
    },

    // 8. SPECT (Look - 見る)
    {
        id: "aspect",
        word: "Aspect",
        meaning: { en: "A particular part or feature of something.", ja: "何かの特定の部分や特徴（側面）。" },
        history: { en: "From 'ad-' (to) + 'spect' (look). The way something is looked at.", ja: "'ad-' (〜へ) + 'spect' (見る) に由来。何かがどのように見られるか。" },
        blocks: [{ id: "a", label: "A-", meaning: { en: "To (from Ad-)", ja: "〜へ" }, type: "prefix" }, { id: "spect", label: "Spect", meaning: { en: "Look", ja: "見る" }, type: "root" }],
        icon: "Eye"
    },
    {
        id: "inspect",
        word: "Inspect",
        meaning: { en: "To look into closely.", ja: "詳しく調べる（検査する）。" },
        history: { en: "From 'in-' (into) + 'spect' (look). To look into.", ja: "'in-' (中へ) + 'spect' (見る) に由来。中を見る。" },
        blocks: [{ id: "in", label: "In-", meaning: { en: "Into", ja: "中へ" }, type: "prefix" }, { id: "spect", label: "Spect", meaning: { en: "Look", ja: "見る" }, type: "root" }],
        icon: "Search"
    },
    {
        id: "spectacle",
        word: "Spectacle",
        meaning: { en: "A visually striking performance or display.", ja: "視覚的に印象的なパフォーマンスや展示（光景）。" },
        history: { en: "From 'spect' (look). Something purely for looking at.", ja: "'spect' (見る) に由来。純粋に見るためのもの。" },
        blocks: [{ id: "spect", label: "Spect", meaning: { en: "Look", ja: "見る" }, type: "root" }, { id: "acle", label: "-acle", meaning: { en: "Thing", ja: "もの" }, type: "suffix" }],
        icon: "Glasses"
    },

    // 9. PLY (Fold - 折る)
    {
        id: "uncomplicated",
        word: "Uncomplicated",
        meaning: { en: "Simple and straightforward.", ja: "単純でわかりやすい。" },
        history: { en: "From 'un-' (not) + 'com-' (together) + 'ply' (fold). Not folded together.", ja: "'un-' (不) + 'com-' (共に) + 'ply' (折る) に由来。共に折り重なっていない（複雑でない）。" },
        blocks: [{ id: "un", label: "Un-", meaning: { en: "Not", ja: "不" }, type: "prefix" }, { id: "com", label: "Com-", meaning: { en: "Together", ja: "共に" }, type: "prefix" }, { id: "ply", label: "Ply", meaning: { en: "Fold", ja: "折る" }, type: "root" }],
        icon: "Circle"
    },
    {
        id: "reply",
        word: "Reply",
        meaning: { en: "Say something in response to something someone has said.", ja: "誰かが言ったことに対して何かを言う（返信する）。" },
        history: { en: "From 're-' (back) + 'ply' (fold). To fold back (an answer).", ja: "'re-' (後ろへ) + 'ply' (折る) に由来。（答えを）折り返す。" },
        blocks: [{ id: "re", label: "Re-", meaning: { en: "Back", ja: "後ろへ" }, type: "prefix" }, { id: "ply", label: "Ply", meaning: { en: "Fold", ja: "折る" }, type: "root" }],
        icon: "MessageSquare"
    },
    {
        id: "multiply",
        word: "Multiply",
        meaning: { en: "Increase or cause to increase greatly in number or quantity.", ja: "数や量を大幅に増やす（掛ける）。" },
        history: { en: "From 'multi-' (many) + 'ply' (fold). To fold many times.", ja: "'multi-' (多くの) + 'ply' (折る) に由来。何度も折る（増やす）。" },
        blocks: [{ id: "multi", label: "Multi-", meaning: { en: "Many", ja: "多くの" }, type: "prefix" }, { id: "ply", label: "Ply", meaning: { en: "Fold", ja: "折る" }, type: "root" }],
        icon: "X"
    },

    // 10. TEND (Stretch - 伸ばす)
    {
        id: "nonextended",
        word: "Nonextended",
        meaning: { en: "Not stretched out or prolonged.", ja: "引き伸ばされていない、延長されていない。" },
        history: { en: "From 'non-' (not) + 'ex-' (out) + 'tend' (stretch). Not stretched out.", ja: "'non-' (不) + 'ex-' (外へ) + 'tend' (伸ばす) に由来。外へ伸ばされていない。" },
        blocks: [{ id: "non", label: "Non-", meaning: { en: "Not", ja: "不" }, type: "prefix" }, { id: "ex", label: "Ex-", meaning: { en: "Out", ja: "外へ" }, type: "prefix" }, { id: "tend", label: "Tend", meaning: { en: "Stretch", ja: "伸ばす" }, type: "root" }],
        icon: "Minimize"
    },
    {
        id: "extend",
        word: "Extend",
        meaning: { en: "Cause to cover a larger area; make longer or wider.", ja: "より広い範囲をカバーさせる、長くする、または広くする（拡張する）。" },
        history: { en: "From 'ex-' (out) + 'tend' (stretch). To stretch out.", ja: "'ex-' (外へ) + 'tend' (伸ばす) に由来。外へ伸ばす。" },
        blocks: [{ id: "ex", label: "Ex-", meaning: { en: "Out", ja: "外へ" }, type: "prefix" }, { id: "tend", label: "Tend", meaning: { en: "Stretch", ja: "伸ばす" }, type: "root" }],
        icon: "Maximize"
    },
    {
        id: "attend",
        word: "Attend",
        meaning: { en: "Be present at (an event, meeting, or function).", ja: "（イベント、会議、または機能に）出席する。" },
        history: { en: "From 'ad-' (to) + 'tend' (stretch). To stretch one's mind/presence towards.", ja: "'ad-' (〜へ) + 'tend' (伸ばす) に由来。心や存在を〜へ向けて伸ばす。" },
        blocks: [{ id: "at", label: "At-", meaning: { en: "To (from Ad-)", ja: "〜へ" }, type: "prefix" }, { id: "tend", label: "Tend", meaning: { en: "Stretch", ja: "伸ばす" }, type: "root" }],
        icon: "UserCheck"
    },

    // 11. DUCT (Lead - 導く)
    {
        id: "reproduction",
        word: "Reproduction",
        meaning: { en: "The action or process of making a copy of something.", ja: "何かのコピーを作る行為またはプロセス（再生/複製）。" },
        history: { en: "From 're-' (again) + 'pro-' (forward) + 'duct' (lead). Leading forward again.", ja: "'re-' (再び) + 'pro-' (前方へ) + 'duct' (導く) に由来。再び前方へ導くこと。" },
        blocks: [{ id: "re", label: "Re-", meaning: { en: "Again", ja: "再び" }, type: "prefix" }, { id: "pro", label: "Pro-", meaning: { en: "Forward", ja: "前方へ" }, type: "prefix" }, { id: "duct", label: "Duct", meaning: { en: "Lead", ja: "導く" }, type: "root" }],
        icon: "Copy"
    },
    {
        id: "conduct",
        word: "Conduct",
        meaning: { en: "Organize and carry out.", ja: "組織して実行する（実施する/指揮する）。" },
        history: { en: "From 'con-' (together) + 'duct' (lead). To lead together.", ja: "'con-' (共に) + 'duct' (導く) に由来。共に導くこと。" },
        blocks: [{ id: "con", label: "Con-", meaning: { en: "Together", ja: "共に" }, type: "prefix" }, { id: "duct", label: "Duct", meaning: { en: "Lead", ja: "導く" }, type: "root" }],
        icon: "Gavel"
    },
    {
        id: "introduce",
        word: "Introduce",
        meaning: { en: "Bring (something, especially a product, measure, or concept) into use or operation for the first time.", ja: "（特に製品、手段、または概念を）初めて使用または運用に持ち込む（紹介する）。" },
        history: { en: "From 'intro-' (inward) + 'duce' (lead). To lead inside.", ja: "'intro-' (内側へ) + 'duce' (導く) に由来。内側へ導くこと。" },
        blocks: [{ id: "intro", label: "Intro-", meaning: { en: "Inward", ja: "内側へ" }, type: "prefix" }, { id: "duce", label: "Duce", meaning: { en: "Lead", ja: "導く" }, type: "root" }],
        icon: "UserPlus"
    },

    // 12. POSE (Put/Place - 置く)
    {
        id: "indisposed",
        word: "Indisposed",
        meaning: { en: "Slightly unwell; unwilling.", ja: "少し気分が悪い、気が進まない。" },
        history: { en: "From 'in-' (not) + 'dis-' (away) + 'pose' (put). Not placed correctly (mood/health).", ja: "'in-' (不) + 'dis-' (離れて) + 'pose' (置く) に由来。正しく置かれていない（気分/健康）。" },
        blocks: [{ id: "in", label: "In-", meaning: { en: "Not", ja: "不" }, type: "prefix" }, { id: "dis", label: "Dis-", meaning: { en: "Away", ja: "離れて" }, type: "prefix" }, { id: "pose", label: "Pose", meaning: { en: "Put", ja: "置く" }, type: "root" }],
        icon: "Frown"
    },
    {
        id: "compose",
        word: "Compose",
        meaning: { en: "Write or create (a work of art, especially music or poetry).", ja: "（芸術作品、特に音楽や詩を）書く、または創作する（構成する）。" },
        history: { en: "From 'com-' (together) + 'pose' (put). To put together.", ja: "'com-' (共に) + 'pose' (置く) に由来。共に置くこと。" },
        blocks: [{ id: "com", label: "Com-", meaning: { en: "Together", ja: "共に" }, type: "prefix" }, { id: "pose", label: "Pose", meaning: { en: "Put", ja: "置く" }, type: "root" }],
        icon: "Edit3"
    },
    {
        id: "oppose",
        word: "Oppose",
        meaning: { en: "Disapprove of and attempt to prevent, especially by argument.", ja: "特に議論によって、不承認とし、阻止しようとする（反対する）。" },
        history: { en: "From 'ob-' (against) + 'pose' (put). To place against.", ja: "'ob-' (反対して) + 'pose' (置く) に由来。反対して置くこと。" },
        blocks: [{ id: "op", label: "Op-", meaning: { en: "Against (from Ob-)", ja: "反対して" }, type: "prefix" }, { id: "pose", label: "Pose", meaning: { en: "Put", ja: "置く" }, type: "root" }],
        icon: "Shield"
    },

    // 13. FIC (Make/Do - 作る)
    {
        id: "oversufficient",
        word: "Oversufficient",
        meaning: { en: "More than enough; excessive.", ja: "十分すぎる、過剰な。" },
        history: { en: "From 'over-' (excess) + 'sub-' (under) + 'fic' (make). Made over-under? (Complex).", ja: "'over-' (過剰) + 'sub-' (下) + 'fic' (作る) に由来。過剰に作られた？（複雑）。" },
        blocks: [{ id: "over", label: "Over-", meaning: { en: "Excess", ja: "過剰" }, type: "prefix" }, { id: "suf", label: "Suf-", meaning: { en: "Under/Up (from Sub-)", ja: "下/上" }, type: "prefix" }, { id: "fic", label: "Fic", meaning: { en: "Make", ja: "作る" }, type: "root" }],
        icon: "MoreHorizontal"
    },
    {
        id: "fiction",
        word: "Fiction",
        meaning: { en: "Literature in the form of prose, especially short stories and novels, that describes imaginary events and people.", ja: "架空の出来事や人々を描写する、特に短編小説や小説の形式の文学（フィクション）。" },
        history: { en: "From 'fic' (make). Something made up.", ja: "'fic' (作る) に由来。作り上げられたもの。" },
        blocks: [{ id: "fict", label: "Fict", meaning: { en: "Make", ja: "作る" }, type: "root" }, { id: "ion", label: "-ion", meaning: { en: "State", ja: "状態" }, type: "suffix" }],
        icon: "BookKey"
    },
    {
        id: "efficient",
        word: "Efficient",
        meaning: { en: "(especially of a system or machine) achieving maximum productivity with minimum wasted effort or expense.", ja: "（特にシステムや機械が）最小限の無駄な労力や費用で最大の生産性を達成すること（効率的な）。" },
        history: { en: "From 'ex-' (out) + 'fic' (make). Working out well.", ja: "'ex-' (外へ) + 'fic' (作る) に由来。うまく機能すること。" },
        blocks: [{ id: "ef", label: "Ef-", meaning: { en: "Out (from Ex-)", ja: "外へ" }, type: "prefix" }, { id: "fic", label: "Fic", meaning: { en: "Make", ja: "作る" }, type: "root" }],
        icon: "Zap"
    },

    // 14. SCRIBE (Write - 書く)
    {
        id: "mistranscribe",
        word: "Mistranscribe",
        meaning: { en: "To transcribe incorrectly.", ja: "不正確に書き写す（書き損じる）。" },
        history: { en: "From 'mis-' (wrong) + 'trans-' (across) + 'scribe' (write). To write across wrongly.", ja: "'mis-' (誤って) + 'trans-' (横切って) + 'scribe' (書く) に由来。誤って書き写すこと。" },
        blocks: [{ id: "mis", label: "Mis-", meaning: { en: "Wrong", ja: "誤って" }, type: "prefix" }, { id: "trans", label: "Trans-", meaning: { en: "Across", ja: "横切って" }, type: "prefix" }, { id: "scribe", label: "Scribe", meaning: { en: "Write", ja: "書く" }, type: "root" }],
        icon: "AlertTriangle"
    },
    {
        id: "subscribe",
        word: "Subscribe",
        meaning: { en: "Arrange to receive something independently of other people.", ja: "他の人とは独立して何かを受け取るように手配する（定期購読する）。" },
        history: { en: "From 'sub-' (under) + 'scribe' (write). To write (name) under.", ja: "'sub-' (下に) + 'scribe' (書く) に由来。（名前を）下に書くこと。" },
        blocks: [{ id: "sub", label: "Sub-", meaning: { en: "Under", ja: "下に" }, type: "prefix" }, { id: "scribe", label: "Scribe", meaning: { en: "Write", ja: "書く" }, type: "root" }],
        icon: "Bell"
    }
];

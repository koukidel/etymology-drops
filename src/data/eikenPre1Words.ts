import { Word } from "./types";

// Course: 英検準1級の分解 — advanced words built from recurring Latin parts.
// Block labels concatenate (hyphens stripped) to spell each word exactly.
const w = (
    id: string, word: string, mean: [string, string], hist: [string, string],
    blocks: Word["blocks"], icon: string, tip: [string, string]
): Word => ({
    id, word,
    meaning: { en: mean[0], ja: mean[1] },
    history: { en: hist[0], ja: hist[1] },
    blocks, icon,
    tip: { en: tip[0], ja: tip[1] },
});
const P = (id: string, label: string, en: string, ja: string) => ({ id, label, meaning: { en, ja }, type: "prefix" as const });
const R = (id: string, label: string, en: string, ja: string) => ({ id, label, meaning: { en, ja }, type: "root" as const });
const S = (id: string, label: string, en: string, ja: string) => ({ id, label, meaning: { en, ja }, type: "suffix" as const });

const per = P("per", "Per", "Through, thoroughly", "通して・徹底的に");
const pro = P("pro", "Pro", "Forward", "前へ");
const con = P("con", "Con", "Together", "共に");
const re = P("re", "Re", "Back, again", "戻して・再び");
const de = P("de", "De", "Down, away", "下へ・離れて");
const ex = P("ex", "Ex", "Out", "外へ");
const com = P("com", "Com", "Together, fully", "共に・完全に");
const co = P("co", "Co", "Together", "共に");
const inP = P("in", "In", "In, upon", "中へ・上に");
const sus = P("sus", "Sus", "Up, under (sub-)", "上へ・下から");
const ive = S("ive", "Ive", "Tending to", "〜的な");
const ent = S("ent", "Ent", "Having the quality of", "〜する性質の");
const ence = S("ence", "Ence", "State, act", "〜な状態");
const ion = S("ion", "Ion", "Act, result", "〜すること");
const sist = R("sist", "Sist", "Stand", "立つ");
const her = R("her", "Her", "Stick", "くっつく");
const fer = R("fer", "Fer", "Carry", "運ぶ");
const pon = R("pon", "Pon", "Put, place", "置く");
const cept = R("cept", "Cept", "Take", "取る");
const spect = R("spect", "Spect", "Look", "見る");
const min = R("min", "Min", "Project, jut", "突き出る");
const duct = R("duct", "Duct", "Lead", "導く");
const struct = R("struct", "Struct", "Build", "築く");
const sequ = R("sequ", "Sequ", "Follow", "従う・続く");

export const eikenPre1Words: Word[] = [
    w("perspective", "Perspective", ["A viewpoint; the art of depth.", "観点、遠近法。"],
        ["'per' (through) + 'spect' (look) + '-ive'. From perspicere 'to look through'.", "'per'（通して）+ 'spect'（見る）+ '-ive'。perspicere「通して見る」より。"],
        [per, spect, ive], "Mountain", ["SPECT (look) also frames inspect, prospect, spectator, suspect, circumspect.", "SPECT（見る）は inspect、prospect、spectator、suspect も枠づけます。"]),
    w("consequence", "Consequence", ["A result that follows.", "結果、影響。"],
        ["'con' (together) + 'sequ' (follow) + '-ence'. From consequi 'to follow after'.", "'con'（共に）+ 'sequ'（従う）+ '-ence'。consequi「後に従う」より。"],
        [con, sequ, ence], "ArrowRightCircle", ["SEQU (follow) also trails sequence, consecutive, subsequent, sequel.", "SEQU（従う）は sequence、consecutive、subsequent、sequel も追います。"]),
    w("persistent", "Persistent", ["Refusing to give up.", "粘り強い、しつこい。"],
        ["'per' (thoroughly) + 'sist' (stand) + '-ent'. From persistere 'to stand firm through'.", "'per'（徹底的に）+ 'sist'（立つ）+ '-ent'。persistere「立ち続ける」より。"],
        [per, sist, ent], "Footprints", ["SIST (stand) also holds resist, consist, insist, assist, exist.", "SIST（立つ）は resist、consist、insist、assist、exist も支えます。"]),
    w("resistance", "Resistance", ["Opposition; the act of standing against.", "抵抗。"],
        ["'re' (against) + 'sist' (stand) + '-ance'. From resistere 'to stand against'.", "'re'（反して）+ 'sist'（立つ）+ '-ance'。resistere「立ち向かう」より。"],
        [re, sist, S("ance", "Ance", "State, act", "〜な状態")], "ShieldHalf", ["Stand AGAINST (re) = resistance — the same SIST root as persist and consist.", "反して(re)立つ＝抵抗。persist、consist と同じ SIST の語根。"]),
    w("coincidence", "Coincidence", ["A chance overlap of events.", "偶然の一致。"],
        ["'co' (together) + 'in' (upon) + 'cid' (fall) + '-ence'. From coincidere 'to fall upon together'.", "'co'（共に）+ 'in'（上に）+ 'cid'（落ちる）+ '-ence'。coincidere「一緒に落ちる」より。"],
        [co, inP, R("cid", "Cid", "Fall", "落ちる"), ence], "Dices", ["CID / CAD (fall) also drops accident, incident, and cascade.", "CID / CAD（落ちる）は accident、incident、cascade も落とします。"]),
    w("coherent", "Coherent", ["Logically connected; consistent.", "首尾一貫した。"],
        ["'co' (together) + 'her' (stick) + '-ent'. From cohaerere 'to stick together'.", "'co'（共に）+ 'her'（くっつく）+ '-ent'。cohaerere「くっつく」より。"],
        [co, her, ent], "Link2", ["HER / HES (stick) also bonds adhere, adhesive, and hesitate.", "HER / HES（くっつく）は adhere、adhesive、hesitate も接着します。"]),
    w("adherent", "Adherent", ["A supporter who sticks to a cause.", "支持者。"],
        ["'ad' (to) + 'her' (stick) + '-ent'. From adhaerere 'to stick to'.", "'ad'（〜へ）+ 'her'（くっつく）+ '-ent'。adhaerere「〜にくっつく」より。"],
        [P("ad", "Ad", "To", "〜へ"), her, ent], "UserCheck", ["Sticks TO (ad) a cause = adherent; coherent sticks together. Same HER root.", "〜に(ad)くっつく＝支持者。coherent は共にくっつく。同じ HER の語根。"]),
    w("preference", "Preference", ["A favored choice.", "好み、優先。"],
        ["'pre' (before) + 'fer' (carry) + '-ence'. From praeferre 'to carry before, set before'.", "'pre'（前に）+ 'fer'（運ぶ）+ '-ence'。praeferre「前に運ぶ」より。"],
        [P("pre", "Pre", "Before", "前に"), fer, ence], "Heart", ["FER (carry) also bears transfer, refer, differ, offer, conference.", "FER（運ぶ）は transfer、refer、differ、offer、conference も運びます。"]),
    w("deference", "Deference", ["Respectful yielding to another.", "敬意、服従。"],
        ["'de' (down) + 'fer' (carry) + '-ence'. From deferre 'to carry down, submit'.", "'de'（下へ）+ 'fer'（運ぶ）+ '-ence'。deferre「下へ運ぶ」より。"],
        [de, fer, ence], "HandHeart", ["Carry yourself LOW (de) = deference; preference carries one before. Same FER root.", "身を低く(de)運ぶ＝敬意。preference は前に運ぶ。同じ FER の語根。"]),
    w("prominent", "Prominent", ["Standing out; well-known.", "目立つ、著名な。"],
        ["'pro' (forward) + 'min' (jut) + '-ent'. From prominere 'to jut out'.", "'pro'（前へ）+ 'min'（突き出る）+ '-ent'。prominere「突き出る」より。"],
        [pro, min, ent], "Flag", ["MIN (jut) also juts eminent, imminent — things that project forward.", "MIN（突き出る）は eminent、imminent も突き出します。前に出るもの。"]),
    w("imminent", "Imminent", ["About to happen.", "差し迫った。"],
        ["'im' (over) + 'min' (jut) + '-ent'. From imminere 'to overhang, threaten'.", "'im'（上に）+ 'min'（突き出る）+ '-ent'。imminere「上に迫る」より。"],
        [P("im", "Im", "Over, upon (in-)", "上に"), min, ent], "AlarmClock", ["Jutting OVER (im) your head now = imminent — the same MIN root as prominent.", "頭上に(im)突き出る＝差し迫る。prominent と同じ MIN の語根。"]),
    w("component", "Component", ["A part of a whole.", "構成要素。"],
        ["'com' (together) + 'pon' (put) + '-ent'. From componere 'to put together'.", "'com'（共に）+ 'pon'（置く）+ '-ent'。componere「一緒に置く」より。"],
        [com, pon, ent], "Component", ["PON / POS (put) also places opponent, propose, deposit, position, compose.", "PON / POS（置く）は opponent、propose、deposit、position、compose も置きます。"]),
    w("opponent", "Opponent", ["An adversary.", "対戦相手。"],
        ["'op' (against) + 'pon' (put) + '-ent'. From opponere 'to set against'.", "'op'（反対に）+ 'pon'（置く）+ '-ent'。opponere「反対に置く」より。"],
        [P("op", "Op", "Against (ob-)", "反対に"), pon, ent], "Swords", ["One placed AGAINST (op) you = opponent — the same PON root as component.", "反対に(op)置かれた人＝相手。component と同じ PON の語根。"]),
    w("proponent", "Proponent", ["An advocate of an idea.", "提唱者。"],
        ["'pro' (forth) + 'pon' (put) + '-ent'. From proponere 'to put forth, propose'.", "'pro'（前へ）+ 'pon'（置く）+ '-ent'。proponere「前に置く」より。"],
        [pro, pon, ent], "Megaphone", ["One who puts an idea FORTH (pro) = proponent; opponent puts against. Same PON root.", "考えを前(pro)に置く人＝提唱者。opponent は反対に置く。同じ PON の語根。"]),
    w("competent", "Competent", ["Capable; fit for the task.", "有能な。"],
        ["'com' (together) + 'pet' (seek) + '-ent'. From competere 'to be suitable, strive together'.", "'com'（共に）+ 'pet'（求める）+ '-ent'。competere「共に求める・適う」より。"],
        [com, R("pet", "Pet", "Seek, strive", "求める"), ent], "Wrench", ["PET (seek) also drives compete, appetite, petition, repeat.", "PET（求める）は compete、appetite、petition、repeat も動かします。"]),
    w("consistent", "Consistent", ["Unchanging; holding together.", "一貫した。"],
        ["'con' (together) + 'sist' (stand) + '-ent'. From consistere 'to stand firm, hold together'.", "'con'（共に）+ 'sist'（立つ）+ '-ent'。consistere「共に立つ」より。"],
        [con, sist, ent], "Ruler", ["Stand TOGETHER firmly (con) = consistent — the SIST root of persist and resist.", "共に(con)立つ＝一貫。persist、resist の SIST の語根。"]),
    w("insistence", "Insistence", ["A firm, repeated demand.", "主張、固執。"],
        ["'in' (upon) + 'sist' (stand) + '-ence'. From insistere 'to stand upon, persist'.", "'in'（上に）+ 'sist'（立つ）+ '-ence'。insistere「上に立つ」より。"],
        [inP, sist, ence], "Megaphone", ["Standing ON (in) your point = insistence — the same SIST root as consistent.", "自分の点の上に(in)立つ＝固執。consistent と同じ SIST の語根。"]),
    w("productive", "Productive", ["Fruitful; yielding much.", "生産的な。"],
        ["'pro' (forward) + 'duct' (lead) + '-ive'. From producere 'to lead forth, bring forth'.", "'pro'（前へ）+ 'duct'（導く）+ '-ive'。producere「前へ導き出す」より。"],
        [pro, duct, ive], "Sprout", ["DUCT (lead) also leads conduct, introduce, deduce, educate, reduce.", "DUCT（導く）は conduct、introduce、deduce、educate、reduce も導きます。"]),
    w("constructive", "Constructive", ["Helpful; building up.", "建設的な。"],
        ["'con' (together) + 'struct' (build) + '-ive'. From construere 'to pile up, build'.", "'con'（共に）+ 'struct'（築く）+ '-ive'。construere「積み上げる」より。"],
        [con, struct, ive], "Hammer", ["STRUCT (build) also builds structure, instruct, destructive, infrastructure.", "STRUCT（築く）は structure、instruct、destructive、infrastructure も築きます。"]),
    w("destructive", "Destructive", ["Causing ruin; tearing down.", "破壊的な。"],
        ["'de' (reverse) + 'struct' (build) + '-ive'. From destruere 'to tear down'.", "'de'（逆に）+ 'struct'（築く）+ '-ive'。destruere「建てるを覆す」より。"],
        [de, struct, ive], "Bomb", ["Un-build (de) = destructive; constructive builds up. Same STRUCT root, opposite prefix.", "築くの逆(de)＝破壊的。constructive は積み上げる。同じ STRUCT、逆の接頭辞。"]),
    w("perception", "Perception", ["Awareness through the senses.", "知覚。"],
        ["'per' (thoroughly) + 'cept' (take) + '-ion'. From percipere 'to seize wholly, grasp'.", "'per'（完全に）+ 'cept'（取る）+ '-ion'。percipere「すっかり取り込む」より。"],
        [per, cept, ion], "Eye", ["CEPT (take) also takes accept, receive, deception, exception, capture.", "CEPT（取る）は accept、receive、deception、exception、capture も取ります。"]),
    w("deception", "Deception", ["A trick; a taking-in.", "欺瞞。"],
        ["'de' (away) + 'cept' (take) + '-ion'. From decipere 'to ensnare, take in'.", "'de'（離れて）+ 'cept'（取る）+ '-ion'。decipere「だまし取る」より。"],
        [de, cept, ion], "VenetianMask", ["Take someone IN (de) = deception — the same CEPT root as perception and accept.", "取り込んでだます(de)＝欺瞞。perception、accept と同じ CEPT の語根。"]),
    w("exception", "Exception", ["Something taken out of the rule.", "例外。"],
        ["'ex' (out) + 'cept' (take) + '-ion'. From excipere 'to take out'.", "'ex'（外へ）+ 'cept'（取る）+ '-ion'。excipere「外へ取り出す」より。"],
        [ex, cept, ion], "CircleOff", ["Taken OUT (ex) of the rule = exception — the CEPT root you met in accept.", "規則の外へ(ex)取り出す＝例外。accept で出会った CEPT の語根。"]),
    w("susceptible", "Susceptible", ["Easily affected or influenced.", "影響を受けやすい。"],
        ["'sus' (up) + 'cept' (take) + '-ible'. From suscipere 'to take up'.", "'sus'（下から）+ 'cept'（取る）+ '-ible'。suscipere「受け取る」より。"],
        [sus, cept, S("ible", "Ible", "Able to be", "〜できる")], "Wind", ["Able to TAKE ON (cept) influence = susceptible — the same CEPT root as receptive.", "影響を取り込める(cept)＝影響されやすい。receptive と同じ CEPT の語根。"]),
    w("receptive", "Receptive", ["Open to ideas.", "受容的な。"],
        ["'re' (back) + 'cept' (take) + '-ive'. From recipere 'to take back, receive'.", "'re'（戻して）+ 'cept'（取る）+ '-ive'。recipere「受け取る」より。"],
        [re, cept, ive], "DoorOpen", ["Ready to TAKE things in = receptive — the CEPT root also in accept and perception.", "取り込む用意＝受容的。accept、perception と同じ CEPT の語根。"]),
    w("detention", "Detention", ["Being held back or confined.", "拘留、居残り。"],
        ["'de' (away) + 'tent' (hold) + '-ion'. From detinere 'to hold off, keep back'.", "'de'（引き離す）+ 'tent'（保つ）+ '-ion'。detinere「引き止める」より。"],
        [de, R("tent", "Tent", "Hold", "保つ"), ion], "Lock", ["TENT / TAIN (hold) also holds retention, contain, maintain, tenant.", "TENT / TAIN（保つ）は retention、contain、maintain、tenant も保ちます。"]),
    w("extension", "Extension", ["A stretching out; an addition.", "拡張、延長。"],
        ["'ex' (out) + 'tens' (stretch) + '-ion'. From extendere 'to stretch out'.", "'ex'（外へ）+ 'tens'（伸ばす）+ '-ion'。extendere「外へ伸ばす」より。"],
        [ex, R("tens", "Tens", "Stretch", "伸ばす"), ion], "MoveHorizontal", ["TENS / TEND (stretch) also stretches extend, tension, intense, tent.", "TENS / TEND（伸ばす）は extend、tension、intense、tent も伸ばします。"]),
    w("comprehension", "Comprehension", ["Understanding; a full grasp.", "理解。"],
        ["'com' (fully) + 'prehens' (grasp) + '-ion'. From comprehendere 'to grasp fully'.", "'com'（完全に）+ 'prehens'（つかむ）+ '-ion'。comprehendere「つかむ」より。"],
        [com, R("prehens", "Prehens", "Seize, grasp", "つかむ"), ion], "BrainCircuit", ["PREHENS (grasp) also grips apprehend, comprehensive, prehensile, enterprise.", "PREHENS（つかむ）は apprehend、comprehensive、prehensile、enterprise も握ります。"]),
    w("dimension", "Dimension", ["A measurable extent.", "次元、寸法。"],
        ["'di' (apart) + 'mens' (measure) + '-ion'. From dimetiri 'to measure out'.", "'di'（分けて）+ 'mens'（測る）+ '-ion'。dimetiri「測り出す」より。"],
        [P("di", "Di", "Apart, out (dis-)", "分けて"), R("mens", "Mens", "Measure", "測る"), ion], "Ruler", ["MENS / METER (measure) also measures immense, measure, and thermometer.", "MENS / METER（測る）は immense、measure、thermometer も測ります。"]),
    w("suspension", "Suspension", ["A hanging; a temporary halt.", "停止、吊り下げ。"],
        ["'sus' (up) + 'pens' (hang) + '-ion'. From suspendere 'to hang up'.", "'sus'（上へ）+ 'pens'（吊るす）+ '-ion'。suspendere「吊り上げる」より。"],
        [sus, R("pens", "Pens", "Hang, weigh", "吊るす・量る"), ion], "Anchor", ["PENS / PEND (hang) also hangs suspend, pending, indispensable, expensive.", "PENS / PEND（吊るす）は suspend、pending、indispensable、expensive も吊るします。"]),
    w("compulsion", "Compulsion", ["A forced urge.", "強制、衝動。"],
        ["'com' (together) + 'puls' (drive) + '-ion'. From compellere 'to drive together, force'.", "'com'（共に）+ 'puls'（押す）+ '-ion'。compellere「駆り立てる」より。"],
        [com, R("puls", "Puls", "Drive, push", "押す・駆る"), ion], "Waves", ["PULS / PEL (drive) also pushes expel, repel, pulse, propel, impulse.", "PULS / PEL（押す）は expel、repel、pulse、propel、impulse も押します。"]),
    w("precision", "Precision", ["Exactness.", "精密、正確さ。"],
        ["'pre' (before) + 'cis' (cut) + '-ion'. From praecidere 'to cut off short, cut cleanly'.", "'pre'（前もって）+ 'cis'（切る）+ '-ion'。praecidere「きっちり切る」より。"],
        [P("pre", "Pre", "Before", "前もって"), R("cis", "Cis", "Cut", "切る"), ion], "Crosshair", ["CIS / CIDE (cut) also cuts scissors, concise, incision, decide.", "CIS / CIDE（切る）は scissors、concise、incision、decide も切ります。"]),
];

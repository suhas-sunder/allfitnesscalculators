import { useState } from "react";
import type { Route } from "./+types/calculate-your-tdee";
import TdeeCalculatorLandingPage from "../../client/layout/TdeeCalculatorLandingPage";

export const meta: Route.MetaFunction = () => [
  {
    title: "TDEE Calculator – Free Daily Calorie Burn & Maintenance Calculator",
  },
  {
    name: "description",
    content:
      "Accurate free TDEE Calculator to find your Total Daily Energy Expenditure (TDEE). Learn your calorie maintenance, weight loss, and muscle gain targets using Mifflin–St Jeor and Katch–McArdle formulas.",
  },
  { name: "robots", content: "index,follow" },
  {
    name: "canonical",
    content:
      "https://www.allfitnesscalculators.com/calorie-calculators/calculate-your-tdee",
  },
  { name: "theme-color", content: "#f8fafc" },
];

export default function CalculateYourTdee() {
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState(1.2);
  const [unit, setUnit] = useState("metric");
  const [bodyFat, setBodyFat] = useState<number | "">("");

  const toKg = (value: number, from: "kg" | "lb") =>
    from === "lb" ? value * 0.453592 : value;
  const toCm = (value: number, from: "cm" | "inch") =>
    from === "inch" ? value * 2.54 : value;

  const weightKg =
    weight !== "" ? toKg(Number(weight), unit === "imperial" ? "lb" : "kg") : 0;
  const heightCm =
    height !== ""
      ? toCm(Number(height), unit === "imperial" ? "inch" : "cm")
      : 0;

  const bmr =
    weightKg > 0 && heightCm > 0 && age !== ""
      ? bodyFat !== ""
        ? 370 + 21.6 * (weightKg * (1 - Number(bodyFat) / 100))
        : gender === "male"
          ? 10 * weightKg + 6.25 * heightCm - 5 * Number(age) + 5
          : 10 * weightKg + 6.25 * heightCm - 5 * Number(age) - 161
      : 0;

  const tdee = bmr * Number(activity);
  const bmi =
    weightKg > 0 && heightCm > 0
      ? (weightKg / Math.pow(heightCm / 100, 2)).toFixed(1)
      : "0";
  const idealWeight =
    heightCm > 0
      ? (gender === "male"
          ? 50 + 0.91 * (heightCm - 152.4)
          : 45.5 + 0.91 * (heightCm - 152.4)
        ).toFixed(1)
      : "0";

  // 🔹 JSON-LD Breadcrumb schema for GSC
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.allfitnesscalculators.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calorie Calculators",
        item: "https://www.allfitnesscalculators.com/calorie-calculators/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "TDEE Calculator",
        item: "https://www.allfitnesscalculators.com/calorie-calculators/calculate-your-tdee",
      },
    ],
  };

  // 🔹 FAQ JSON-LD (TDEE Specific)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is TDEE (Total Daily Energy Expenditure)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TDEE is the total number of calories your body burns per day through basic metabolism, physical activity, and digestion. It’s essential for determining how much you should eat to lose, maintain, or gain weight.",
        },
      },
      {
        "@type": "Question",
        name: "How do you calculate TDEE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TDEE = BMR × Activity Level. Your BMR is calculated using the Mifflin–St Jeor or Katch–McArdle formulas, then multiplied by an activity multiplier that reflects how active you are daily.",
        },
      },
      {
        "@type": "Question",
        name: "What formula does this TDEE calculator use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If body fat % is provided, the calculator uses the Katch–McArdle formula. If not, it defaults to the Mifflin–St Jeor equation, the most widely accepted BMR formula today.",
        },
      },
      {
        "@type": "Question",
        name: "How do I use my TDEE for weight loss?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once you know your TDEE, reduce your daily intake by 10–20% to create a calorie deficit. Combine this with strength training and adequate protein for sustainable fat loss.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is this calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It provides a close scientific estimate based on peer-reviewed formulas. Your real-world TDEE may vary slightly depending on metabolism, hormones, and non-exercise activity (NEAT).",
        },
      },
      {
        "@type": "Question",
        name: "What are the standard activity multipliers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sedentary: 1.2, Lightly Active: 1.375, Moderately Active: 1.55, Very Active: 1.725, Extra Active: 1.9. Pick the one closest to your real weekly routine.",
        },
      },
      {
        "@type": "Question",
        name: "Do men and women have different TDEE values?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Men generally have higher TDEE due to greater muscle mass. The calculator automatically adjusts based on your gender for accurate results.",
        },
      },
      {
        "@type": "Question",
        name: "Should I update my TDEE as I lose weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. As body weight or activity changes, your energy expenditure shifts too. Recalculate every 4–8 weeks to maintain precise calorie goals.",
        },
      },
      {
        "@type": "Question",
        name: "Can I gain muscle with my TDEE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Increase your daily calories by about 10–15% above TDEE, with enough protein and progressive overload training to support lean muscle growth.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <a href="/" className="text-2xl font-extrabold text-[#0f172a]">
            🏋️ AllFitnessCalculators
          </a>
          <nav className="space-x-6 text-sm text-slate-600">
            <a
              href="/calorie-calculators"
              className="text-sky-600 font-semibold"
            >
              Calorie Calculators
            </a>
            <a href="/" className="hover:text-sky-600">
              BMR
            </a>
            <a href="/" className="hover:text-sky-600">
              BMI
            </a>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div
        aria-label="breadcrumb"
        className="max-w-6xl mx-auto px-6 my-6 text-sm"
      >
        <nav className="text-slate-600">
          <a href="/" className="text-slate-600 hover:underline">
            Home
          </a>
          <span className="text-slate-400 mx-2">›</span>
          <a
            href="/calorie-calculators/"
            className="text-slate-600 hover:underline"
          >
            Calorie Calculators
          </a>
          <span className="text-sky-400 mx-2">›</span>
          <span className="text-sky-600 font-medium">TDEE Calculator</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="text-center py-12 px-6 bg-gradient-to-b from-white to-[#f1f5f9]">
        <h1 className="text-4xl font-extrabold text-[#0f172a] mb-3">
          TDEE Calculator (Total Daily Energy Expenditure)
        </h1>
        <p className="text-lg  max-w-4xl mx-auto">
          Instantly find out how many calories you burn per day using the
          Mifflin–St Jeor and Katch–McArdle equations. Plan your perfect calorie
          goal for maintenance, weight loss, or muscle gain.
        </p>
      </section>

      {/* Calculator */}
      <TdeeCalculatorLandingPage
        unit={unit}
        setUnit={setUnit}
        weight={weight}
        setWeight={setWeight}
        height={height}
        setHeight={setHeight}
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        activity={activity}
        setActivity={setActivity}
        bodyFat={bodyFat}
        setBodyFat={setBodyFat}
        bmr={bmr}
        tdee={tdee}
        bmi={bmi}
        idealWeight={idealWeight}
      />

      {/* 📊 Detailed TDEE Breakdown */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6 text-center">
          📊 Your Calorie & Nutrition Breakdown
        </h2>
        <p className="text-center text-slate-600 mb-10 text-lg max-w-3xl mx-auto leading-relaxed">
          These results are calculated using the{" "}
          <strong>Mifflin–St Jeor</strong> or
          <strong> Katch–McArdle</strong> formula, depending on your inputs.
          They represent your estimated daily energy needs, calorie goals, and
          macronutrient distribution. Actual results may vary slightly due to
          genetics, metabolism, and lifestyle.
        </p>

        {/* Maintenance Summary */}
        <div className="text-center mb-12">
          <p className="text-xl font-bold text-blue-900">
            Your Maintenance Calories:{" "}
            <span className="text-blue-700">{tdee ? tdee.toFixed(0) : 0}</span>{" "}
            kcal/day
          </p>
          <p className="text-lg text-slate-600">
            ≈ {(tdee * 7).toFixed(0)} kcal/week
          </p>
        </div>

        {/* Activity Table */}
        <div className="overflow-x-auto mb-12">
          <h3 className="text-2xl font-semibold text-[#0f172a] mb-4">
            Calorie Breakdown by Activity Level
          </h3>
          <table className="w-full border border-slate-200 text-sm sm:text-base">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="p-3 text-left">Activity Level</th>
                <th className="p-3 text-right">Calories/day</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Basal Metabolic Rate (BMR)", mult: 1 },
                { label: "Sedentary (little or no exercise)", mult: 1.2 },
                { label: "Light Exercise (1–2 days/week)", mult: 1.375 },
                { label: "Moderate Exercise (3–4 days/week)", mult: 1.55 },
                { label: "Heavy Exercise (5–6 days/week)", mult: 1.725 },
                { label: "Athlete (daily intense training)", mult: 1.9 },
              ].map((a, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="p-3">{a.label}</td>
                  <td className="p-3 text-right font-medium">
                    {bmr > 0 ? Math.round(bmr * a.mult) : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Weight Goals */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-[#0f172a] mb-4">
            Calorie Goals by Weight Target
          </h3>
          <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Moderate Weight Loss (≈0.5 kg/week)", cal: tdee * 0.8 },
              { label: "Mild Weight Loss (≈0.25 kg/week)", cal: tdee * 0.9 },
              { label: "Mild Weight Gain (≈0.25 kg/week)", cal: tdee * 1.1 },
              { label: "Moderate Weight Gain (≈0.5 kg/week)", cal: tdee * 1.2 },
            ].map((g, i) => (
              <li
                key={i}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-center"
              >
                <p className="font-semibold text-[#0f172a] mb-1">{g.label}</p>
                <p className="text-blue-700 font-bold">
                  {g.cal ? Math.round(g.cal) : 0} kcal/day
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Macronutrients */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-[#0f172a] mb-4">
            Recommended Macronutrient Splits
          </h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "Moderate Carb (30/35/35)", p: 0.3, f: 0.35, c: 0.35 },
              { title: "Lower Carb (40/40/20)", p: 0.4, f: 0.4, c: 0.2 },
              { title: "Higher Carb (30/20/50)", p: 0.3, f: 0.2, c: 0.5 },
            ].map((plan, i) => {
              const cal = tdee || 0;
              const protein = Math.round((plan.p * cal) / 4);
              const fats = Math.round((plan.f * cal) / 9);
              const carbs = Math.round((plan.c * cal) / 4);
              return (
                <div
                  key={i}
                  className="border border-slate-200 rounded-xl p-5 bg-slate-50"
                >
                  <h4 className="text-lg font-semibold text-[#0f172a] mb-2">
                    {plan.title}
                  </h4>
                  <ul className="text-slate-700 text-sm leading-relaxed space-y-1">
                    <li>
                      <strong>{protein}</strong> g Protein
                    </li>
                    <li>
                      <strong>{fats}</strong> g Fats
                    </li>
                    <li>
                      <strong>{carbs}</strong> g Carbs
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Educational Copy */}
        <div className="text-slate-700 space-y-6">
          <h3 className="text-2xl font-bold text-[#0f172a]">What is TDEE?</h3>
          <p>
            <strong>Total Daily Energy Expenditure (TDEE)</strong> represents
            the total amount of energy your body burns in one day, combining
            your resting metabolism (BMR) with calories used for daily movement,
            exercise, and digestion. It’s the best indicator of how much you
            should eat to maintain, lose, or gain weight.
          </p>
          <p>
            By understanding your TDEE, you can plan more precise nutrition
            strategies:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Maintain your current weight by eating near your TDEE.</li>
              <li>
                Create a moderate calorie deficit (10–20%) to promote fat loss.
              </li>
              <li>
                Increase calories by 5–15% above TDEE to support muscle growth.
              </li>
            </ul>
          </p>
          <p>
            This calculator uses the <strong>Mifflin–St Jeor</strong> or
            <strong> Katch–McArdle</strong> formula, both of which are validated
            in exercise physiology research. These methods estimate resting
            energy expenditure using your body composition, gender, and age to
            provide a personalized output.
          </p>
        </div>
      </section>

      {/* 🧭 How to Use the TDEE Calculator */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6 text-center">
          🧭 How to Use This Calculator
        </h2>
        <p className="text-slate-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
          Our TDEE calculator is designed to be fast, simple, and accurate.
          Follow these quick steps to calculate your daily calorie needs.
        </p>
        <ol className="list-decimal list-inside space-y-3 text-slate-700 max-w-3xl mx-auto text-base leading-relaxed">
          <li>
            Select <strong>Metric (kg/cm)</strong> or{" "}
            <strong>Imperial (lb/in)</strong> units.
          </li>
          <li>
            Enter your <strong>weight</strong>, <strong>height</strong>,{" "}
            <strong>age</strong>, and <strong>gender</strong>.
          </li>
          <li>
            Choose your <strong>activity level</strong> to match your typical
            routine.
          </li>
          <li>
            (Optional) Add your <strong>body fat %</strong> for greater accuracy
            using the Katch–McArdle formula.
          </li>
          <li>
            Your results will automatically update to show <strong>BMR</strong>,{" "}
            <strong>TDEE</strong>, <strong>Ideal Weight</strong>, and{" "}
            <strong>BMI</strong>.
          </li>
        </ol>
      </section>

      {/* ⚙️ TDEE & BMR Formulas Explained */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6 text-center">
          ⚙️ TDEE & BMR Formulas Explained
        </h2>
        <p className="text-slate-700 mb-4">
          This calculator uses two scientifically validated equations to
          estimate energy expenditure: the <strong>Mifflin–St Jeor</strong> and{" "}
          <strong>Katch–McArdle</strong> formulas.
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-lg text-[#0f172a] mb-2">
            Mifflin–St Jeor Formula
          </h3>
          <p className="text-slate-700 text-sm sm:text-base">
            <code>BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5</code>{" "}
            (men)
            <br />
            <code>
              BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161
            </code>{" "}
            (women)
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-lg text-[#0f172a] mb-2">
            Katch–McArdle Formula (when body fat % is known)
          </h3>
          <p className="text-slate-700 text-sm sm:text-base">
            <code>BMR = 370 + (21.6 × Lean Body Mass in kg)</code>
          </p>
        </div>
        <p className="text-slate-700 leading-relaxed">
          Your <strong>Total Daily Energy Expenditure (TDEE)</strong> is
          calculated by multiplying your BMR by an activity factor that
          represents how active you are throughout the day.
        </p>
      </section>

      {/* 🏃 Activity Level Reference */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6 text-center">
          🏃 Activity Levels Explained
        </h2>
        <p className="text-center text-slate-600 mb-8 text-lg max-w-3xl mx-auto leading-relaxed">
          Your activity level determines how much extra energy you burn during
          daily life and workouts. Use the guide below to select the one that
          best matches your routine.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200 text-sm sm:text-base">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="p-3 text-left">Activity Level</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-right">Multiplier</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  level: "Sedentary",
                  desc: "Desk job, minimal movement",
                  mult: 1.2,
                },
                {
                  level: "Lightly Active",
                  desc: "1–2 workouts/week",
                  mult: 1.375,
                },
                {
                  level: "Moderately Active",
                  desc: "3–4 workouts/week",
                  mult: 1.55,
                },
                {
                  level: "Very Active",
                  desc: "5–6 workouts/week",
                  mult: 1.725,
                },
                {
                  level: "Extra Active",
                  desc: "Daily training or physical labor",
                  mult: 1.9,
                },
              ].map((a, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="p-3 font-semibold text-[#0f172a]">
                    {a.level}
                  </td>
                  <td className="p-3 text-slate-700">{a.desc}</td>
                  <td className="p-3 text-right">{a.mult}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 🍎 Adjusting Calories for Goals */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6 text-center">
          🍎 Adjusting Calories for Your Goals
        </h2>
        <p className="text-center text-slate-600 mb-8 text-lg max-w-3xl mx-auto leading-relaxed">
          Once you know your TDEE, you can tailor your calorie intake to align
          with your personal fitness goals.
        </p>
        <ul className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            {
              goal: "Lose Weight",
              tip: "Eat 10–20% below TDEE",
              range: "Sustainable fat loss",
            },
            {
              goal: "Maintain Weight",
              tip: "Eat around your TDEE",
              range: "Energy balance",
            },
            {
              goal: "Gain Muscle",
              tip: "Eat 5–15% above TDEE",
              range: "Promotes lean mass growth",
            },
          ].map((g, i) => (
            <li
              key={i}
              className="border border-slate-200 rounded-xl p-6 bg-slate-50 hover:bg-blue-50 transition"
            >
              <h3 className="text-lg font-semibold text-[#0f172a] mb-1">
                {g.goal}
              </h3>
              <p className="text-blue-700 font-medium">{g.tip}</p>
              <p className="text-slate-600 text-sm mt-1">{g.range}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 🧠 Understanding TDEE, BMR & NEAT */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6 text-center">
          🧠 TDEE vs BMR vs NEAT Explained
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Understanding how your metabolism works helps you make better health
          and nutrition decisions.
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
          <li>
            <strong>BMR</strong> – Basal Metabolic Rate: calories needed to
            sustain basic life functions at rest.
          </li>
          <li>
            <strong>TDEE</strong> – Total Daily Energy Expenditure: your BMR
            plus calories burned through all activity and digestion.
          </li>
          <li>
            <strong>NEAT</strong> – Non-Exercise Activity Thermogenesis: daily
            movement outside formal workouts (walking, cleaning, etc.).
          </li>
        </ul>
        <p className="mt-4 text-slate-600">
          These components together determine your total calorie burn and energy
          balance.
        </p>
      </section>

      {/* ⚖️ Disclaimer */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6 text-center">
          ⚖️ Accuracy & Disclaimer
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          These calculations are based on validated scientific formulas, but
          every individual’s metabolism is unique.
        </p>
        <p className="text-slate-600 italic">
          Factors like genetics, hormones, stress, and sleep can all influence
          your actual calorie needs. Use these numbers as guidelines, not
          absolutes, and always consult a healthcare or nutrition professional
          before making major dietary changes.
        </p>
      </section>

      {/* 📚 Scientific References */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-24">
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6 text-center">
          📚 Scientific References
        </h2>

        <p className="text-center text-slate-600 mb-10 text-lg max-w-3xl mx-auto leading-relaxed">
          The calculations and explanations on this page are grounded in
          peer-reviewed research across exercise physiology, metabolic science,
          and human nutrition.
        </p>

        <ul className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <li>
            <strong>
              Mifflin, M. D., St Jeor, S. T., Hill, L. A., Scott, B. J.,
              Daugherty, S. A., & Koh, Y. O.
            </strong>{" "}
            (1990).{" "}
            <em>
              A new predictive equation for resting energy expenditure in
              healthy individuals.
            </em>{" "}
            <span className="italic">
              American Journal of Clinical Nutrition, 51(2), 241–247.
            </span>{" "}
            <a
              href="https://doi.org/10.1093/ajcn/51.2.241"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 hover:underline"
            >
              https://doi.org/10.1093/ajcn/51.2.241
            </a>
          </li>

          <li>
            <strong>Katch, F. I., & McArdle, W. D.</strong> (1996).{" "}
            <em>Nutrition, Weight Control, and Exercise.</em> St. Louis:
            Mosby-Year Book.
          </li>

          <li>
            <strong>FAO/WHO/UNU Expert Consultation.</strong> (2004).{" "}
            <em>
              Human Energy Requirements: Report of a Joint FAO/WHO/UNU Expert
              Consultation.
            </em>{" "}
            Food and Nutrition Technical Report Series No. 1.{" "}
            <a
              href="https://www.fao.org/3/y5686e/y5686e.pdf"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 hover:underline"
            >
              View PDF
            </a>
          </li>

          <li>
            <strong>Institute of Medicine (U.S.).</strong> (2005).{" "}
            <em>
              Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat,
              Protein, and Amino Acids.
            </em>{" "}
            Washington, DC: National Academies Press.{" "}
            <a
              href="https://doi.org/10.17226/10490"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 hover:underline"
            >
              https://doi.org/10.17226/10490
            </a>
          </li>

          <li>
            <strong>Hall, K. D.</strong> (2019).{" "}
            <em>What is the required energy deficit per unit weight loss?</em>{" "}
            <span className="italic">
              International Journal of Obesity, 43(5), 1019–1021.
            </span>{" "}
            <a
              href="https://doi.org/10.1038/s41366-018-0265-3"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 hover:underline"
            >
              https://doi.org/10.1038/s41366-018-0265-3
            </a>
          </li>

          <li>
            <strong>Pontzer, H., Yamada, Y., Sagayama, H., et al.</strong>{" "}
            (2021).{" "}
            <em>Daily energy expenditure through the human life course.</em>{" "}
            <span className="italic">Science, 373(6556), 808–812.</span>{" "}
            <a
              href="https://doi.org/10.1126/science.abe5017"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 hover:underline"
            >
              https://doi.org/10.1126/science.abe5017
            </a>
          </li>

          <li>
            <strong>Heymsfield, S. B., & Speakman, J. R.</strong> (2023).{" "}
            <em>A new era for human energy expenditure research.</em>{" "}
            <span className="italic">
              American Journal of Clinical Nutrition, 117(4), 655–657.
            </span>{" "}
            <a
              href="https://doi.org/10.1016/j.ajcnut.2023.01.003"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 hover:underline"
            >
              https://doi.org/10.1016/j.ajcnut.2023.01.003
            </a>
          </li>

          <li>
            <strong>
              U.S. Department of Agriculture & U.S. Department of Health and
              Human Services.
            </strong>{" "}
            (2020). <em>Dietary Guidelines for Americans, 2020–2025.</em>{" "}
            <a
              href="https://www.dietaryguidelines.gov/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 hover:underline"
            >
              https://www.dietaryguidelines.gov/
            </a>
          </li>

          <li>
            <strong>European Food Safety Authority (EFSA).</strong> (2017).{" "}
            <em>Scientific Opinion on Dietary Reference Values for Energy.</em>{" "}
            <span className="italic">EFSA Journal, 11(1), 3005.</span>{" "}
            <a
              href="https://doi.org/10.2903/j.efsa.2013.3005"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 hover:underline"
            >
              https://doi.org/10.2903/j.efsa.2013.3005
            </a>
          </li>
        </ul>

        <p className="text-slate-500 text-sm mt-8 italic text-center">
          These references ensure transparency, accuracy, and alignment with
          current research on metabolism and energy expenditure. For
          personalized health or nutrition guidance, consult a licensed
          professional.
        </p>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-5xl font-extrabold text-[#0f172a] mb-8 text-center">
          🧠 TDEE Calculator FAQ
        </h2>
        <p className="text-center text-slate-600 mb-12 text-lg max-w-3xl mx-auto leading-relaxed">
          Find answers to common questions about your daily calorie burn,
          formula differences, and how to use TDEE for fat loss, muscle gain,
          and long-term health goals.
        </p>

        <div className="space-y-6">
          {faqSchema.mainEntity.map((item: any, i: number) => (
            <details
              key={i}
              className="group border border-slate-200 rounded-xl p-6 bg-[#f9fafb] hover:bg-[#f0f9ff] transition"
            >
              <summary className="cursor-pointer text-lg font-semibold text-[#0f172a] flex justify-between items-center">
                {item.name}
                <span className="text-sky-500 group-open:rotate-180 transition-transform text-2xl leading-none">
                  ⌄
                </span>
              </summary>
              <p className="mt-4 text-slate-700 text-base leading-relaxed max-w-5xl">
                {item.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-10 border-t border-slate-200">
        © {new Date().getFullYear()} AllFitnessCalculators. Smarter, accurate
        tools for every fitness goal. Made with 💖.
      </footer>

      {/* 🔗 Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://allfitnesscalculators.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Calorie Calculators",
                item: "https://allfitnesscalculators.com/calorie-calculators/",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "TDEE Calculator",
                item: "https://allfitnesscalculators.com/calorie-calculators/calculate-your-tdee",
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline:
              "TDEE (Total Daily Energy Expenditure) Calculator – Science-Based Calorie Estimation",
            description:
              "A scientifically validated TDEE calculator that estimates your Basal Metabolic Rate (BMR), daily calorie needs, and macronutrient ratios using the Mifflin–St Jeor and Katch–McArdle equations, based on FAO, WHO, IOM, and EFSA research.",
            author: {
              "@type": "Organization",
              name: "AllFitnessCalculators",
              url: "https://allfitnesscalculators.com",
            },
            publisher: {
              "@type": "Organization",
              name: "AllFitnessCalculators",
              logo: {
                "@type": "ImageObject",
                url: "https://allfitnesscalculators.com/logo.png",
              },
            },
            datePublished: "2025-10-01",
            dateModified: "2025-10-19",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id":
                "https://allfitnesscalculators.com/calorie-calculators/calculate-your-tdee",
            },
            keywords: [
              "TDEE calculator",
              "BMR calculator",
              "daily calorie needs",
              "Mifflin St Jeor equation",
              "Katch McArdle formula",
              "nutrition science",
              "macronutrient calculator",
              "energy expenditure",
              "fitness tools",
              "calorie maintenance",
            ],
            citation: [
              "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO (1990). A new predictive equation for resting energy expenditure in healthy individuals. American Journal of Clinical Nutrition, 51(2), 241–247. https://doi.org/10.1093/ajcn/51.2.241",
              "Katch FI, McArdle WD (1996). Nutrition, Weight Control, and Exercise. St. Louis: Mosby-Year Book.",
              "FAO/WHO/UNU Expert Consultation (2004). Human Energy Requirements. Rome: Food and Agriculture Organization of the United Nations. https://www.fao.org/3/y5686e/y5686e.pdf",
              "Institute of Medicine (2005). Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Protein, and Amino Acids. Washington, DC: National Academies Press. https://doi.org/10.17226/10490",
              "Hall KD (2019). What is the required energy deficit per unit weight loss? International Journal of Obesity, 43(5), 1019–1021. https://doi.org/10.1038/s41366-018-0265-3",
              "Pontzer H et al. (2021). Daily energy expenditure through the human life course. Science, 373(6556), 808–812. https://doi.org/10.1126/science.abe5017",
              "Heymsfield SB, Speakman JR (2023). A new era for human energy expenditure research. American Journal of Clinical Nutrition, 117(4), 655–657. https://doi.org/10.1016/j.ajcnut.2023.01.003",
              "USDA & HHS (2020). Dietary Guidelines for Americans, 2020–2025. https://www.dietaryguidelines.gov/",
              "European Food Safety Authority (2017). Scientific Opinion on Dietary Reference Values for Energy. EFSA Journal, 11(1), 3005. https://doi.org/10.2903/j.efsa.2013.3005",
            ],
            license: "https://creativecommons.org/licenses/by/4.0/",
          }),
        }}
      />
    </main>
  );
}

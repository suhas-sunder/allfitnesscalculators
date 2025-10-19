import { useState } from "react";
import type { Route } from "./+types/home";
import TdeeCalculatorLandingPage from "../client/layout/TdeeCalculatorLandingPage";

export const meta: Route.MetaFunction = () => [
  { title: "AllFitnessCalculators – Free Fitness, Calorie & Health Tools 🏋️" },
  {
    name: "description",
    content:
      "Explore free, science-based fitness calculators for TDEE, BMR, BMI, macros, and more. Build smarter workouts, plan meals, and track progress with accurate, research-driven tools.",
  },
  { name: "robots", content: "index,follow" },
  { name: "theme-color", content: "#f8fafc" },
];

function toKg(value: number, unit: string) {
  return unit === "lb" ? value * 0.453592 : value;
}

function toCm(value: number, unit: string) {
  return unit === "inch" ? value * 2.54 : value;
}

export default function Index() {
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

  /* JSON-LD: Site-wide calculator FAQ */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      //,, , , , , , , , , , , , , , , , , , , , , , ,
      // 🔹 General Fitness Calculator Questions
      //,, , , , , , , , , , , , , , , , , , , , , , ,
      {
        "@type": "Question",
        name: "What is a fitness calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A fitness calculator is an interactive tool that helps estimate key health and training values like calorie burn, body mass index (BMI), macronutrient ratios, heart rate zones, or hydration needs. These tools use validated formulas based on your age, gender, weight, height, and activity level.",
        },
      },
      {
        "@type": "Question",
        name: "Which calculators are available on AllFitnessCalculators?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can access a wide range of calculators, including TDEE (Total Daily Energy Expenditure), BMR (Basal Metabolic Rate), BMI (Body Mass Index), Body Fat Percentage, Macro Ratios, Protein Intake, Ideal Weight, Steps-to-Calories, Water Intake, VO₂ Max, and more. Each uses formulas validated by sports science and nutrition research.",
        },
      },
      {
        "@type": "Question",
        name: "Are these calculators suitable for beginners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every calculator on AllFitnessCalculators is designed to be beginner-friendly. You can simply enter your stats to receive an accurate estimate without any prior fitness or nutrition knowledge.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate are online calorie and fitness calculators?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Online calculators use scientifically validated equations like Mifflin–St Jeor, Harris–Benedict, and Katch–McArdle. While results are reliable as estimates, individual metabolism and genetics can cause small variations, so use them as guidelines rather than exact medical measurements.",
        },
      },

      //,, , , , , , , , , , , , , , , , , , , , , , ,
      // 🔹 Calorie & Nutrition Calculators
      //,, , , , , , , , , , , , , , , , , , , , , , ,
      {
        "@type": "Question",
        name: "What is TDEE and why is it important?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TDEE (Total Daily Energy Expenditure) represents the number of calories you burn in a day through both resting metabolism and activity. Understanding your TDEE helps you plan calorie intake for fat loss, muscle gain, or maintenance.",
        },
      },
      {
        "@type": "Question",
        name: "What formula is used for BMR and TDEE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The site uses the Mifflin–St Jeor equation for BMR and standard activity multipliers for TDEE. These equations are widely used in exercise physiology and considered the gold standard for calorie estimation.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these calculators for weight loss or muscle gain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Once you know your TDEE, you can reduce your calories by about 10–20% for weight loss or increase them by 5–15% for muscle gain. The Macro Calculator helps balance protein, fat, and carbohydrate intake to match your goal.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between TDEE and BMR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BMR (Basal Metabolic Rate) measures calories your body needs at complete rest. TDEE (Total Daily Energy Expenditure) adds the calories burned through movement and activity. TDEE = BMR × Activity Level.",
        },
      },
      {
        "@type": "Question",
        name: "Are calorie calculators safe to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, these tools are safe for general educational use. They don’t provide medical advice but help you understand your body’s energy balance. Always consult a healthcare provider before starting extreme diets or exercise programs.",
        },
      },

      //,, , , , , , , , , , , , , , , , , , , , , , ,
      // 🔹 Body Composition & Health Metrics
      //,, , , , , , , , , , , , , , , , , , , , , , ,
      {
        "@type": "Question",
        name: "What is BMI and why does it matter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BMI (Body Mass Index) measures weight relative to height to categorize underweight, normal, overweight, or obesity ranges. It’s a useful screening tool but doesn’t directly measure body fat percentage or muscle mass.",
        },
      },
      {
        "@type": "Question",
        name: "How does the Body Fat Percentage Calculator work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Body Fat Calculator uses circumference measurements or visual estimates combined with weight and height to estimate fat percentage. It’s not a substitute for clinical tests but provides a reliable approximation for fitness tracking.",
        },
      },
      {
        "@type": "Question",
        name: "What is an Ideal Weight Calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Ideal Weight Calculator estimates a healthy weight range using common methods such as Devine, Hamwi, or Robinson formulas. It provides context for goal-setting rather than a strict target.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I recalculate my fitness metrics?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Recalculate every 6–12 weeks or whenever you notice body composition or activity changes. Tracking regularly helps keep calorie and macro targets aligned with your current goals.",
        },
      },

      //,, , , , , , , , , , , , , , , , , , , , , , ,
      // 🔹 Training, Steps & Performance
      //,, , , , , , , , , , , , , , , , , , , , , , ,
      {
        "@type": "Question",
        name: "How does the Steps-to-Calories Calculator work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This tool estimates calories burned from your daily step count using weight, stride length, and pace. It’s ideal for walkers or those tracking movement with fitness watches.",
        },
      },
      {
        "@type": "Question",
        name: "Can I track running or workout calories with these tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Calorie Burn and Activity calculators help estimate energy use for walking, running, cycling, and strength training sessions based on duration and intensity.",
        },
      },
      {
        "@type": "Question",
        name: "What is VO₂ Max and why is it included?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VO₂ Max measures the maximum oxygen your body can use during exercise. It reflects cardiovascular fitness and endurance potential. The VO₂ calculator uses running or cycling data to estimate this score.",
        },
      },

      //,, , , , , , , , , , , , , , , , , , , , , , ,
      // 🔹 Hydration & Recovery
      //,, , , , , , , , , , , , , , , , , , , , , , ,
      {
        "@type": "Question",
        name: "How does the Water Intake Calculator work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The calculator recommends a daily hydration goal based on body weight, activity level, and environment. It’s a quick way to estimate how much water to drink each day.",
        },
      },
      {
        "@type": "Question",
        name: "Can dehydration affect my fitness results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Dehydration reduces energy, performance, and recovery. Tracking daily water intake helps maintain strength, focus, and endurance during workouts.",
        },
      },

      //,, , , , , , , , , , , , , , , , , , , , , , ,
      // 🔹 Usability, Units & Accessibility
      //,, , , , , , , , , , , , , , , , , , , , , , ,
      {
        "@type": "Question",
        name: "Can I switch between metric and imperial units?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can toggle between kilograms/centimeters and pounds/inches on every calculator for easy conversion between metric and imperial units.",
        },
      },
      {
        "@type": "Question",
        name: "Do calculators work for both men and women?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All formulas automatically adjust for biological differences between men and women to improve accuracy.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need an account to use the calculators?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No login or sign-up is required. All tools are free, secure, and require no personal data.",
        },
      },
      {
        "@type": "Question",
        name: "How can I save or share my calculator results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can screenshot or bookmark results, and some tools include built-in share buttons for posting your stats or saving them to notes.",
        },
      },

      //,, , , , , , , , , , , , , , , , , , , , , , ,
      // 🔹 About the Site
      //,, , , , , , , , , , , , , , , , , , , , , , ,
      {
        "@type": "Question",
        name: "What makes AllFitnessCalculators different?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AllFitnessCalculators focuses on accuracy, design clarity, and research-backed data. Every calculator is mobile-friendly, lightning-fast, and ad-light for a smooth experience. No login walls, no distractions,  just reliable tools backed by real formulas.",
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
            <a href="/calorie-calculators" className="hover:text-sky-600">
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
      <section className="text-center py-12 px-6 ">
        <h1 className="text-4xl font-extrabold text-[#0f172a] mb-3">
          Your Complete Fitness & Calorie Calculator Hub
        </h1>
        <p className="text-lg  max-w-3xl mx-auto">
          Explore accurate, research-based tools for TDEE, BMR, BMI, macros, and
          more. Plan workouts, track calories, and reach your health goals, all
          in one place.
        </p>
      </section>

      {/* TDEE Calculator Preview */}
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

      <p className="text-center text-slate-600 mt-6 translate-y-[-2.5em]">
        Learn how this calculator works and view full equations on our{" "}
        <a
          href="/tdee-calculator"
          className="text-sky-600 font-semibold hover:underline"
        >
          dedicated TDEE Calculator page →
        </a>
      </p>
      {/* 🧮 All Fitness Calculators Directory */}
      <section className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-5xl font-extrabold text-[#0f172a] mb-8 text-center">
          🧮 Explore All Fitness Calculators
        </h2>
        <p className="text-center text-slate-600 mb-12 text-lg max-w-3xl mx-auto leading-relaxed">
          Discover every tool available on{" "}
          <strong>AllFitnessCalculators</strong>. From calorie tracking and
          metabolism analysis to hydration, macros, and recovery, each
          calculator is designed for accuracy, simplicity, and evidence-based
          results.
        </p>

        <div className="space-y-12">
          {/* 🔹 Calorie & Nutrition */}
          <div>
            <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
              ⚡ Calorie & Nutrition Calculators
            </h3>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  title: "TDEE Calculator",
                  desc: "Estimate your Total Daily Energy Expenditure using the Mifflin–St Jeor formula.",
                  link: "/tdee-calculator",
                },
                {
                  title: "BMR Calculator",
                  desc: "Find your Basal Metabolic Rate,  calories burned at rest.",
                  link: "/",
                },
                {
                  title: "Calorie Deficit Calculator",
                  desc: "Plan safe daily deficits for weight loss goals.",
                  link: "/",
                },
                {
                  title: "Macro Ratio Calculator",
                  desc: "Determine optimal protein, fat, and carb balance.",
                  link: "/",
                },
                {
                  title: "Protein Intake Calculator",
                  desc: "Calculate protein needs for muscle growth or fat loss.",
                  link: "/",
                },
                {
                  title: "Ideal Weight Calculator",
                  desc: "Estimate your healthy weight range using multiple methods.",
                  link: "/",
                },
              ].map((calc, i) => (
                <a
                  key={i}
                  href={calc.link}
                  onClick={(e) => {
                    if (calc.link === "/") {
                      e.preventDefault();
                      alert(`${calc.title},  Coming soon! 🚧`);
                    }
                  }}
                  className="group block border border-slate-200 rounded-xl p-6 bg-[#f9fafb] hover:bg-sky-50 hover:border-sky-200 transition"
                >
                  <h4 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-sky-700">
                    {calc.title} →
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {calc.desc}
                  </p>
                </a>
              ))}
            </ul>
          </div>

          {/* 🔹 Body Composition & Health */}
          <div>
            <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
              🧍 Body Composition & Health
            </h3>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  title: "BMI Calculator",
                  desc: "Find your Body Mass Index and understand your weight category.",
                  link: "/",
                },
                {
                  title: "Body Fat Percentage Calculator",
                  desc: "Estimate body fat using the U.S. Navy and Jackson–Pollock methods.",
                  link: "/",
                },
                {
                  title: "Waist-to-Hip Ratio Calculator",
                  desc: "Measure your health risk through fat distribution ratio.",
                  link: "/",
                },
                {
                  title: "Lean Body Mass Calculator",
                  desc: "Find how much of your weight is muscle and bone.",
                  link: "/",
                },
                {
                  title: "Metabolic Age Calculator",
                  desc: "Compare your metabolism to your biological age.",
                  link: "/",
                },
                {
                  title: "BMI Prime Calculator",
                  desc: "Check your BMI relative to ideal body weight (BMI = 25).",
                  link: "/",
                },
              ].map((calc, i) => (
                <a
                  key={i}
                  href={calc.link}
                  onClick={(e) => {
                    if (calc.link === "/") {
                      e.preventDefault();
                      alert(`${calc.title},  Coming soon! 🚧`);
                    }
                  }}
                  className="group block border border-slate-200 rounded-xl p-6 bg-[#f9fafb] hover:bg-sky-50 hover:border-sky-200 transition"
                >
                  <h4 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-sky-700">
                    {calc.title} →
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {calc.desc}
                  </p>
                </a>
              ))}
            </ul>
          </div>

          {/* 🔹 Training, Steps & Performance */}
          <div>
            <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
              🏋️ Training & Performance Calculators
            </h3>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Steps-to-Calories Calculator",
                  desc: "Convert your daily step count into burned calories.",
                  link: "/",
                },
                {
                  title: "Running Calorie Calculator",
                  desc: "Estimate energy burned while running or jogging.",
                  link: "/",
                },
                {
                  title: "Cycling Calorie Calculator",
                  desc: "Find calories burned per ride based on intensity.",
                  link: "/",
                },
                {
                  title: "VO₂ Max Calculator",
                  desc: "Assess aerobic capacity and cardiovascular fitness.",
                  link: "/",
                },
                {
                  title: "Heart Rate Zone Calculator",
                  desc: "Determine fat burn, cardio, and peak zones by age.",
                  link: "/",
                },
                {
                  title: "One-Rep Max (1RM) Calculator",
                  desc: "Estimate your maximum lifting strength for key exercises.",
                  link: "/",
                },
              ].map((calc, i) => (
                <a
                  key={i}
                  href={calc.link}
                  onClick={(e) => {
                    if (calc.link === "/") {
                      e.preventDefault();
                      alert(`${calc.title},  Coming soon! 🚧`);
                    }
                  }}
                  className="group block border border-slate-200 rounded-xl p-6 bg-[#f9fafb] hover:bg-sky-50 hover:border-sky-200 transition"
                >
                  <h4 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-sky-700">
                    {calc.title} →
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {calc.desc}
                  </p>
                </a>
              ))}
            </ul>
          </div>

          {/* 🔹 Hydration & Recovery */}
          <div>
            <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
              💧 Hydration & Recovery Calculators
            </h3>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Water Intake Calculator",
                  desc: "Find your optimal daily hydration goal.",
                  link: "/",
                },
                {
                  title: "Sleep Need Calculator",
                  desc: "Determine your ideal sleep duration by age and activity.",
                  link: "/",
                },
                {
                  title: "Rest Day Calorie Calculator",
                  desc: "Estimate calories needed on rest or recovery days.",
                  link: "/",
                },
              ].map((calc, i) => (
                <a
                  key={i}
                  href={calc.link}
                  onClick={(e) => {
                    if (calc.link === "/") {
                      e.preventDefault();
                      alert(`${calc.title},  Coming soon! 🚧`);
                    }
                  }}
                  className="group block border border-slate-200 rounded-xl p-6 bg-[#f9fafb] hover:bg-sky-50 hover:border-sky-200 transition"
                >
                  <h4 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-sky-700">
                    {calc.title} →
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {calc.desc}
                  </p>
                </a>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-5xl font-extrabold text-[#0f172a] mb-8 text-center">
          🧠 Fitness & Calculator FAQ
        </h2>
        <p className="text-center text-slate-600 mb-12 text-lg max-w-3xl mx-auto leading-relaxed">
          Common questions about calorie, fitness, and health calculators, plus
          tips for using them effectively in your daily training or diet plan.
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <footer className="text-center text-xs text-slate-500 py-10 border-t border-slate-200">
        © {new Date().getFullYear()} AllFitnessCalculators, Smarter tools for
        every goal. Made with 💖.
      </footer>
    </main>
  );
}

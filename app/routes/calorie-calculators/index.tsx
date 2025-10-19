import type { Route } from "./+types/index";

export const meta: Route.MetaFunction = () => [
  {
    title:
      "Calorie Calculators – TDEE, BMR, Deficit & Macro Tools | AllFitnessCalculators",
  },
  {
    name: "description",
    content:
      "Find your daily calorie needs with our free TDEE, BMR, and calorie deficit calculators. Plan weight loss or muscle gain with accurate, science-backed formulas used by nutrition experts.",
  },
  { name: "robots", content: "index,follow" },
  { name: "theme-color", content: "#f8fafc" },
];

export default function CalorieCalculatorsIndex() {
  /* JSON-LD: Breadcrumbs */
  const breadcrumbSchema = {
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
        item: "https://allfitnesscalculators.com/calorie-calculators",
      },
    ],
  };

  /* JSON-LD: FAQ for Calorie Calculators */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a calorie calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A calorie calculator estimates how many calories your body burns each day based on your Basal Metabolic Rate (BMR) and activity level. It helps determine your Total Daily Energy Expenditure (TDEE) to plan weight maintenance, loss, or gain.",
        },
      },
      {
        "@type": "Question",
        name: "What’s the difference between BMR and TDEE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BMR (Basal Metabolic Rate) is the number of calories your body burns at rest. TDEE (Total Daily Energy Expenditure) includes BMR plus the calories burned through all daily activities and exercise. TDEE = BMR × Activity Level.",
        },
      },
      {
        "@type": "Question",
        name: "Which formulas do these calculators use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our calculators use the Mifflin–St Jeor and Harris–Benedict equations for BMR, combined with standard activity multipliers for TDEE. These methods are validated by decades of exercise physiology research.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these tools for weight loss?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Once you know your TDEE, you can reduce your daily calorie intake by 10–20% for healthy, sustainable weight loss. You can also increase calories by 5–15% for muscle gain.",
        },
      },
      {
        "@type": "Question",
        name: "Are calorie calculators accurate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "These tools provide reliable estimates based on established scientific equations, but real-world results may vary due to genetics, metabolism, and lifestyle. They are best used as a guide for meal planning and goal setting.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to know my body fat percentage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. However, entering your body fat percentage allows the calculator to use the Katch–McArdle formula, which adjusts your BMR for lean mass and improves accuracy.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I update my TDEE or BMR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You should recalculate your TDEE or BMR every 1–2 months, or whenever your body weight or activity level changes significantly. Regular tracking ensures your calorie targets stay accurate.",
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
            <a href="/" className="text-sky-600 font-semibold">
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

      {/* Breadcrumbs */}
      <nav
        aria-label="breadcrumb"
        className="max-w-6xl mx-auto px-6 my-6 text-sm"
      >
        <a href="/" className="hover:text-sky-600">
          Home
        </a>{" "}
        › <span className="text-sky-600 font-medium">Calorie Calculators</span>
      </nav>

      {/* Hero */}
      <section className="text-center py-14 px-6 bg-gradient-to-b from-white to-[#f1f5f9]">
        <h1 className="text-4xl font-extrabold text-[#0f172a] mb-3">
          Free Calorie Calculators for Smarter Nutrition Planning
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Estimate your calorie burn, plan your diet, and balance your macros
          with accurate, research-based tools for every goal, weight loss,
          maintenance, or muscle gain.
        </p>
      </section>

      {/* Calculator Directory */}
      <section className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-20">
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-8 text-center">
          ⚡ Calorie & Nutrition Calculators
        </h2>

        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            {
              title: "TDEE Calculator",
              desc: "Estimate your Total Daily Energy Expenditure using activity multipliers.",
              link: "/calorie-calculators/calculate-your-tdee",
            },
            {
              title: "BMR Calculator",
              desc: "Find your Basal Metabolic Rate to understand your calorie baseline.",
              link: "/",
            },
            {
              title: "Calorie Deficit Calculator",
              desc: "Set safe calorie targets for sustainable fat loss.",
              link: "/",
            },
            {
              title: "Macro Ratio Calculator",
              desc: "Calculate your ideal protein, fat, and carb intake ratios.",
              link: "/",
            },
            {
              title: "Protein Intake Calculator",
              desc: "Find daily protein needs for muscle growth and recovery.",
              link: "/",
            },
            {
              title: "Ideal Weight Calculator",
              desc: "Estimate a healthy weight range using multiple scientific methods.",
              link: "/",
            },
          ].map((calc, i) => (
            <a
              key={i}
              href={calc.link}
              onClick={(e) => {
                if (calc.link === "/") {
                  e.preventDefault();
                  alert(`${calc.title} – Coming soon! 🚧`);
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
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mb-24">
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6 text-center">
          🧠 Calorie Calculator FAQ
        </h2>
        <p className="text-center text-slate-600 mb-10 text-lg max-w-3xl mx-auto leading-relaxed">
          Learn how calorie calculators work, the science behind them, and how
          to use them effectively for your goals.
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
              <p className="mt-4 text-slate-700 text-base leading-relaxed max-w-4xl">
                {item.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, faqSchema]),
        }}
      />

      <footer className="text-center text-xs text-slate-500 py-10 border-t border-slate-200">
        © {new Date().getFullYear()} AllFitnessCalculators. Smarter tools for
        every goal. Made with 💖.
      </footer>
    </main>
  );
}

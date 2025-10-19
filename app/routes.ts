import { route, index, type RouteConfig } from "@react-router/dev/routes";

export default [
  // Home
  index("routes/home.tsx"),

  // Category hub at /calorie-calculators
  route("calorie-calculators", "routes/calorie-calculators/index.tsx"),

  // Detailed page at /calorie-calculators/calculate-your-tdee
  route(
    "calorie-calculators/calculate-your-tdee",
    "routes/calorie-calculators/calculate-your-tdee.tsx"
  ),
] satisfies RouteConfig;

import { Suspense } from "react";
import CarEvaluationForm from "./_components/CarEvaluationForm";
import CarEvaluationShimmer from "./_components/CarEvaluationShimmer";

const EvaluationPage = () => {
  return (
    <Suspense fallback={<CarEvaluationShimmer />}>
      <CarEvaluationForm />
    </Suspense>
  );
};

export default EvaluationPage;
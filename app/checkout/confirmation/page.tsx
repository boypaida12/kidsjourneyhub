import { Suspense } from "react";
import CODConfirmationContent from "./confirmation-content";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    }>
      <CODConfirmationContent />
    </Suspense>
  );
}
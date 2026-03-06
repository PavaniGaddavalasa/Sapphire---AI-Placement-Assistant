"use client"

import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { PlacementPredictor } from "@/components/predictor/placement-predictor"
import { Footer } from "@/components/footer"

export default function PredictorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        badge="ML Prediction Engine"
        title="Predict Your"
        titleHighlight="Placement Probability"
        description="Our ML ensemble model (XGBoost + Random Forest) analyzes your CGPA, coding profile, projects, skills, and interview scores to predict placement outcomes."
      />
      <PlacementPredictor />
      <Footer />
    </div>
  )
}

import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import { TitleSlide } from './slides/01_titleSlide'
import { ProblemStatementSlide } from './slides/02_problemStatement'
import { MarketAnalysisSlide } from './slides/03_marketAnalysis'
import { SolutionSlide } from './slides/04_solution'
import { TestingSlide } from './slides/05_testing'
import { YCSBJustificationSlide } from './slides/06_ycsb_justification/YCSBJustificationSlide'
import { MarketAnalysisLayout, MarketOverviewSlide, TrendsDeepDiveSlide } from './slides/07_08_market_analysis'
import { DatasetSlides } from './slides/09_10_dataset_selection'
import { DataPreparationSlides } from './slides/11_12_data_preparation'
import { TestEnvironmentSlide } from './slides/13_test_environment'
import { ResultsSlide } from './slides/05_results'
import { ConclusionSlide } from './slides/06_conclusion'
import './App.css'

const DatasetSelectionWrapper = () => {
  const location = useLocation();
  const subSlide = location.pathname.includes('details') ? 1 : 0;
  return <DatasetSlides subSlide={subSlide} />;
}

const DataPreparationWrapper = () => {
  const location = useLocation();
  const subSlide = location.pathname.includes('cassandra') ? 1 : 0;
  return <DataPreparationSlides subSlide={subSlide} />;
}

function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/title" replace />} />
        <Route path="/title" element={<TitleSlide />} />
        <Route path="/problem" element={<ProblemStatementSlide />} />
        <Route path="/market" element={<MarketAnalysisSlide />} />
        <Route path="/solution" element={<SolutionSlide />} />
        <Route path="/testing" element={<TestingSlide />} />
        <Route path="/ycsb" element={<YCSBJustificationSlide />} />
        <Route path="/market-analysis" element={<MarketAnalysisLayout />}>
          <Route index element={<MarketOverviewSlide />} />
          <Route path="trends-deep-dive" element={<TrendsDeepDiveSlide />} />
        </Route>
        <Route path="/dataset-selection" element={<DatasetSelectionWrapper />}>
          <Route index element={<DatasetSelectionWrapper />} />
          <Route path="details" element={<DatasetSelectionWrapper />} />
        </Route>
        <Route path="/data-preparation" element={<DataPreparationWrapper />}>
          <Route index element={<DataPreparationWrapper />} />
          <Route path="cassandra" element={<DataPreparationWrapper />} />
        </Route>
        <Route path="/test-environment" element={<TestEnvironmentSlide />} />
        <Route path="/results" element={<ResultsSlide />} />
        <Route path="/conclusion" element={<ConclusionSlide />} />
      </Routes>
    </div>
  )
}

export default App

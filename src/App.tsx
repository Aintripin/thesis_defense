import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { ThemeProvider } from './contexts/ThemeContext'
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher'
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
import { TechnicalImplementationSlide } from './slides/14_technical_implementation'
import { TechnicalOptimizationSlide } from './slides/15_technical_optimization'
import YcsbConfigurationSlide from './slides/16_ycsb_configuration'
import TestExecutionSlide from './slides/17_test_execution'
import AutomationSlide from './slides/18_automation/AutomationSlide'
import VisualizationSlide from './slides/19_visualization/VisualizationSlide'
import { MainResultsSlide } from './slides/20_main_results'
import { ScalabilityDelaysSlide } from './slides/22_scalability_delays'
import { PublicationsSlide } from './slides/23_publications'
import { ConclusionSlide } from './slides/24_conclusion'
import { GoodbyeSlide } from './slides/25_goodbye'
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

const MainResultsBarsWrapper = () => {
  return <MainResultsSlide initialChartType="bars" />;
}

const MainResultsRadarWrapper = () => {
  return <MainResultsSlide initialChartType="radar" />;
}

function App() {
  // Enable keyboard navigation
  useKeyboardNavigation();

  return (
    <ThemeProvider>
      <div className="app">
        <ThemeSwitcher />
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
          <Route path="/technical-implementation" element={<TechnicalImplementationSlide />} />
          <Route path="/technical-optimization" element={<TechnicalOptimizationSlide />} />
          <Route path="/ycsb-configuration" element={<YcsbConfigurationSlide />} />
          <Route path="/test-execution" element={<TestExecutionSlide />} />
          <Route path="/automation" element={<AutomationSlide />} />
          <Route path="/visualization" element={<VisualizationSlide />} />
          <Route path="/main-results" element={<MainResultsBarsWrapper />} />
          <Route path="/main-results/radar" element={<MainResultsRadarWrapper />} />
          <Route path="/scalability-delays" element={<ScalabilityDelaysSlide />} />
          <Route path="/publications" element={<PublicationsSlide />} />
          <Route path="/conclusion" element={<ConclusionSlide />} />
          <Route path="/goodbye" element={<GoodbyeSlide />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App

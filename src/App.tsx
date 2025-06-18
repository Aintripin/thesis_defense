import styles from './App.module.scss';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import SlideIndicator from './components/SlideIndicator'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { ThemeProvider } from './contexts/ThemeContext'
import { TitleSlide } from './slides/01_titleSlide'
import { ProblemStatementSlide } from './slides/02_problemStatement'
import { MarketAnalysisSlide } from './slides/03_marketAnalysis'
import { SolutionSlide } from './slides/04_solution'
import { TestingSlide } from './slides/05_testing'
import { YCSBJustificationSlide } from './slides/06_ycsb_justification/YCSBJustificationSlide'
import { MarketAnalysisLayout, MarketOverviewSlide, TrendsDeepDiveSlide } from './slides/07_08_market_analysis'
import { DatasetSlides } from './slides/09_10_dataset_selection'
import { DataPreparationSlide as MongoDbPreparationSlide } from './slides/11_mongodb_preparation/DataPreparationSlide.tsx'
import PostgresqlPreparationSlide from './slides/12_postgresql_preparation/index.tsx'
import CassandraPreparationSlide from './slides/13_cassandra_preparation/index.tsx'
import { TestEnvironmentSlide } from './slides/14_test_environment'
import { TechnicalImplementationSlide } from './slides/15_technical_implementation'
import { TechnicalOptimizationSlide } from './slides/16_technical_optimization'
import YcsbConfigurationSlide from './slides/17_ycsb_configuration'
import AutomationSlide from './slides/18_automation/AutomationSlide'
import VisualizationSlide from './slides/19_visualization/VisualizationSlide'
import { MainResultsSlide } from './slides/20_main_results'
import { ScalabilityDelaysSlide } from './slides/22_scalability_delays'
import { PublicationsSlide } from './slides/23_publications'
import RecommendationsSlide from './slides/24_recommendations'
import { ConclusionSlide } from './slides/25_conclusion'
import { GoodbyeSlide } from './slides/26_goodbye'

const DatasetSelectionWrapper = () => {
  const location = useLocation();
  const subSlide = location.pathname.includes('details') ? 1 : 0;
  return <DatasetSlides subSlide={subSlide} />;
}

const MainResultsBarsWrapper = () => {
  return <MainResultsSlide initialChartType="bars" />;
}

const MainResultsRadarWrapper = () => {
  return <MainResultsSlide initialChartType="radar" />;
}

const AppContent = () => {
  // Enable keyboard navigation - now inside ThemeProvider
  useKeyboardNavigation();

  return (
    <div className={styles.app}>
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
        <Route path="/data-preparation" element={<Navigate to="/mongodb-preparation" replace />} />
        <Route path="/mongodb-preparation" element={<MongoDbPreparationSlide />} />
        <Route path="/postgresql-preparation" element={<PostgresqlPreparationSlide />} />
        <Route path="/cassandra-preparation" element={<CassandraPreparationSlide />} />
        <Route path="/test-environment" element={<TestEnvironmentSlide />} />
        <Route path="/technical-implementation" element={<TechnicalImplementationSlide />} />
        <Route path="/technical-optimization" element={<TechnicalOptimizationSlide />} />
        <Route path="/ycsb-configuration" element={<YcsbConfigurationSlide />} />
        <Route path="/automation" element={<AutomationSlide />} />
        <Route path="/visualization" element={<VisualizationSlide />} />
        <Route path="/main-results" element={<MainResultsBarsWrapper />} />
        <Route path="/main-results/radar" element={<MainResultsRadarWrapper />} />
        <Route path="/scalability-delays" element={<ScalabilityDelaysSlide />} />
        <Route path="/publications" element={<PublicationsSlide />} />
        <Route path="/recommendations" element={<RecommendationsSlide />} />
        <Route path="/conclusion" element={<ConclusionSlide />} />
        <Route path="/goodbye" element={<GoodbyeSlide />} />
      </Routes>
      <SlideIndicator />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App

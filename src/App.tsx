import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import { TitleSlide } from './slides/01_titleSlide'
import { ProblemStatementSlide } from './slides/02_problemStatement'
import { MarketAnalysisSlide } from './slides/03_marketAnalysis'
import { SolutionSlide } from './slides/04_solution'
import { TestingSlide } from './slides/05_testing'
import { YCSBJustificationSlide } from './slides/06_ycsb_justification/YCSBJustificationSlide'
import { MarketAnalysisSlide as NewMarketAnalysisSlide } from './slides/07_market_analysis/MarketAnalysisSlide'
import { MarketAnalysisContinuedSlide } from './slides/08_market_analysis_continued'
import { ResultsSlide } from './slides/05_results'
import { ConclusionSlide } from './slides/06_conclusion'
import './App.css'

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
        <Route path="/market-analysis" element={<NewMarketAnalysisSlide />} />
        <Route path="/market-analysis-continued" element={<MarketAnalysisContinuedSlide />} />
        <Route path="/results" element={<ResultsSlide />} />
        <Route path="/conclusion" element={<ConclusionSlide />} />
      </Routes>
    </div>
  )
}

export default App

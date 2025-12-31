import React, { useState } from 'react';
import { DataGrid } from './components/DataGrid';
import { AddRowForm } from './components/AddRowForm';
import { ReportView } from './components/ReportView';
import { INITIAL_DATA } from './constants';
import { SalesRecord, AiReport, ReportStatus } from './types';
import { generateBusinessReport } from './services/geminiService';

const App: React.FC = () => {
  const [data, setData] = useState<SalesRecord[]>(INITIAL_DATA);
  const [report, setReport] = useState<AiReport | null>(null);
  const [reportStatus, setReportStatus] = useState<ReportStatus>(ReportStatus.IDLE);

  const handleAddRow = (newRecord: Omit<SalesRecord, 'id'>) => {
    const record: SalesRecord = {
      ...newRecord,
      id: Math.random().toString(36).substr(2, 9)
    };
    setData(prev => [...prev, record]);
    // Invalidate report if data changes
    if (report) setReport(null);
    setReportStatus(ReportStatus.IDLE);
  };

  const handleDeleteRow = (id: string) => {
    setData(prev => prev.filter(r => r.id !== id));
    if (report) setReport(null);
    setReportStatus(ReportStatus.IDLE);
  };

  const handleGenerateReport = async () => {
    if (data.length === 0) {
      alert("Please add data before generating a report.");
      return;
    }

    setReportStatus(ReportStatus.GENERATING);
    try {
      const generatedReport = await generateBusinessReport(data);
      setReport(generatedReport);
      setReportStatus(ReportStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setReportStatus(ReportStatus.ERROR);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalUnits = data.reduce((sum, item) => sum + item.units, 0);

  return (
    <div className="min-h-screen pb-12">
      {/* Header - Hidden on Print */}
      <header className="bg-white shadow-sm border-b border-gray-200 no-print sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-primary text-white p-2 rounded-lg mr-3">
              <i className="fas fa-table fa-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">SheetReport Pro</h1>
          </div>
          <div className="flex space-x-4">
             <div className="text-right mr-4 hidden sm:block">
                <p className="text-xs text-gray-500 uppercase">Total Revenue</p>
                <p className="text-lg font-bold text-gray-900">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalRevenue)}
                </p>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Print Header - Only Visible on Print */}
        <div className="hidden print:block mb-8 text-center border-b-2 border-primary pb-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Sales Analysis Report</h1>
            <p className="text-gray-600">Confidential Business Data • {new Date().toLocaleDateString()}</p>
        </div>

        {/* Input Form */}
        <AddRowForm onAdd={handleAddRow} />

        {/* Data Table */}
        <div className="mb-8">
            <div className="flex justify-between items-end mb-4 no-print">
                <h2 className="text-lg font-semibold text-gray-700">Current Data Sheet</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {data.length} Records found
                </span>
            </div>
            <DataGrid data={data} onDelete={handleDeleteRow} />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 my-12 no-print">
            <button
                onClick={handleGenerateReport}
                disabled={reportStatus === ReportStatus.GENERATING}
                className={`flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white shadow-lg transition-all transform hover:scale-105 ${
                    reportStatus === ReportStatus.GENERATING 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary'
                }`}
            >
                {reportStatus === ReportStatus.GENERATING ? (
                    <>
                        <i className="fas fa-spinner fa-spin mr-3"></i> Analyzing Data...
                    </>
                ) : (
                    <>
                        <i className="fas fa-magic mr-3"></i> Generate AI Report
                    </>
                )}
            </button>

            {report && (
                <button
                    onClick={handlePrint}
                    className="flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 shadow-md transition-all"
                >
                    <i className="fas fa-print mr-3"></i> Print Report
                </button>
            )}
        </div>

        {/* Report Section */}
        {reportStatus === ReportStatus.ERROR && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 no-print">
                <p className="text-red-700">Error generating report. Please check your API key and try again.</p>
            </div>
        )}

        {report && (
            <div id="printable-report">
                <ReportView report={report} />
            </div>
        )}
        
      </main>
    </div>
  );
};

export default App;
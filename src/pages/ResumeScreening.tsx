import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, Download } from 'lucide-react';

const ResumeScreening = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
      // In a real implementation, we would analyze the file here
      simulateAnalysis();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      // In a real implementation, we would analyze the file here
      simulateAnalysis();
    }
  };

  const simulateAnalysis = () => {
    // This is where we would integrate with actual AI models
    // For now, we'll just simulate the analysis
    setAnalysis({
      score: 85,
      suggestions: [
        { type: 'improvement', text: 'Consider adding more quantifiable achievements' },
        { type: 'success', text: 'Strong action verbs used throughout' },
        { type: 'improvement', text: 'Add more industry-specific keywords' }
      ],
      keywords: ['leadership', 'project management', 'agile', 'communication'],
      atsCompatible: true
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Resume Screening</h1>
        <p className="text-xl text-gray-600">
          Upload your resume to get instant AI-powered feedback and improvements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
            }`}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-lg text-gray-600">
              Drag and drop your resume here, or{' '}
              <label className="text-indigo-600 hover:text-indigo-500 cursor-pointer">
                browse
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInput}
                />
              </label>
            </p>
            <p className="mt-2 text-sm text-gray-500">PDF, DOC, DOCX up to 10MB</p>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center">
              <FileText className="h-6 w-6 text-gray-500" />
              <span className="ml-2 text-gray-700">{file.name}</span>
            </div>
          )}
        </div>

        {/* Analysis Results */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Analysis Results</h2>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">{analysis.score}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Resume Score</p>
                  <p className="text-lg font-medium text-gray-900">
                    {analysis.score >= 80 ? 'Excellent' : 'Needs Improvement'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {analysis.suggestions.map((suggestion: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start p-3 bg-gray-50 rounded-lg"
                >
                  {suggestion.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  )}
                  <p className="ml-3 text-gray-700">{suggestion.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-2">Keywords Found</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              <Download className="h-5 w-5 mr-2" />
              Download Detailed Report
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeScreening;
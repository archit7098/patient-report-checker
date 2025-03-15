
import { useState } from 'react';
import Header from '@/components/Header';
import PatientInfoForm, { PatientInfo } from '@/components/PatientInfoForm';
import MentalStatusExam, { MSEData } from '@/components/MentalStatusExam';
import ReportView from '@/components/ReportView';
import { FadeIn } from '@/components/transitions';
import { AnimatePresence } from 'framer-motion';

const initialPatientInfo: PatientInfo = {
  name: '',
  age: '',
  gender: '',
  date: new Date(),
  id: '',
};

const initialMSEData: MSEData = {
  appearance: [],
  behavior: [],
  attitude: [],
  speech: [],
  mood: [],
  affect: [],
  thought_process: [],
  thought_content: [],
  perception: [],
  cognition: [],
  insight: [],
  judgment: [],
  additional_notes: '',
};

type Step = 'patient-info' | 'examination' | 'report';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('patient-info');
  const [patientInfo, setPatientInfo] = useState<PatientInfo>(initialPatientInfo);
  const [mseData, setMSEData] = useState<MSEData>(initialMSEData);

  const handlePatientInfoComplete = () => {
    setCurrentStep('examination');
  };

  const handleExaminationComplete = () => {
    setCurrentStep('report');
  };

  const handleBackToPatientInfo = () => {
    setCurrentStep('patient-info');
  };

  const handleBackToExamination = () => {
    setCurrentStep('examination');
  };

  const handleResetExamination = () => {
    setPatientInfo(initialPatientInfo);
    setMSEData(initialMSEData);
    setCurrentStep('patient-info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-clinical-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Header 
          title="Mental Status Examination" 
          subtitle="Record and generate printable reports for patient mental status examinations."
        />

        <AnimatePresence mode="wait">
          {currentStep === 'patient-info' && (
            <FadeIn key="patient-info">
              <PatientInfoForm
                patientInfo={patientInfo}
                setPatientInfo={setPatientInfo}
                onComplete={handlePatientInfoComplete}
              />
            </FadeIn>
          )}

          {currentStep === 'examination' && (
            <FadeIn key="examination">
              <MentalStatusExam
                patientInfo={patientInfo}
                mseData={mseData}
                setMSEData={setMSEData}
                onComplete={handleExaminationComplete}
                onBack={handleBackToPatientInfo}
              />
            </FadeIn>
          )}

          {currentStep === 'report' && (
            <FadeIn key="report">
              <ReportView
                patientInfo={patientInfo}
                mseData={mseData}
                onBack={handleBackToExamination}
                onReset={handleResetExamination}
              />
            </FadeIn>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;

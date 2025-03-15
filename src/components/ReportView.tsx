
import { format } from 'date-fns';
import { FadeIn } from './transitions';
import { Button } from '@/components/ui/button';
import { PatientInfo } from './PatientInfoForm';
import { MSEData } from './MentalStatusExam';
import { Printer } from 'lucide-react';

type ReportViewProps = {
  patientInfo: PatientInfo;
  mseData: MSEData;
  onBack: () => void;
  onReset: () => void;
};

const ReportView = ({ patientInfo, mseData, onBack, onReset }: ReportViewProps) => {
  const handlePrint = () => {
    window.print();
  };

  const renderSection = (title: string, items: string[]) => {
    if (items.length === 0) return null;
    
    return (
      <div className="mb-4">
        <h3 className="font-medium text-clinical-800">{title}:</h3>
        <p>{items.join(', ')}</p>
      </div>
    );
  };

  return (
    <FadeIn>
      <div className="glass-panel p-6 md:p-8 max-w-4xl mx-auto print-container">
        <div className="print-header mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-medium text-clinical-950 font-display">
              Mental Status Examination
            </h2>
            <p className="text-clinical-600">
              Generated on {format(new Date(), 'MMMM d, yyyy')}
            </p>
          </div>
          <div className="no-print flex gap-4">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              Edit Examination
            </Button>
            <Button 
              onClick={handlePrint} 
              className="flex items-center gap-2 bg-clinical-800 hover:bg-clinical-900"
            >
              <Printer size={16} />
              Print Report
            </Button>
          </div>
        </div>

        <div className="report-content">
          <div className="patient-info p-5 bg-clinical-50 rounded-lg mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-clinical-600">Patient Name</p>
                <p className="font-medium">{patientInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-clinical-600">Patient ID</p>
                <p className="font-medium">{patientInfo.id}</p>
              </div>
              <div>
                <p className="text-sm text-clinical-600">Age</p>
                <p className="font-medium">{patientInfo.age || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-clinical-600">Gender</p>
                <p className="font-medium">{patientInfo.gender}</p>
              </div>
              <div className="col-span-2 md:col-span-4">
                <p className="text-sm text-clinical-600">Examination Date</p>
                <p className="font-medium">{format(patientInfo.date, 'MMMM d, yyyy')}</p>
              </div>
            </div>
          </div>

          <div className="mse-results space-y-6">
            <section>
              <h3 className="section-title border-b border-clinical-200 pb-2 mb-4">
                Appearance & Behavior
              </h3>
              <div className="space-y-3">
                {renderSection('General Appearance', mseData.appearance)}
                {renderSection('Attitude', mseData.attitude)}
                {renderSection('Behavior & Psychomotor Activity', mseData.behavior)}
                {renderSection('Speech', mseData.speech)}
              </div>
            </section>

            <section>
              <h3 className="section-title border-b border-clinical-200 pb-2 mb-4">
                Mood & Affect
              </h3>
              <div className="space-y-3">
                {renderSection('Mood', mseData.mood)}
                {renderSection('Affect', mseData.affect)}
              </div>
            </section>

            <section>
              <h3 className="section-title border-b border-clinical-200 pb-2 mb-4">
                Thought & Perception
              </h3>
              <div className="space-y-3">
                {renderSection('Thought Process', mseData.thought_process)}
                {renderSection('Thought Content', mseData.thought_content)}
                {renderSection('Perception', mseData.perception)}
              </div>
            </section>

            <section>
              <h3 className="section-title border-b border-clinical-200 pb-2 mb-4">
                Cognition & Higher Function
              </h3>
              <div className="space-y-3">
                {renderSection('Cognition', mseData.cognition)}
                {renderSection('Insight', mseData.insight)}
                {renderSection('Judgment', mseData.judgment)}
              </div>
            </section>

            {mseData.additional_notes && (
              <section>
                <h3 className="section-title border-b border-clinical-200 pb-2 mb-4">
                  Additional Notes & Observations
                </h3>
                <p className="whitespace-pre-wrap">{mseData.additional_notes}</p>
              </section>
            )}
          </div>

          <div className="signature-section mt-12 pt-4 border-t border-clinical-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-clinical-600 mb-8">Clinician Signature</p>
                <div className="w-full border-b border-clinical-300 pt-8"></div>
                <p className="mt-2 text-clinical-600">Name and Credentials</p>
              </div>
              <div>
                <p className="text-sm text-clinical-600 mb-8">Date</p>
                <div className="w-full border-b border-clinical-300 pt-8"></div>
                <p className="mt-2 text-clinical-600">MM/DD/YYYY</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end no-print">
          <Button variant="outline" onClick={onReset} className="ml-4">
            Start New Examination
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};

export default ReportView;

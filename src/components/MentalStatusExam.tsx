
import { useState } from 'react';
import { FadeIn } from './transitions';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientInfo } from './PatientInfoForm';

export type MSEData = {
  appearance: string[];
  behavior: string[];
  attitude: string[];
  speech: string[];
  mood: string[];
  affect: string[];
  thought_process: string[];
  thought_content: string[];
  perception: string[];
  cognition: string[];
  insight: string[];
  judgment: string[];
  additional_notes: string;
};

type MentalStatusExamProps = {
  patientInfo: PatientInfo;
  mseData: MSEData;
  setMSEData: React.Dispatch<React.SetStateAction<MSEData>>;
  onComplete: () => void;
  onBack: () => void;
};

const MentalStatusExam = ({
  patientInfo,
  mseData,
  setMSEData,
  onComplete,
  onBack,
}: MentalStatusExamProps) => {
  const [activeTab, setActiveTab] = useState('appearance');

  const handleCheckboxChange = (category: keyof MSEData, option: string) => {
    setMSEData((prev) => {
      const current = prev[category] as string[];
      
      if (current.includes(option)) {
        return {
          ...prev,
          [category]: current.filter((item) => item !== option),
        };
      } else {
        return {
          ...prev,
          [category]: [...current, option],
        };
      }
    });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMSEData((prev) => ({
      ...prev,
      additional_notes: e.target.value,
    }));
  };

  const isOptionSelected = (category: keyof MSEData, option: string) => {
    return (mseData[category] as string[]).includes(option);
  };

  const renderCheckboxGroup = (category: keyof MSEData, options: string[]) => {
    return (
      <div className="checkbox-group">
        {options.map((option) => (
          <label
            key={option}
            className={`checkbox-label ${
              isOptionSelected(category, option) ? 'selected' : ''
            }`}
          >
            <Checkbox
              checked={isOptionSelected(category, option)}
              onCheckedChange={() => handleCheckboxChange(category, option)}
              className="mr-2"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  };

  const handleNextTab = () => {
    const tabs = ['appearance', 'behavior', 'mood', 'thought', 'cognition', 'notes'];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else {
      onComplete();
    }
  };

  const handlePrevTab = () => {
    const tabs = ['appearance', 'behavior', 'mood', 'thought', 'cognition', 'notes'];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    } else {
      onBack();
    }
  };

  return (
    <FadeIn>
      <div className="glass-panel p-6 md:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-clinical-600 mb-1">
            Mental Status Examination for:
          </div>
          <h2 className="text-xl font-medium text-clinical-900">
            {patientInfo.name} ({patientInfo.id})
          </h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="thought">Thought</TabsTrigger>
            <TabsTrigger value="cognition">Cognition</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="animate-fade-in space-y-6">
            <div>
              <h3 className="subsection-title">General Appearance</h3>
              {renderCheckboxGroup('appearance', [
                'Well-groomed', 'Disheveled', 'Inappropriate dress', 'Poor hygiene',
                'Appears stated age', 'Appears younger than stated age', 'Appears older than stated age'
              ])}
            </div>

            <div>
              <h3 className="subsection-title">Attitude</h3>
              {renderCheckboxGroup('attitude', [
                'Cooperative', 'Uncooperative', 'Guarded', 'Suspicious',
                'Hostile', 'Evasive', 'Friendly', 'Engaging', 'Apathetic'
              ])}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={onBack}>Back to Patient Info</Button>
              <Button onClick={handleNextTab}>Next: Behavior</Button>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="animate-fade-in space-y-6">
            <div>
              <h3 className="subsection-title">Behavior & Psychomotor Activity</h3>
              {renderCheckboxGroup('behavior', [
                'Normal', 'Agitated', 'Restless', 'Hyperactive', 'Calm',
                'Psychomotor retardation', 'Catatonic', 'Bizarre behavior',
                'Stereotypy', 'Echopraxia', 'Compulsive behaviors'
              ])}
            </div>

            <div>
              <h3 className="subsection-title">Speech</h3>
              {renderCheckboxGroup('speech', [
                'Normal rate/rhythm/volume', 'Pressured', 'Loud', 'Soft',
                'Mumbled', 'Slurred', 'Slow', 'Fast', 'Stuttering',
                'Poverty of speech', 'Mute', 'Dysarthric', 'Monotone'
              ])}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevTab}>Previous</Button>
              <Button onClick={handleNextTab}>Next: Mood</Button>
            </div>
          </TabsContent>

          <TabsContent value="mood" className="animate-fade-in space-y-6">
            <div>
              <h3 className="subsection-title">Mood</h3>
              {renderCheckboxGroup('mood', [
                'Euthymic', 'Depressed', 'Anxious', 'Irritable', 'Angry',
                'Euphoric', 'Elated', 'Guilty', 'Hopeless', 'Fearful',
                'Labile', 'Apathetic', 'Self-reported as "fine"'
              ])}
            </div>

            <div>
              <h3 className="subsection-title">Affect</h3>
              {renderCheckboxGroup('affect', [
                'Full range', 'Restricted', 'Blunted', 'Flat', 'Inappropriate',
                'Congruent with mood', 'Incongruent with mood', 'Labile'
              ])}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevTab}>Previous</Button>
              <Button onClick={handleNextTab}>Next: Thought</Button>
            </div>
          </TabsContent>

          <TabsContent value="thought" className="animate-fade-in space-y-6">
            <div>
              <h3 className="subsection-title">Thought Process</h3>
              {renderCheckboxGroup('thought_process', [
                'Linear', 'Goal-directed', 'Circumstantial', 'Tangential', 
                'Flight of ideas', 'Loose associations', 'Thought blocking',
                'Poverty of thought', 'Perseveration', 'Word salad', 'Neologisms'
              ])}
            </div>

            <div>
              <h3 className="subsection-title">Thought Content</h3>
              {renderCheckboxGroup('thought_content', [
                'Normal', 'Suicidal ideation', 'Homicidal ideation', 'Obsessions',
                'Phobias', 'Delusions - Persecutory', 'Delusions - Grandiose',
                'Delusions - Reference', 'Delusions - Control', 'Paranoia',
                'Ideas of reference', 'Poverty of content', 'Preoccupations'
              ])}
            </div>

            <div>
              <h3 className="subsection-title">Perception</h3>
              {renderCheckboxGroup('perception', [
                'No hallucinations', 'Auditory hallucinations', 'Visual hallucinations',
                'Tactile hallucinations', 'Olfactory hallucinations', 'Gustatory hallucinations',
                'Illusions', 'Depersonalization', 'Derealization'
              ])}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevTab}>Previous</Button>
              <Button onClick={handleNextTab}>Next: Cognition</Button>
            </div>
          </TabsContent>

          <TabsContent value="cognition" className="animate-fade-in space-y-6">
            <div>
              <h3 className="subsection-title">Cognition</h3>
              {renderCheckboxGroup('cognition', [
                'Alert', 'Oriented x3', 'Disoriented to time', 'Disoriented to place',
                'Disoriented to person', 'Attention intact', 'Attention impaired',
                'Recent memory intact', 'Recent memory impaired',
                'Remote memory intact', 'Remote memory impaired',
                'Average intelligence', 'Above average intelligence', 'Below average intelligence'
              ])}
            </div>

            <div>
              <h3 className="subsection-title">Insight</h3>
              {renderCheckboxGroup('insight', [
                'Good', 'Fair', 'Poor', 'Absent',
                'Aware of illness', 'Denies illness', 'Partial awareness'
              ])}
            </div>

            <div>
              <h3 className="subsection-title">Judgment</h3>
              {renderCheckboxGroup('judgment', [
                'Good', 'Fair', 'Poor', 'Impaired',
                'Impulsive', 'Shows future planning'
              ])}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevTab}>Previous</Button>
              <Button onClick={handleNextTab}>Next: Notes</Button>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="animate-fade-in space-y-6">
            <div>
              <h3 className="subsection-title">Additional Notes & Observations</h3>
              <Textarea
                value={mseData.additional_notes}
                onChange={handleNotesChange}
                placeholder="Enter any additional observations, impressions, or notes about the patient's mental status examination..."
                className="h-40"
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevTab}>Previous</Button>
              <Button onClick={onComplete}>Generate Report</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </FadeIn>
  );
};

export default MentalStatusExam;

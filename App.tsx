
import React, { useState, useEffect, useCallback } from 'react';
import { Power, StoryChoice, StorySegment } from './types';
import { generateInitialStory, generateNextSegment } from './services/geminiService';
import Header from './components/Header';
import NarrativeView from './components/NarrativeView';
import ChoiceSelector from './components/ChoiceSelector';
import LoadingIndicator from './components/LoadingIndicator';
import PowerPillars from './components/PowerPillars';
import InfoModal from './components/InfoModal';
import { API_KEY_INFO } from './constants';

const App: React.FC = () => {
  const [storySegments, setStorySegments] = useState<StorySegment[]>([]);
  const [currentChoices, setCurrentChoices] = useState<StoryChoice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPowerFocus, setCurrentPowerFocus] = useState<Power | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(false);

  const initializeJourney = useCallback(async () => {
    const apiKeyFromEnv = process.env.API_KEY;
    const apiKeyPreview = apiKeyFromEnv ? `${apiKeyFromEnv.substring(0, 5)}...${apiKeyFromEnv.slice(-4)}` : "undefined/empty";
    console.log(`App.tsx: Initializing journey. API_KEY from process.env (preview): ${apiKeyPreview}`);

    if (!apiKeyFromEnv) {
      setApiKeyMissing(true);
      setError(API_KEY_INFO); 
      setIsLoading(false);
      console.warn("App.tsx: API_KEY from process.env is missing or empty. Displaying API key configuration message. For local dev, check index.html's <script id='dev-api-key-config'> block.");
      return;
    }
    setApiKeyMissing(false);
    setError(null);
    setIsLoading(true);
    setStorySegments([]);
    setCurrentChoices([]);

    try {
      const { storyText, choices } = await generateInitialStory();
      setStorySegments([{ 
        id: `seg-${Date.now()}`, 
        text: storyText, 
        powerInFocus: Power.None,
        isUserChoice: false,
        timestamp: new Date() 
      }]);
      setCurrentChoices(choices);
      if (choices.length > 0 && choices[0]) {
        setCurrentPowerFocus(choices[0].power);
      } else {
        setCurrentPowerFocus(Power.None);
      }
    } catch (e: any) {
      console.error("Initialization error in App.tsx:", e);
      let displayError = e.message || "Failed to start The Weaver's Journey. Check console for details.";
      if (typeof e.message === 'string' && (e.message.toLowerCase().includes("api key") || e.message.toLowerCase().includes("api_key"))) {
        displayError = `API Error: "${e.message}" \n\nThis usually means the API key string itself is incorrect, expired, or not permissioned for the Gemini API. \n\nCRITICAL: Please double-check the API key VALUE you provided. For local development, this is in the <script id="dev-api-key-config"> block within your index.html file. Ensure it is copied correctly and is a valid, active Gemini API key. Refer to console logs from 'GeminiService' and 'INDEX.HTML (API Key Setup Script)' for debugging hints.`;
      }
      setError(displayError);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    initializeJourney();
  }, [initializeJourney]);

  const handleSelectChoice = async (choice: StoryChoice) => {
    if (apiKeyMissing) {
      console.warn("App.tsx: handleSelectChoice called while apiKeyMissing is true. Aborting. User should fix API key in index.html for local dev.");
      setError("Action aborted: API Key is missing. Please configure it in the <script id='dev-api-key-config'> block in index.html for local development and retry initialization.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentPowerFocus(choice.power);

    const userChoiceSegment: StorySegment = {
      id: `choice-${Date.now()}`,
      text: choice.text,
      powerInFocus: choice.power,
      isUserChoice: true,
      timestamp: new Date()
    };
    
    const updatedHistory = [...storySegments, userChoiceSegment];
    setStorySegments(updatedHistory);
    setCurrentChoices([]); 

    try {
      const { storyText, choices: newChoices } = await generateNextSegment(updatedHistory, choice);
      
      const newStorySegment: StorySegment = {
        id: `seg-${Date.now()}`,
        text: storyText,
        powerInFocus: choice.power,
        isUserChoice: false,
        timestamp: new Date()
      };
      setStorySegments(prev => [...prev, newStorySegment]);
      setCurrentChoices(newChoices);
    } catch (e: any) {
      console.error("Error generating next segment in App.tsx:", e);
      let displayError = e.message || "The Weaver stumbled. Please try another path or restart.";
      if (typeof e.message === 'string' && (e.message.toLowerCase().includes("api key") || e.message.toLowerCase().includes("api_key"))) {
         displayError = `API Error: "${e.message}" \n\nThis usually means the API key string itself is incorrect, expired, or not permissioned for the Gemini API. \n\nCRITICAL: Please double-check the API key VALUE you provided. For local development, this is in the <script id="dev-api-key-config"> block within your index.html file. Ensure it is copied correctly and is a valid, active Gemini API key. Refer to console logs from 'GeminiService' and 'INDEX.HTML (API Key Setup Script)' for debugging hints.`;
      }
      setError(displayError);
      setCurrentChoices([]); 
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInfoModal = () => setIsInfoModalOpen(!isInfoModalOpen);

  if (apiKeyMissing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 text-slate-100">
        <Header onToggleInfo={toggleInfoModal} />
        <div className="text-center p-8 bg-slate-800 rounded-lg shadow-xl max-w-lg w-full">
          <h2 className="text-2xl font-semibold text-amber-400 mb-4">API Key Configuration Required</h2>
          <p className="text-slate-300 mb-2 whitespace-pre-line">{API_KEY_INFO}</p>
          <p className="mt-2 text-slate-400">For local development, please carefully edit your `index.html` file. Find the &lt;script id="dev-api-key-config"&gt; block and set your API key in the `GEMINI_API_KEY` field within the JSON content, as instructed by the comments in that file.</p>
          <p className="mt-4 text-xs text-slate-500">This application cannot function without a valid Gemini API key.</p>
           <button
              onClick={initializeJourney} 
              className="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Retry Initialization
            </button>
        </div>
        <InfoModal isOpen={isInfoModalOpen} onClose={toggleInfoModal} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Header onToggleInfo={toggleInfoModal} />
      <PowerPillars currentFocus={currentPowerFocus} />
      
      <main className="flex-grow flex flex-col overflow-hidden p-4 md:p-6 gap-4 md:gap-6">
        <div className="flex-grow overflow-y-auto rounded-lg shadow-lg bg-slate-800/30 min-h-[300px] md:min-h-[400px]">
           <NarrativeView segments={storySegments} />
        </div>
        
        {error && (
          <div className="p-3 bg-red-800/60 border border-red-600 text-red-100 rounded-md text-sm text-center animate-fadeIn whitespace-pre-line">
            <p className="font-semibold">An Error Occurred:</p>
            <p>{error}</p>
          </div>
        )}

        {isLoading && storySegments.length === 0 && !error && ( 
            <div className="flex flex-col items-center justify-center p-10">
                <LoadingIndicator />
            </div>
        )}
        {isLoading && storySegments.length > 0 && <LoadingIndicator />}
        
        {!isLoading && currentChoices.length > 0 && (
          <ChoiceSelector choices={currentChoices} onSelectChoice={handleSelectChoice} isLoading={isLoading} />
        )}
        
        {!isLoading && currentChoices.length === 0 && storySegments.length > 0 && !error && (
           <div className="p-4 text-center text-slate-400 animate-fadeIn">
             <p>The current thread has reached its conclusion, or no further paths were woven.</p>
           </div>
        )}

      </main>

      <footer className="p-4 text-center border-t border-slate-700">
        <button
          onClick={initializeJourney}
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Restarting...' : 'Restart Weaver\'s Journey'}
        </button>
        <p className="text-xs text-slate-500 mt-3">
          Powered by Gemini & React. Narrative concept based on "The Weaver’s Evolution".
        </p>
      </footer>
      <InfoModal isOpen={isInfoModalOpen} onClose={toggleInfoModal} />
    </div>
  );
};

export default App;

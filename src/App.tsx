import { QuestionnaireWizard } from './components/QuestionnaireWizard';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-text">
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col">
        <header className="mb-8 text-center mt-4">
          <h1 className="text-3xl font-bold text-primary-dark">問診票</h1>
          <p className="text-text-muted mt-2 text-lg">
            より良い診療のため、以下の質問にお答えください。
          </p>
        </header>

        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-primary-light/20 p-6 md:p-10 overflow-hidden relative">
          <QuestionnaireWizard />
        </div>
      </main>
    </div>
  );
}

export default App;

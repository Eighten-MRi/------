import { useState } from 'react';
import { Home } from './pages/Home';
import { Questionnaire } from './pages/Questionnaire';
import { Layout } from './components/Layout';
import { Button } from './components/Button';

type View = 'home' | 'questionnaire' | 'finish';

function App() {
  const [view, setView] = useState<View>('home');
  const [patientId, setPatientId] = useState('');

  const startQuestionnaire = (id: string) => {
    setPatientId(id);
    setView('questionnaire');
  };

  const finishQuestionnaire = () => {
    setView('finish');
  };

  const reset = () => {
    setPatientId('');
    setView('home');
  };

  return (
    <div className="App">
      {view === 'home' && (
        <Home onStart={startQuestionnaire} />
      )}

      {view === 'questionnaire' && (
        <Questionnaire
          patientId={patientId}
          onComplete={finishQuestionnaire}
        />
      )}

      {view === 'finish' && (
        <Layout title="完了">
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--color-primary-dark)' }}>
              ご回答ありがとうございました
            </h2>
            <p style={{ marginBottom: '3rem', fontSize: '1.2rem' }}>
              薬剤師にお声がけください。<br />
              お薬の準備をしてお待ちしております。
            </p>
            <Button onClick={reset} variant="secondary">
              トップに戻る
            </Button>
          </div>
        </Layout>
      )}
    </div>
  );
}

export default App;

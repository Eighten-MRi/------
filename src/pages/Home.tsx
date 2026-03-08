import { useState } from 'react';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';

type HomeProps = {
    onStart: (patientId: string) => void;
};

export const Home: React.FC<HomeProps> = ({ onStart }) => {
    const [patientId, setPatientId] = useState('');

    const handleStart = () => {
        if (!patientId.trim()) {
            alert('患者番号を入力してください');
            return;
        }
        onStart(patientId);
    };

    return (
        <Layout title="問診票">
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h2 style={{ marginBottom: '2rem', color: 'var(--color-primary-dark)' }}>
                    ご来局ありがとうございます
                </h2>
                <p style={{ marginBottom: '3rem', fontSize: '1.2rem', lineHeight: '1.8' }}>
                    より良いお薬の提供のため、<br />
                    いくつかの質問にお答えください。
                </p>

                <div style={{ marginBottom: '3rem' }}>
                    <label
                        htmlFor="patient-id"
                        style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}
                    >
                        患者番号（診察券番号）
                    </label>
                    <input
                        id="patient-id"
                        type="text"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        placeholder="12345"
                        style={{
                            padding: '1rem',
                            fontSize: '1.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: '2px solid #e5e7eb',
                            width: '100%',
                            maxWidth: '300px',
                            textAlign: 'center',
                            outline: 'none'
                        }}
                    />
                </div>

                <Button onClick={handleStart} className='btn-primary'>
                    問診を始める
                </Button>
            </div>
        </Layout>
    );
};

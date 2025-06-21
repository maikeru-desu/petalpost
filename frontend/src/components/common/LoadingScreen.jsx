import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
    const loadingPhrases = [
        "Planting your seeds of creativity...",
        "Cultivating your floral experience...",
        "Nurturing your botanical journey...",
        "Letting your ideas blossom...",
        "Sprinkling some flower power...",
        "Brewing a pot of floral inspiration...",
        "Watching your garden grow...",
        "Preparing your petal perfection...",
        "Creating your personal bouquet...",
        "Arranging stems of imagination...",
        "Growing something beautiful for you...",
        "Mixing the perfect floral recipe..."
    ];
    
    const [loadingPhrase, setLoadingPhrase] = useState(loadingPhrases[0]);
    
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * loadingPhrases.length);
        setLoadingPhrase(loadingPhrases[randomIndex]);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen" 
            style={{ background: 'linear-gradient(135deg, rgba(var(--color-ecru)/0.9) 0%, rgba(var(--color-flax)/0.7) 100%)' }}>
            <div className="text-center">
            <svg className="inline animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-medium" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
                {loadingPhrase}
            </p>
            </div>
        </div>
    );
};

export default LoadingScreen;

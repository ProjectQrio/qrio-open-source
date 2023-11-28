import React, { useState, useEffect } from 'react';
import styles from './PercentageSlider.module.css';  // Add this line


const PercentageSlider = ({ claimId }) => {
    const [sliderValue, setSliderValue] = useState(50);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Add this line

    useEffect(() => {
        console.log('Effect called');

        fetch('/api/session')
        .then(response => response.json())
        .then(session => {
            console.log('Session:', session);
            setUser(session.user);
        })
        .catch(error => {
            console.error('Error fetching session:', error);
            console.error(error);
        });
    }, [claimId]);

    useEffect(() => {
        if (user) {
            console.log('User:', user);
            console.log('User ID:', user.sub);
            console.log('Claim ID:', claimId);

            fetch(`/api/get-slider-value?userId=${user.sub}&claimId=${claimId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Data:', data);
                setSliderValue(data.value || 0);
                setIsLoading(false);  // Add this line
            })
            .catch(error => {
                console.error('Error fetching slider value:', error);
                console.error(error);
            });
        }
    }, [user, claimId]);


    const handleSliderChange = (event) => {
        const value = event.target.value;
        setSliderValue(value);
    };

    const handleSliderChangeEnd = async () => {
        await fetch('/api/save-slider-value', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ claimId, value: sliderValue })
        });
    };

    return (
        <div className={styles.sliderContainer}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className={styles.sliderLabel}>
                        <span>100% Likelihood of being True</span>
                        <span className={styles.slidervalue}>{sliderValue}%</span>
                        <span>0% Likelihood of being True</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={handleSliderChange}
                        onMouseUp={handleSliderChangeEnd}
                        className={styles.slider}  // Add this line
                    />
                </>
            )}
        </div>
    );
};

export default PercentageSlider;
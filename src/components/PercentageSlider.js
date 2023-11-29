import React, { useState, useEffect, useRef } from 'react'; 
import styles from './PercentageSlider.module.css';


const PercentageSlider = ({ claimId }) => {
    const [sliderValue, setSliderValue] = useState(50);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  
    const [average, setAverage] = useState(50);
    const sliderWrapperRef = useRef(null);  
    const [triangleWidthPercentage, setTriangleWidthPercentage] = useState(0);  // Define triangleWidthPercentage



    useEffect(() => {
        fetch(`/api/get-average-slider-value?claimId=${claimId}`)
            .then(response => response.json())
            .then(data => setAverage(data.average))
            .catch(console.error);
    }, [claimId]);

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
                setSliderValue(data.value || 50);
                setIsLoading(false);  // Add this line
            })
            .catch(error => {
                console.error('Error fetching slider value:', error);
                console.error(error);
            });
        }
    }, [user, claimId]);

    useEffect(() => {
        const updateTriangleWidthPercentage = () => {
            if (sliderWrapperRef.current) {
                const parentContainerWidth = sliderWrapperRef.current.offsetWidth;
                const triangleWidth = 20;  // The width of the triangle in pixels
                const newTriangleWidthPercentage = (triangleWidth / parentContainerWidth) * 100;
                setTriangleWidthPercentage(newTriangleWidthPercentage);
            }
        };

        // Update the triangleWidthPercentage when the component mounts
        updateTriangleWidthPercentage();

        // Update the triangleWidthPercentage when the window is resized
        window.addEventListener('resize', updateTriangleWidthPercentage);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateTriangleWidthPercentage);
        };
    }, [claimId]);


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

    useEffect(() => {
        fetch(`/api/get-average-slider-value?claimId=${claimId}`)
            .then(response => response.json())
            .then(data => setAverage(data.average))
            .catch(console.error);
    }, [sliderValue, claimId]);

    return (
        <div className={styles.sliderContainer}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className={styles.sliderLabel}>
                        <div className={styles.sliderLabelSideA}>0% Likelihood of being True</div>
                        <span className={styles.slidervalue}>{sliderValue}%</span>
                        <div className={styles.sliderLabelSideB}>100% Likelihood of being True</div>
                    </div>
                    <div className={styles.sliderWrapper} ref={sliderWrapperRef} style={{ position: 'relative' }}>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={sliderValue}
                            onChange={handleSliderChange}
                            onMouseUp={handleSliderChangeEnd}
                            className={styles.slider}
                        />
                    </div>
                    {average !== null && (
    <div className={styles.sliderWrapper} style={{ position: 'relative' }}>
        <input
            type="range"
            min="0"
            max="100"
            value={average}
            className={`${styles.averageSlider}`}
            readOnly
        />
<div className={styles.averageLabel}><p>Average Response: {average}%</p></div>    </div>
)}
                </>
            )}
        </div>
    );
};

export default PercentageSlider;
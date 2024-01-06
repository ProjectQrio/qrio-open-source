import React, { useState, useEffect, useRef } from 'react'; 
import styles from './PercentageSlider.module.css';
import { Modal } from 'antd';


const PercentageSlider = ({ claimId }) => {
    const [sliderValue, setSliderValue] = useState(50);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  
    const [average, setAverage] = useState(50);
    const sliderWrapperRef = useRef(null);  
    const [triangleWidthPercentage, setTriangleWidthPercentage] = useState(0);  // Define triangleWidthPercentage
    const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        fetch(`/api/get-average-slider-value?claimId=${claimId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Average:', data.average); // Log the average
                setAverage(data.average);
                console.log('Updated average:', average);
            })
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

    const handleSliderMouseDown = (event) => {
        if (!user) {
            event.preventDefault(); // Prevent the slider from moving
            setIsModalVisible(true); // Show the Modal
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        window.location.href = '/api/auth/login'; // Adjust the URL to your login page
      };

    const handleSliderChange = (event) => {
        if (!user) {
            alert('Please log in to adjust the slider.');
            event.target.value = sliderValue; // Reset the slider value
            return;
        }
    
        const value = event.target.value;
        setSliderValue(value);
    };


    useEffect(() => {
        fetch(`/api/get-average-slider-value?claimId=${claimId}`)
            .then(response => response.json())
            .then(data => setAverage(data.average))
            .catch(console.error);
    }, [sliderValue, claimId]);

    return (
        <div className={styles.sliderContainer}>
    
                <>
                <Modal
    title="Login Required"
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={() => setIsModalVisible(false)}
    okText="Login"
    cancelText="Cancel"
>
    <p>Please log in to adjust the slider.</p>
</Modal>
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
                            onMouseDown={handleSliderMouseDown}
                            onChange={handleSliderChange}
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
            
        </div>
    );
};

export default PercentageSlider;
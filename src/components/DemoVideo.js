function DemoEmbed() {
    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative'
        }}>
            <div style={{ 
                position: 'relative', 
                width: '70%', // This determines the width of the video
                paddingBottom: '44.25%'  // This is 62.5% of 70%, to maintain the aspect ratio
            }}>
                <iframe 
                    src="https://www.loom.com/embed/742038f06f724ee1aeb2776b27be91bc?sid=a03762b8-6ced-4bb7-96e4-a2dc2b64d91d" 
                    frameBorder="0" 
                    webkitallowfullscreen="true" 
                    mozallowfullscreen 
                    allowFullScreen 
                    style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%' 
                    }}>
                </iframe>
            </div>
        </div>
    );
}

export default DemoEmbed;


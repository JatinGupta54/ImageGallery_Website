

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const imageDataArray = [
    { filename: 'hot-air-balloon-8869138_640.jpg', year: "2021", remarks: 'Hot Air Balloon' },
    { filename: 'beach.jpeg', year: '2022', remarks: "Beach" },
    { filename: 'Scattered_Sunlight.jpg', year: '2023', remarks: 'Scattered Sunlight' },
    { filename: 'Butterfly.jpg', year: '2024', remarks: 'A Butterfly' },
    { filename: 'Light_Path.jpg', year: '2024', remarks: 'Light Path' },
  ];
  
const App = (name) => {
    return (
        <BrowserRouter>
        <Title name={name} />
        <Navigation />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery imageDataArray={imageDataArray} />} />
            <Route path="/slideshow" element={<SlideShow imageDataArray={imageDataArray} />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
        </BrowserRouter>
    );
};

const Title = ({ name }) => {
    return (
        <header className="bg-warning">
            <div className="display-4 text-center">{name.name}</div>
        </header>
    );
};

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
        <ul className="navbar-nav">
            <li className="nav-item">
            <Link to="/" className="nav-link">HOME</Link>
            </li>
            <li className="nav-item">
            <Link to="/gallery" className="nav-link">IMAGES</Link>
            </li>
            <li className="nav-item">
            <Link to="/slideshow" className="nav-link">SLIDESHOW</Link>
            </li>
        </ul>
        </nav>
    );
};

const Home = () => {
    return (
        <main className="container-fluid h-100">
        <div className="row h-100">
            <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
            <div style={{width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <div style={{background: 'grey', fontWeight: 'bold', padding: '1rem'}}>
                    <div>
                        Name - Jatin Gupta
                    </div>
                    <div>
                        SID - 1155172419
                    </div>
                </div>
            </div>
            <img
                src='/component-tree-diagram.jpg'
                alt="component-tree-diagram"
                style={{ maxWidth: '120%', maxHeight: '120vh' }}
                className="img-fluid"
            />
            </div>
        </div>
        </main>
    );
  };

const Gallery = ({ imageDataArray }) => {
    return (
        <main className="container">
        {imageDataArray.map((file, index) => (
            <FileCard key={index} imageData={imageDataArray[index]} />
        ))}
        </main>
    );
};


const SlideShow = ({ imageDataArray }) => {
    const [currentImageID, setCurrentImageID] = useState(0);
    const [currentInterval, setCurrentInterval] = useState(1500);
    const [intervalId, setIntervalId] = useState(null);
    const [slideImageDataArray, setSlideImageDataArray] = useState(imageDataArray)

    useEffect(() => {
        if (intervalId) {
        clearInterval(intervalId);
        const newIntervalId = setInterval(showNextImage, currentInterval);
        setIntervalId(newIntervalId);
        console.log("Use Effect triggered")
        }
    }, [currentInterval]); // eslint-disable-line react-hooks/exhaustive-deps

    const startSlideShow = () => {
        if (intervalId == null) {
        const newIntervalId = setInterval(showNextImage, currentInterval);
        setIntervalId(newIntervalId);
        console.log("Start SlideShow triggered");
        }
    };

    const stopSlideShow = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    const slowerSlideShow = () => {
        setCurrentInterval((prevInterval) => {
        const newInterval = prevInterval + 200;
        return newInterval;
        });
    };

    const fasterSlideShow = () => {
        setCurrentInterval((prevInterval) => {
        const newInterval = prevInterval - 200;
        return newInterval <= 200 ? 200 : newInterval;
        });
    };

    const shuffleSlideShow = () => {
        const shuffledArray = [...imageDataArray];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        stopSlideShow()
        setCurrentImageID(0); // Reset the current image ID to the first image
        setSlideImageDataArray(shuffledArray);
    };

    const showNextImage = () => {
        setCurrentImageID((prevIndex) => (prevIndex + 1) % slideImageDataArray.length);
    };

    return (
        <main className="container">
        <div className="mb-3">
            <button className="btn btn-success me-2" onClick={startSlideShow}>
            Start Slideshow
            </button>
            <button className="btn btn-danger me-2" onClick={stopSlideShow}>
            Stop Slideshow
            </button>
            <button className="btn btn-secondary me-2" onClick={slowerSlideShow}>
            Slower
            </button>
            <button className="btn btn-primary me-2" onClick={fasterSlideShow}>
            Faster
            </button>
            <button className="btn btn-warning me-2" onClick={shuffleSlideShow}>
            Shuffle
            </button>
        </div>
        <main className="container">
            <FileCard key={currentImageID} imageData={slideImageDataArray[currentImageID]} />
        </main>
        <div>
            <span>Slideshow status is</span> {intervalId ? <span>ON</span> : <span>OFF</span>}
        </div>
        <div>Current slideshow interval is {currentInterval}ms</div>
        <div>Current image index is {currentImageID}</div>
        </main>
    );
};


const FileCard = ({ imageData }) => {
    const [selected, setSelected] = useState(false);

    const handleMouseEnter = () => {
        setSelected(true);
    };

    const handleMouseLeave = () => {
        setSelected(false);
    };

    return (
        <div
        className="card d-inline-block m-2"
        style={{ width: selected ? "400px" : "200px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <img src={"images/" + imageData.filename} className="w-100" alt={imageData.remarks} />
        <div className="card-body">
            <h6 className="card-title">{imageData.filename}</h6>
            <p className="card-text">{imageData.remarks}</p>
            <p className="card-text">{imageData.year}</p>
        </div>
        </div>
    );
};

const NoMatch = () => {
    return (
        <main className="container">
        NoMatch Component Here ! - 404 Not Found
        </main>
    );
};
  



const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render( <App name="NATURE" />);
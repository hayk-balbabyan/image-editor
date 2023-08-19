import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../icons/upload.svg';

const ImageEditor = () => {
    const [image, setImage] = useState(null);
    const [blur, setBlur] = useState(0);
    const [brightness, setBrightness] = useState(0);
    const [contrast, setContrast] = useState(0);
    const [grayscale, setGrayscale] = useState(0);
    const [invert, setInvert] = useState(0);
    const [sepia, setSepia] = useState(0);
    const [saturate, setSaturate] = useState(0);
    const [hueRotate, setHueRotate] = useState(0);

    const [formattedFilters, setFormattedFilters] = useState('');
    const previewRef = useRef(null);

    const handleImageUpload = (selectedImage) => {
        const imageUrl = URL.createObjectURL(selectedImage);
        setImage(imageUrl);
    };

    const handleSaveImage = (e) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = image;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.filter = formattedFilters;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const editedImage = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = editedImage;
            link.download = 'Image.png';
            link.click();
        };
    };

    const handleChooseAnotherImage = () => {
        setImage(null);
    };

    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles, acceptedFiles.length)
        if (acceptedFiles.length > 0) {
            handleImageUpload(acceptedFiles[0]);
            console.log(acceptedFiles)
        }
    };

    useEffect(() => {
        buildFilters();
    }, [brightness, contrast, blur, grayscale, invert, sepia, saturate, hueRotate]);

    const buildFilters = () => {
        let __filters = '';

        if(brightness > 0) {
            __filters += `brightness(${brightness}%) `;
        }

        if(blur > 0) {
            __filters += `blur(${blur}px) `;
        }

        if(contrast > 0) {
            __filters += `contrast(${contrast}%) `;
        }

        if(grayscale > 0) {
            __filters += `grayscale(${grayscale}%) `;
        }

        if(invert > 0) {
            __filters += `invert(${invert}%) `;
        }

        if(sepia > 0) {
            __filters += `sepia(${sepia}%) `;
        }

        if(saturate > 0) {
            __filters += `saturate(${saturate}) `;
        }

        if(hueRotate > 0) {
            __filters += `hue-rotate(${hueRotate}deg) `;
        }

        setFormattedFilters(__filters);
    };


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

    return (
        <div className="image-editor">
            {image ? (
                <div className={'image-editor-wrapper'}>
                    <div className="controls">
                        <div className="controls-wrapper">
                            <div>
                                <h2>Blur</h2>
                                <input value={blur} type="range" min={0} max={30} step={0.1} onChange={e => setBlur(e.target.value)}/>
                            </div>
                            <div>
                                <h2>Brightness</h2>
                                <input value={brightness} type="range" min={0} max={100} step={1} onChange={e => setBrightness(e.target.value)}/>
                            </div>
                            <div>
                                <h2>Contrast</h2>
                                <input value={contrast} type="range" min={0} max={100} step={1} onChange={e => setContrast(e.target.value)} />
                            </div>
                            <div>
                                <h2>Grayscale</h2>
                                <input value={grayscale} type="range" min={0} max={100} step={1} onChange={e => setGrayscale(e.target.value)} />
                            </div>
                            <div>
                                <h2>Invert</h2>
                                <input value={invert} type="range" min={0} max={100} step={1} onChange={e => setInvert(e.target.value)} />
                            </div>
                            <div>
                                <h2>Sepia</h2>
                                <input value={sepia} type="range" min={0} max={100} step={1} onChange={e => setSepia(e.target.value)} />
                            </div>
                            <div>
                                <h2>Saturate</h2>
                                <input value={saturate} type="range" min={0} max={10} step={1} onChange={e => setSaturate(e.target.value)} />
                            </div>
                            <div>
                                <h2>Hue Rotate</h2>
                                <input value={hueRotate} type="range" min={0} max={180} step={1} onChange={e => setHueRotate(e.target.value)} />
                            </div>
                        </div>
                        <div className="buttons">
                            <button onClick={handleChooseAnotherImage} className={'btn btn-danger'}>Choose Another Image</button>
                            <button onClick={handleSaveImage} className={'btn btn-success'}>Save Image</button>
                        </div>
                    </div>
                    <div className="image-preview">
                        <img ref={previewRef} src={image} alt="Edited" style={{ filter: formattedFilters }} />
                    </div>
                </div>
            ) : (
                <div className={`dropzone ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p><img src={uploadIcon} alt="Upload Icon" /></p>
                    <p>Drag and drop an image here, or click to select a file</p>
                </div>
            )}
        </div>
    );
};

export default ImageEditor;

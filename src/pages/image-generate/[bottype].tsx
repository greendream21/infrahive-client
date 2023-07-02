import {
  Button,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme
} from '@mui/material';
import React, { ChangeEvent, FormEvent, ReactComponentElement, SetStateAction, useEffect, useState } from 'react';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import styled from '@emotion/styled';
import { toNumber } from 'lodash';
import { Download } from '@mui/icons-material';
import { useRouter } from 'next/router';
import ReplyIcon from '@mui/icons-material/Reply';

import { BASE_URL } from 'config';

import { loadPrompt } from 'actions/image';
import { string } from 'yup';

// Define a type for the expected object shape
type SelectValue = {
  promptsName: string;
  imageStyle: string;
  promptsValue: string;
};

// Download button styled compoennt so it can be displayed on top of the image
const DownloadBtn = styled('a')`
    position: absolute;
    top: 10px; /* Adjust the top position as needed */
    right: 10px; /* Adjust the left position as needed */
    background-color: #ffffff;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    color: #000000;
    font-weight: bold;
  `;

const images = () => {
  // State to track api being used
  const [mode, setMode] = useState('dream');
  // State for prompt textfield
  const [prompt, setPrompt] = useState('Write your prompt here');
  // State to track number of images
  const [numImages, setNumImages] = useState(1);
  // State to track image size selected by the user
  const [imageSize, setImageSize] = useState(4);
  // State array to store images sent by the backend
  const [imageArray, setImageArray] = useState<string[]>([]);
  //State to track if image is loaded or not
  const [imgLoaded, setImgLoaded] = useState(false);
  // Image style state
  const [imgStyle, setImageStyle] = useState('3d-model');

  // Select Prompt Name
  const [selectPrompt, setSelectPrompt] = useState('');

  const [promptName, setPromptName] = useState([{ promptsName: '', promptsValue: '', imageStyle: '' }]);

  const router = useRouter();

  // Variable containing all available image sizes
  const sizes: string[][] = [
    ['7:4', '896x512'],
    ['3:2', '768x512'],
    ['4:3', '683x512'],
    ['5:4', '640x512'],
    ['1:1', '512x512'],
    ['4:5', '512x640'],
    ['3:4', '512x683'],
    ['2:3', '512x768'],
    ['4:7', '512x896']
  ];

  // Array of Dalle supported Image sizes
  const dalleSizes: string[][] = [
    ['1:1', '256x256'],
    ['1:1', '512x512'],
    ['1:1', '1024x1024']
  ];

  // Array of available image styles
  const ImageSyles: string[] = [
    '3d-model',
    'analog-film',
    'anime',
    'cinematic',
    'comic-book',
    'digital-art',
    'enhance',
    'fantasy-art',
    'isometric',
    'line-art',
    'low-poly',
    'modeling-compound',
    'neon-punk',
    'origami',
    'photographic',
    'pixel-art',
    'tile-texture'
  ];

  // useEffect to create an array of placeholder images according to the number of images selected
  useEffect(() => {
    let imageData = '/placeholder.png';
    const newArray: string[] = Array(numImages).fill(imageData);
    setImageArray(newArray);
    setImgLoaded(false);
  }, [numImages]);

  // Component MUI Theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#5e35b1'
      }
    }
  });

  const back = async () => {
    router.push(`/dashboard/images/${mode}`);
  };

  // An array to store number of images possible.
  const numOfImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (router.isReady) {
      setMode(String(router.query['botType']));
    }
  }, []);
  

  // Handler to track the prompt being typed
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  // Handler for Image size selector
  const sizeHandler = (event: SelectChangeEvent) => {
    setImageSize(toNumber(event.target.value));
  };

  // Handler for number of images selector
  const numImageHandler = (event: SelectChangeEvent) => {
    setNumImages(toNumber(event.target.value));
  };

  // Handler for number of images selector
  const imageStyleHandler = (event: SelectChangeEvent) => {
    setImageStyle(event.target.value);
  };

  const ImageSelectorComp: React.FC<{ imageArray: string[][] }> = ({ imageArray }) => {
    return (
      <div>
        <InputLabel id="image-size-select-label">Image Size</InputLabel>
        <Select
          labelId="image-size-select-label"
          id="image-select"
          value={imageSize.toString()}
          label="Image Size"
          onChange={sizeHandler}
          autoWidth
        >
          {/* Options of the selector  */}
          {imageArray.map((size, index) => (
            <MenuItem key={index} value={index}>
              {size[0]} {size[1]}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  };

  // Form Submit Handler to get the images from the backend
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newArray: string[] = Array(numImages).fill('/loading.gif');
    setImageArray(newArray);
    // Dalle API
    if (mode == 'dalle') {
      // Sets loaded images to false
      setImgLoaded(false);
      // Defines payload for the API call
      const data = {
        prompt: prompt,
        num_outputs: numImages,
        size: dalleSizes[imageSize][1]
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      const response = await fetch(`${BASE_URL}/api/image/dalle`, requestOptions);
      const res = await response.json();
      // Sets the images array with the result sent by the backend
      setImageArray(res);
      setImgLoaded(true);
    }

    // StabilityAI API
    if (mode == 'dream') {
      setImgLoaded(false);
      // Gets the width and height of the image being selected
      const [width, height] = sizes[imageSize][1].split('x');
      // Body data for the api call
      const data = {
        prompt: prompt,
        cfg_scale: 7,
        cgp: 'NONE',
        height: toNumber(height),
        width: toNumber(width),
        samples: numImages,
        steps: 50,
        // style: imgStyle,
        style: 'neon-punk'
      };

      // Header for the call
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      const response = await fetch(`${BASE_URL}/api/image/dream`, requestOptions);
      const res = await response.json();
      // Sets the images array with the result sent by the backend
      setImageArray(res);
      setImgLoaded(true);
    }
  };

  const handleSelectPromptChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as SelectValue;

    // Access the properties correctly
    setSelectPrompt(value.promptsName);
    setImageStyle(value.imageStyle);
    setPrompt(value.promptsValue);
  };

  const loadData = async () => {
    const data = await loadPrompt(String(router.query['botType']));
    if (data !== undefined) {
      for (let key in data.data) {
        const newName = data.data[key];
        setPromptName((prevName) => [...prevName, { promptsName: newName.promptsName, promptsValue: newName.promptsValue, imageStyle: newName.imageStyle }]);
      }
}
  }

  console.log(mode);
  

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* Main Container */}
      <Grid container spacing={4}>
        {/* Container for prompt and config */}
        <Grid item xs={12} md={3}>
          <Button sx={{ m: '3px' }} onClick={back} startIcon={<ReplyIcon />} color='secondary'>
            Back
          </Button>
          <form onSubmit={handleSubmit}>
            {/* Selector Component to select engine based on MUI Component */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: "4px", alignItems: 'center' }}>
              <InputLabel id="engine-select-label">Engine:</InputLabel>
              <Typography variant='h5'>
                {mode === "dalle" ? "Dall-E" : "Stability-AI"}
              </Typography>
            </div>
            <Stack sx={{ my: 2 }}>
              <FormControl sx={{ minWidth: 200 }} >
                <InputLabel id='select-prompt'>Select Prompt</InputLabel>
                <Select
                  labelId='select-prompt'
                  name="Select Prompt"
                  label="Select Prompt"
                  onChange={handleSelectPromptChange}
                >
                  {
                    promptName.map((content: any, index) => {
                      if (content.promptsName !== '')
                        return (
                          <MenuItem value={content} key={index}>
                            {content.promptsName}
                          </MenuItem>
                        )
                    })
                  }
                </Select>
              </FormControl>
            </Stack>

            {/* Div element containing Prompt, image size, number of images and submit button */}
            <div style={{ marginTop: '24px' }}>
              {/* Prompt Field */}
              <TextField
                id="prompt"
                label="Prompt"
                multiline
                rows={6}
                fullWidth={true}
                onChange={handleChange}
                value={prompt}
              />

              {/* Div element containing image size and number of images selector in a inline flex */}
              <div style={{ display: 'flex', flexDirection: "column", marginTop: '16px' }}>
                {/* Image Size select MUI Component */}
                {mode == 'dream' ? <ImageSelectorComp imageArray={sizes} /> : <ImageSelectorComp imageArray={dalleSizes} />}
                {/* <ImageSelectorComp imageArray={sizes}/> */}

                <div style={{ display: 'flex', marginTop: '16px' }}>

                  {/* Number of images selector MUI Component */}
                  <div>
                    <InputLabel id="image-number-select-label">Number</InputLabel>
                    <Select
                      labelId="image-number-select-label"
                      id="image-number-select"
                      value={numImages.toString()}
                      label="Number of Images"
                      onChange={numImageHandler}
                      sx={{ minWidth: '3rem' }}
                    >
                      {/* Options of the selector */}
                      {numOfImages.map((num, index) => (
                        <MenuItem value={num} key={index}>
                          {' '}
                          {num}{' '}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button variant="contained" endIcon={<EmojiObjectsIcon />} sx={{ marginTop: '24px' }} fullWidth={true} type="submit">
                Imagine
              </Button>
            </div>
          </form>
        </Grid>

        {/* Image Grid display component */}
        <Grid item xs={12} md={9}>
          {/* Uses MUI ImageList component */}
          <ImageList sx={{ width: 'full', height: 'full' }} cols={3}>
            {imageArray.map((item, index) => (
              <ImageListItem
                key={index}
                style={{
                  borderWidth: '3px',
                  borderImage: 'linear-gradient(to bottom right, white, #5e35b1) 1',
                  borderStyle: 'solid',
                  position: 'relative'
                }}
              >
                {/* Image is displayed directly using the base64 and is conditionally showing either normal image or base64 encoded result based upop imgLoaded state variable */}
                <img src={imgLoaded ? `data:image/jpeg;base64,${item}` : `${item}`} alt={prompt} />

                {/* Download button download the image using the download property */}
                <DownloadBtn href={`data:image/png;base64,${item}`} download={`${prompt}-${index}.png`}>
                  <Download />
                </DownloadBtn>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
images.Layout = 'authGuard';
export default images;

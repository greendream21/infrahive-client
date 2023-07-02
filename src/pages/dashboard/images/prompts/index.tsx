import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import Subject from "./subject";
import Specific_Aspects from "./specific_aspects";
import Background from "./background";
import Additional from "./additional";
import LandscapeAccurate from "./landscapeAccurate";
import Artists from "./artists";
import Camera from "./camera";

import CodeSnippet from "./codeSnippet";

import React, { useEffect, useState } from "react";
import snackbar from 'utils/snackbar';

import { promptSubmit } from "actions/image";

const Prompts = (props: any) => {

    const [prompt, setPrompt] = useState({});
    
    const [promptsValueError, setPromptsValueError] = useState(false);
    const [promptsNameError, setPromptsNameError] = useState(false);
    const [imageStyleError, setImageStyleError] = useState(false);
    const [imageSizeError, setImageSizeError] = useState(false);
    
    const [promptsValue, setPromptsValue] = useState("");
    const [promptsName, setPromptsName] = useState("");
    const [imageStyle, setImageStyle] = useState('');
    const [imageSize, setImageSize] = useState('');

    const mode = props.mode;

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
    const ImageStyles: string[] = [
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

    const Copy = () => {
        navigator.clipboard.writeText(promptsValue);
        snackbar("Prompt copied!");
    };

    const Save = async () => {
        if (promptsName === '') {
            setPromptsNameError(true);
        } else {
            setPromptsNameError(false);
        }
        
        if (promptsValue === '') {
            setPromptsValueError(true);
        } else {
            setPromptsValueError(false);
        }
        
        if (imageStyle === '') {
            setImageStyleError(true);
        } else {
            setImageStyleError(false);
        }
        
        if (imageSize === '') {
            setImageSizeError(true);
        } else {
            setImageSizeError(false);
        }

        if (promptsName !== '' && promptsValue !== '' && imageStyle !== '' && imageSize !== '') {
            const value: number = Number(imageSize);
            let data = {};
            if (mode === 'dalle') {
                data = {
                    promptsName: promptsName,
                    promptsValue: promptsValue,
                    imageStyle: imageStyle,
                    size: dalleSizes[value][1],
                    mode: mode,
                }
            }

            if (mode === 'dream') {
                data = {
                    promptsName: promptsName,
                    promptsValue: promptsValue,
                    imageStyle: imageStyle,
                    size: sizes[value][1],
                    mode: mode,
                }
            }

            const result = await promptSubmit(data);
            if (result.status == 200) {
                snackbar("File Uploaded successfully.");
                props.setPromptFlag(false);
            }
        }       
    };

    const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPromptsName(event.target.value);
    }

   const handlePromptsValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
   }
   

    const handleImageStyleChange = (event: SelectChangeEvent) => {
        setImageStyle(event.target.value);
    };

    const handleImageSizeChange = (event: SelectChangeEvent) => {
        setImageSize(event.target.value);
    };

    const ImageSelectorComp: React.FC<{ imageArray: string[][] }> = ({ imageArray }) => {
        return (
            <FormControl sx={{ minWidth: 360 }} >
                <InputLabel id="image-size-select-label">Image Size</InputLabel>
                <Select
                    labelId="image-size-select-label"
                    id="image-select"
                    value={imageSize.toString()}
                    label="Image Size"
                    onChange={handleImageSizeChange}                    
                    error={imageSizeError}
                >
                {/* Options of the selector  */}
                {imageArray.map((size, index) => (
                    <MenuItem key={index} value={index}>
                    {size[0]} {size[1]}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        );
    };

    const getPromptsValue = async (prompts: any) => {
        let textPrompt;

        if (typeof prompts === 'object') {            
            const values = Object.values(prompts);
            const text = Array.isArray(values) ? values.join(" ") : values;
            textPrompt = text.trim();
        } else {
            textPrompt = prompts;
        }
        setPromptsValue(textPrompt);
    };

    useEffect(() => {
        setImageStyle(imageStyle);
        setImageSize(imageSize);
        getPromptsValue(prompt);
    }, [prompt]);

    console.log(imageSize, imageStyle, prompt);
    

    return (
        <Stack justifyContent={"center"} spacing={3} py={3} sx={{ width: '100%' }}>
            <CodeSnippet promptsValue={promptsValue} imageStyle={imageStyle} imageSize={imageSize} mode={mode}  />
            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TextField id="promptName" label="Prompt Name" variant="outlined" sx={{ width: '100%' }} color='primary' value={promptsName} onChange={handlePromptChange} error={promptsNameError} helperText={promptsNameError ? "Data can't be empty" : ""}/>
                <IconButton aria-label="copy" size="large" color='primary' onClick={Save}>
                    <SaveAsIcon fontSize="inherit" />
                </IconButton>
            </Stack>
            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <IconButton aria-label="copy" size="large" color='secondary' onClick={Copy}>
                    <ContentCopyIcon fontSize="inherit" />
                </IconButton>
                <TextField id="prompts" label="Prompts" variant="outlined" sx={{ width: '100%' }} color='secondary' value={promptsValue} onChange={handlePromptsValueChange} error={promptsValueError} helperText={promptsValueError ? "Data can't be empty" : ""}/>
            </Stack>
            <Grid container spacing={1} columns={12}>
                <Grid item xs={6}>
                    <FormControl sx={{ minWidth: 350 }} >
                        <InputLabel id='image-style'>Image Style</InputLabel>
                        <Select
                            labelId="image-style"
                            name="Image Style"
                            label="Image Style" 
                            onChange={handleImageStyleChange}
                            error={imageStyleError}
                            value={imageStyle}
                        >
                            {
                                ImageStyles.map((content: string, index) => {
                                    return (
                                        <MenuItem value={content} key={index}>
                                            {content}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    {mode == 'dream' ? <ImageSelectorComp imageArray={sizes} /> : <ImageSelectorComp imageArray={dalleSizes} />}
                </Grid>
            </Grid>
            <Stack >
                <Subject setprompt={setPrompt} />
                <Specific_Aspects setprompt={setPrompt} />
                <Background setprompt={setPrompt} />
                <LandscapeAccurate setprompt={setPrompt} />
                <Artists setprompt={setPrompt} />
                <Camera setprompt={setPrompt} />
                <Additional setprompt={setPrompt} />
            </Stack>
        </Stack>
    )
}

export default Prompts
import { Box, Grid, Input, Slider, Stack, Typography } from "@mui/material";
import React from "react";

const AnthropicSetting = (props: any) => {
    const { temperatureValue, setTemperatureValue, max_tokensValue, setMax_tokensValue, top_pValue, setTop_pValue, top_kValue, setTop_kValue } = props;


    // temperatureValue
    const handleTemperatureValueSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setTemperatureValue(newValue);
        }
    };

    const handleTemperatureValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTemperatureValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleTemperatureValueBlur = () => {
        if (Number(temperatureValue) < 0) {
            setTemperatureValue(0);
        } else if (Number(temperatureValue) > 1) {
            setTemperatureValue(1);
        }
    };

    // max_tokensValue
    const handleMax_tokensValueSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setMax_tokensValue(newValue);
        }
    };

    const handleMax_tokensValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMax_tokensValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleMax_tokensValueBlur = () => {
        if (Number(temperatureValue) < 0) {
            setMax_tokensValue(0);
        } else if (Number(temperatureValue) > 1) {
            setMax_tokensValue(1);
        }
    };

    // Top_pValue
    const handleTop_pValueSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setTop_pValue(newValue);
        }
    };

    const handleTop_pValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTop_pValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleTop_pValueBlur = () => {
        if (Number(top_pValue) < 0) {
            setTop_pValue(0);
        } else if (Number(top_pValue) > 1) {
            setTop_pValue(1);
        }
    };

    // top_kValue
    const handleTop_kValueSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setTop_kValue(newValue);
        }
    };

    const handleTop_kValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTop_kValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleTop_kValueBlur = () => {
        if (Number(top_kValue) < 0) {
            setTop_kValue(0);
        } else if (Number(top_kValue) > 1) {
            setTop_kValue(1);
        }
    };

    return (
        <Stack>
            <Box sx={{ width: 300 }}>
                <Typography id="input-temperature-slider" gutterBottom>
                    Temperature
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={typeof temperatureValue === 'number' ? temperatureValue : 0}
                            onChange={handleTemperatureValueSliderChange}
                            aria-label="Small"
                            aria-labelledby="input-temperatureValue-slider"
                            min={0}
                            max={1}
                            step={0.1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={temperatureValue}
                            size="small"
                            onChange={handleTemperatureValueInputChange}
                            onBlur={handleTemperatureValueBlur}
                            inputProps={{
                                step: 0.1,
                                min: 0,
                                max: 1,
                                type: 'number',
                                'aria-labelledby': 'input-temperatureValue-slider',
                            }}
                            disableUnderline
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: 300 }}>
                <Typography id="input-max_tokens-slider" gutterBottom>
                    Max Token
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={typeof max_tokensValue === 'number' ? max_tokensValue : 0}
                            onChange={handleMax_tokensValueSliderChange}
                            aria-label="Small"
                            aria-labelledby="input-max_tokens-slider"
                            min={1}
                            max={9000}
                            step={1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={max_tokensValue}
                            size="small"
                            onChange={handleMax_tokensValueInputChange}
                            onBlur={handleMax_tokensValueBlur}
                            inputProps={{
                                step: 1,
                                min: 1,
                                max: 9000,
                                type: 'number',
                                'aria-labelledby': 'input-max_tokens-slider',
                            }}
                            disableUnderline
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: 300 }}>
                <Typography id="input-top_pValue-slider" gutterBottom>
                    Top P
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={typeof top_pValue === 'number' ? top_pValue : 0}
                            onChange={handleTop_pValueSliderChange}
                            aria-label="Small"
                            aria-labelledby="input-top_pValue-slider"
                            min={-1}
                            max={5}
                            step={1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={top_pValue}
                            size="small"
                            onChange={handleTop_pValueInputChange}
                            onBlur={handleTop_pValueBlur}
                            inputProps={{
                                step: 1,
                                min: -1,
                                max: 5,
                                type: 'number',
                                'aria-labelledby': 'input-top_pValue-slider',
                            }}
                            disableUnderline
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: 300 }}>
                <Typography id="input-n-slider" gutterBottom>
                    Top K
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={typeof top_kValue === 'number' ? top_kValue : 0}
                            onChange={handleTop_kValueSliderChange}
                            aria-label="Small"
                            aria-labelledby="input-n-slider"
                            min={-1}
                            max={5}
                            step={1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={top_kValue}
                            size="small"
                            onChange={handleTop_kValueInputChange}
                            onBlur={handleTop_kValueBlur}
                            inputProps={{
                                step: 1,
                                min: -1,
                                max: 5,
                                type: 'number',
                                'aria-labelledby': 'input-n-slider',
                            }}
                            disableUnderline
                        />
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    )
}

export default AnthropicSetting;
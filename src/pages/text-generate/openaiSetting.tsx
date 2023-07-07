import { Box, Grid, Input, Slider, Stack, Typography } from "@mui/material";
import React from "react";

const OpenAiSetting = (props: any) => {
    const { mode, temperatureValue, setTemperatureValue, max_tokensValue, setMax_tokensValue, top_pValue, setTop_pValue, n, setNValue, presence_penalty, setPresence_penaltyValue, frequency_penalty, setFrequency_penaltyValue, best_of, setBest_ofValue } = props;


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

    // n
    const handleNSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setNValue(newValue);
        }
    };

    const handleNInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleNBlur = () => {
        if (Number(n) < 0) {
            setNValue(0);
        } else if (Number(n) > 1) {
            setNValue(1);
        }
    };

    // presence_penalty
    const handlePresence_penaltySliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setPresence_penaltyValue(newValue);
        }
    };

    const handlePresence_penaltyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPresence_penaltyValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handlePresence_penaltyBlur = () => {
        if (Number(presence_penalty) < 0) {
            setPresence_penaltyValue(0);
        } else if (Number(presence_penalty) > 1) {
            setPresence_penaltyValue(1);
        }
    };

    // frequency_penalty
    const handleFrequency_penaltySliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setFrequency_penaltyValue(newValue);
        }
    };

    const handleFrequency_penaltyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFrequency_penaltyValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleFrequency_penaltyBlur = () => {
        if (Number(frequency_penalty) < 0) {
            setFrequency_penaltyValue(0);
        } else if (Number(frequency_penalty) > 1) {
            setFrequency_penaltyValue(1);
        }
    };

    // best_of
    const handleBest_ofSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setBest_ofValue(newValue);
        }
    };

    const handleBest_ofInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBest_ofValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBest_ofBlur = () => {
        if (Number(best_of) < 0) {
            setBest_ofValue(0);
        } else if (Number(best_of) > 1) {
            setBest_ofValue(1);
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
                            max={mode === 'gpt3' ? 4097 : mode === 'chatgpt' ? 16384 : 8192}
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
                                max: mode === 'gpt3' ? 4097 : mode === 'chatgpt' ? 16384 : 8192,
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
                            min={0}
                            max={1}
                            step={0.1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={top_pValue}
                            size="small"
                            onChange={handleTop_pValueInputChange}
                            onBlur={handleTop_pValueBlur}
                            inputProps={{
                                step: 0.1,
                                min: 0,
                                max: 1,
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
                    Number of Generation
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={typeof n === 'number' ? n : 0}
                            onChange={handleNSliderChange}
                            aria-label="Small"
                            aria-labelledby="input-n-slider"
                            min={1}
                            max={10}
                            step={1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={n}
                            size="small"
                            onChange={handleNInputChange}
                            onBlur={handleNBlur}
                            inputProps={{
                                step: 1,
                                min: 1,
                                max: 10,
                                type: 'number',
                                'aria-labelledby': 'input-n-slider',
                            }}
                            disableUnderline
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: 300 }}>
                <Typography id="input-presence_penalty-slider" gutterBottom>
                    Presence Penalty
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={typeof presence_penalty === 'number' ? presence_penalty : 0}
                            onChange={handlePresence_penaltySliderChange}
                            aria-label="Small"
                            aria-labelledby="input-presence_penalty-slider"
                            min={-2}
                            max={2}
                            step={0.1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={presence_penalty}
                            size="small"
                            onChange={handlePresence_penaltyInputChange}
                            onBlur={handlePresence_penaltyBlur}
                            inputProps={{
                                step: 0.1,
                                min: -2,
                                max: 2,
                                type: 'number',
                                'aria-labelledby': 'input-presence_penalty-slider',
                            }}
                            disableUnderline
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: 300 }}>
                <Typography id="input-frequency_penalty-slider" gutterBottom>
                    Frequency Penalty
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={typeof frequency_penalty === 'number' ? frequency_penalty : 0}
                            onChange={handleFrequency_penaltySliderChange}
                            aria-label="Small"
                            aria-labelledby="input-frequency_penalty-slider"
                            min={-2}
                            max={2}
                            step={0.1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={frequency_penalty}
                            size="small"
                            onChange={handleFrequency_penaltyInputChange}
                            onBlur={handleFrequency_penaltyBlur}
                            inputProps={{
                                step: 0.1,
                                min: -2,
                                max: 2,
                                type: 'number',
                                'aria-labelledby': 'input-frequency_penalty-slider',
                            }}
                            disableUnderline
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: 300 }}>
                <Typography id="input-best_of-slider" gutterBottom>
                    Best of
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={typeof best_of === 'number' ? best_of : 0}
                            onChange={handleBest_ofSliderChange}
                            aria-label="Small"
                            aria-labelledby="input-best_of-slider"
                            disabled={mode === "gpt3" ? false : true}
                            min={1}
                            max={5}
                            step={1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={best_of}
                            size="small"
                            onChange={handleBest_ofInputChange}
                            onBlur={handleBest_ofBlur}
                            inputProps={{
                                step: 1,
                                min: 1,
                                max: 5,
                                type: 'number',
                                'aria-labelledby': 'input-best_of-slider',
                            }}
                            disableUnderline
                            disabled={mode === "gpt3" ? false : true}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    )
}

export default OpenAiSetting;
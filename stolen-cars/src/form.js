import React from 'react';
import { InputLabel, FormHelperText, FormControl, Input} from '@material-ui/core';

export default function Formview() {
    return(
        <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
    )
}
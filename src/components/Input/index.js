import React, { useCallback, useState } from 'react';

import { Container, TextInput } from './styles';

const Input = ({ value, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [value]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      <TextInput
        placeholderTextColor="#FFFFFF"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        {...rest}
      />
    </Container>
  );
};

export default Input;

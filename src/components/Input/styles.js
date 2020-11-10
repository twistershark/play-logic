import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  margin-top: 24px;
  background: #32430C;
  border-radius: 10px;
  border-width: 3px;
  border-color: #32430C;
  flex-direction: row;
  align-items: center;
  ${(props) => props.isFocused
    && css`
      border-color: #592C15;
    `}

    ${(props) => props.isFilled
    && css`
      border-color: #592C15;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
`;

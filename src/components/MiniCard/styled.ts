import styled from 'styled-components';

export const BackgroundImage = styled.div<{ image: string }>`
    width: 360px;
    height: 360px;
    border-radius: 20px;
    background: url(${props => props.image}) center center / cover no-repeat;
`;
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
`;

export const BackgroundImage = styled.div<{ image: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: url(${props => props.image}) center center / cover no-repeat;
`;
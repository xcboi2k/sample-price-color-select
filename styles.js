import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const TopText = styled.Text`
  text-align: left;
  font-size: 12px;
  margin-bottom: 10px;
`;

export const MiddleContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ImageComponent = styled.Image`
  width: 300px;
  height: 300px;
`;

export const ArrowKeys = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
`;

export const ArrowIcon = styled.Text`
  font-size: 30px;
`;

export const StarContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom:10px;
`;

export const BottomText = styled.Text`
  text-align: center;
  font-weight:bold;
  font-size: 25px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const UnderlinedText = styled.Text`
  text-align: center;
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 10px;
`;

export const SubText = styled.Text`
  text-align: center;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 5px;
  color: green;
`;

export const Price = styled.Text`
  text-align: center;
  font-weight:bold;
  font-size: 25px;
  margin-bottom: 5px;
`;

export const MenuContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border: 1px;
  border-color: green;
  margin: 2px
`;

export const MenuItem = styled.Text`
    font-size: 18px;
    background-color: ${(props) => (props.available && props.selected ? 'green' : 'grey')};
    color: ${(props) => (props.available && props.selected ? 'white' : 'white')};
    border: 2px solid ${(props) => (props.available && props.selected ? 'green' : 'grey')};
    padding: 5px;
    margin: 5px;
    text-decoration-line: ${(props) => (!props.disabled ? 'none' : 'line-through')};
    opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

export const ColorMenuItem = styled.Text`
    font-size: 18px;
    background-color: ${(props) => (props.selected ? 'green' : 'white')};
    color: ${(props) => (props.selected ? 'white' : 'grey')};
    border: 2px solid ${(props) => (props.selected ? 'green' : 'white')};
    padding: 5px;
    margin: 5px;
`;

export const MenuText = styled.Text`
    font-size: 18px;
`
import styled from 'styled-components'; 

export const container = styled.View `
width: 250;
height: 160;
`
export const header = styled.View `
flex-direction: 'row'; 
background-color: '#1A260180'; 
height:40;
` 
  

export const itemHeader = styled.View `
  flex: 1;
  justify-content: 'center'; 
  align-items: 'center';
  border-width: 1; 
  border-color:'black';`
   
export const itemList = styled.View `
  height:40; 
  flex-direction: 'row'; 
  align-items: 'center';
  justify-content: 'space-between';
  padding-right: 50;
  padding-left: 50;
  `
export const text = styled.Text` 
  color: 'white';
  font-size: 25;`

export const itemView = styled.View`
  flex: 1;
  flex-direction:'row';
  align-items:'center';
  padding: 15;
`
export const imageScore = styled.Image `
  width: 30;
  height: 30;
  margin-right: 2;
  margin-left: 2;  
`
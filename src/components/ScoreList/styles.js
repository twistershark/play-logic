import styled from 'styled-components/native'; 

export const Container = styled.View `
width: 250px;
height: 160px;
`
export const Header = styled.View `
flex-direction: row; 
background-color: #1A260180; 
height:40px;
` 
export const List = styled.FlatList `

` 

export const ItemHeader = styled.View `
  flex: 1;
  justify-content: center; 
  align-items: center;
  border-width: 1px; 
  border-color:black;`
   
export const ItemList = styled.View `
  height:40px; 
  flex-direction: row; 
  align-items: center;
  justify-content: space-between; 
  padding-right: 50px;
  padding-left: 50px;
  `
export const Text = styled.Text` 
  color: white;
  font-size: 25px;`

export const ItemView = styled.View`
  flex: 1;
  flex-direction: row; 
  align-items:center;
  padding-left: 15px; 
`
export const ImageScore = styled.Image `
  width: 30px;
  height: 30px;
  margin-right: 2px;
  margin-left: 2px;  
`
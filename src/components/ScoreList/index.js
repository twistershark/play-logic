import React from 'react'


import {Container, Header, ItemHeader, ItemList, Text, ItemView, ImageScore, List} from './styles'

import emptyStar from '../../assets/emptyStar.png'
import star from '../../assets/star.png'
import noStar from '../../assets/null.png'



const scoreList = ({score}) => {
  const renderItem = (item) => {
    return (
      <ItemList style = {[item.key%2? {backgroundColor: '#592C15'}: {backgroundColor: '#7F4726'}]} >
          <ItemView>
            <Text>{item.key}</Text>
          </ItemView>
        <ItemView>
          <ImageScore source = {item.star>-1? (item.star>0? star : emptyStar): noStar} style = {[item.star<0? {width: 35,
  height: 5, marginLeft: 35 } : ' ' ]} />
          <ImageScore source = {item.star>-1? (item.star>1? star : emptyStar): null} />
          <ImageScore source = {item.star>-1? (item.star>2? star : emptyStar): null}/>
        </ItemView>
      </ItemList>
    )
  }
  return (
    <Container> 
      <Header > 
        <ItemHeader><Text>FASE</Text></ItemHeader>
        <ItemHeader><Text>PONTOS</Text></ItemHeader> 
      </Header>
      <List data = {score}
      renderItem = {({item}) => renderItem(item)} /> 
    </Container>
  )
}

export default scoreList; 


import monkeyImage from '../../assets/visual/Macaco_F.png';
import bananaNormal from '../../assets/visual/banana_normal.png';
import rede from '../../assets/visual/rede.png';
import loop from '../../assets/visual/loop.png';
import comojogar from '../../assets/tutorial/comojogar.gif';

export const bgs = ['#545454', '#c29308', '#592C15', '#538900', '#592C15'];

export const DATA = [
  {
    key: '1',
    title: 'Esse é o Ameixa!',
    description: 'Ele quer a sua ajuda para conseguir pegar todas as bananas sem ser pego pelos caçadores.',
    image: monkeyImage,
  },
  {
    key: '2',
    title: 'Hora de comer!',
    description: 'Por ser guloso, o ameixa só vai permitir você passar uma fase se ajudá-lo a pegar todas as bananas.',
    image: bananaNormal,
  },
  {
    key: '3',
    title: 'Cuidado! Existem armadilhas pelo caminho!',
    description: 'Ajude o ameixa a não ser capturado pedindo para ele verificar se existe alguma armadilha por perto.',
    image: rede,
  },
  {
    key: '4',
    title: 'O rei da preguiça!',
    description: 'Ameixa só quer comer e dormir, então ele quer que você ajude-o a pegar todas as bananas gastando o mínimo de energia',
    image: loop,
  },
];
